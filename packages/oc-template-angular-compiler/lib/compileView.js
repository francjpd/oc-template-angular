const { outputFileSync } = require('fs-extra');
const { readdirSync, readFileSync, writeFileSync } = require('fs');
const hashBuilder = require('oc-hash-builder');
const ocViewWrapper = require('oc-view-wrapper');
const { join } = require('path');
const angularComponentWrapper = require('oc-angular-component-wrapper');
const { execSync, spawn } = require('child_process');
const rimraf = require('rimraf');
const ocRootComponentTemplate = require('./compile-view/oc-ng-entities/oc-root/oc-root.component.template');
const ocRootModuleTemplate = require('./compile-view/oc-ng-entities/oc-root/oc-root.module.template');
const ocMainTemplate = require('./compile-view/oc-ng-entities/oc-main/oc-main.template');
const pascalcase = require('pascalcase');
const viewTemplate = require('./viewTemplate');

const TEMPORAL_FOLDER = '';
const UTF8 = 'UTF8';
const angularComponentFilename = 'angular-component.js';
const callbacks = [];
let isWatching = false;
let bundleHash;


/**
 * Retrieve the component & module name from the <path>/src/app folder & returns a new object containing the options plus the root info.
 */
const optionsWithRootInfo = options => {
  const { publishPath, componentPath } = options;
  const appPath = join(componentPath, 'src', 'app');

  const rootFiles = readdirSync(appPath);
  const rootComponentName = rootFiles.find((file) => file.includes('component.ts'));
  const rootModuleName = rootFiles.find((file) => file.match(/^(?=.*?\bmodule\b)((?!routing).)*$/)).split('.ts')[0];
  const rootComponent = readFileSync(join(appPath, rootComponentName), UTF8);
  const rootComponentSelector = rootComponent.match(/selector: ['"][a-z-0-9]*'/)[0].split("'")[1];
  const outputTempPath = join(publishPath, TEMPORAL_FOLDER);

  return {
    ...options,
    rootModuleName,
    rootComponentSelector,
    outputTempPath
  }
}

/**
 * Copy the needed entities (components, modules, etc.) to the <ng-app-path>/src/app/oc 
 * These entities are created dinamically based on the components's name.
 */
function copyOcNgEntities(
  {
    componentPath,
    componentPackage: { name },
    rootModuleName,
    rootComponentSelector }
) {

  const ocPath = join(componentPath, 'src', 'app', 'oc');
  [
    ['oc-root.component.ts', ocRootComponentTemplate({ name: rootComponentSelector })],
    ['oc-root.module.ts', ocRootModuleTemplate({ name: rootModuleName, namePascalCase: pascalcase(rootModuleName) })],
    ['main.ts', ocMainTemplate({ name })]
  ].forEach(([fileName, content]) => outputFileSync(join(ocPath, fileName), content));
}

/**
 * Search for the 'main' file (the js from the Ng compilation) within a list of files.
 */
const findByPrecedenceOrder = (files) => files.find((fileName) => {
  if (new RegExp(/main\.js$/).test(fileName)) {
    return true
  }
  if (new RegExp(/main-es2015\.js$/).test(fileName)) {
    return true
  }
  if (new RegExp(/main.es5\.js$/).test(fileName)) {
    return true
  }
  return fileName.includes('main');
});

/**
 *  gets the compiled ng app, wraps it so OC can understand the component
 */
const wrapNgApp = (options) => {
  const { publishPath, outputTempPath } = options;
  const files = readdirSync(join(outputTempPath));
  const mainFile = findByPrecedenceOrder(files);
  const bundle = readFileSync(join(outputTempPath, mainFile), UTF8);
  const bundleHash = hashBuilder.fromString(bundle);
  const wrappedBundle = angularComponentWrapper(bundleHash, bundle);
  outputFileSync(join(publishPath, angularComponentFilename), wrappedBundle);
  return bundleHash;
}

/**
 * Calls the ng CLI to compile the ng app; next, wraps the compiled ng app so OC can understand it; lastly
 * creates a hash so it can be called by the template.js to have a reference of it.
 */
function compileNg(options) {
  const { componentPath, outputTempPath } = options;
  execSync(`ng build --output-path=${outputTempPath} --main=src/app/oc/main.ts --crossOrigin=none --prod=true --output-hashing none`,
    {
      env: process.env,
      cwd: componentPath
    });
  return wrapNgApp(options);
};

/**
 * Calls the ng CLI in watch mode.
 */
function watch(options) {
  const { publishPath, componentPath } = options;
  const outputTempPath = join(publishPath, TEMPORAL_FOLDER);
  const cmd = `ng build --aot=true  --buildOptimizer=false --sourceMap=false --optimization=false --output-path=${outputTempPath} --watch=true --main=src/app/oc/main.ts --crossOrigin=none --output-hashing none`;
  const spawnedProcess = spawn(cmd, [''], { shell: true, cwd: componentPath });

  spawnedProcess.stdout.on('data', (data) => {
    if (`${data}`.match(/chunk.*main/)) {
      bundleHash = wrapNgApp(options);
      const callback = callbacks.shift();
      if (callback) {
        callback(null, compileNgWrapper(options, bundleHash));
      }
    }
  });

  spawnedProcess.stderr.on('data', (data) => {
    if (!isWatching) {
      throw data;
    }
    console.log(`${data}`);
  });
}

/**
 * Cleans the folder created by the execution of the `copyOcNgEntities` function.
 */
const cleanOcNgEntities = ({ componentPath }) => rimraf.sync(join(componentPath, 'src', 'app', 'oc'));

/**
 * wraps the NG app so OC can understand it, creates the template.js file
 * that has a reference to the globals and the angular-component and returns the template and bundle.
 * 
 */
const compileNgWrapper = (options, bundleHash) => {
  const {
    publishPath,
    publishFileName = 'template.js',
    componentPackage,
    production, componentPackage: { name },
    rootComponentSelector
  } = options;

  const { getInfo } = require('../index');
  const externals = getInfo().externals;
  const bundleName = angularComponentFilename.split('.js')[0];
  const templateString = viewTemplate({
    angularRoot: `${rootComponentSelector}`,
    externals,
    bundleHash,
    bundleName
  });

  const templateStringCompressed = production ? templateString.replace(/\s+/g, ' ') : templateString;
  const templateHash = hashBuilder.fromString(templateStringCompressed);
  const view = ocViewWrapper(templateHash, templateStringCompressed);

  writeFileSync(join(publishPath, publishFileName), view);

  return {
    template: {
      type: componentPackage.oc.files.template.type,
      hashKey: templateHash,
      src: publishFileName
    },
    bundle: { hashKey: bundleHash }
  };
};

/**
 * Does the following:
 * 1. Copy the files: ocRootComponent, ocRootModule and ocMain to the <ng-app-path>/src/app/oc folder 
 * 2. Compiles the NG app Or sets the Ng cli on watch mode.
 * 3. Wraps the compiled NG app with a JS that OC understands & creates the angular-component.js file.
 * 4. Removes the files and folders created in step 1.
 * 5. Creates a file called template.js that will contain the
 * reference from the angular-component.js file and external libraries.
 * 6. calls the callback with the template & bundle if everything its ok.
 */
module.exports = (options, cb) => {
  if (options.production) {
    process.env.PRODUCTION = true;
  }
  callbacks.push(cb);
  const modifiedOptions = optionsWithRootInfo(options);
  try {
    copyOcNgEntities(modifiedOptions);
    if (isWatchMode(modifiedOptions)) {
      if (isWatching) {
        return;
      }
      watch(modifiedOptions);
      isWatching = true;
      return;
    }

    const bundleHash = compileNg(modifiedOptions);
    cleanOcNgEntities(modifiedOptions);
    return cb(null, compileNgWrapper(modifiedOptions, bundleHash));
  } catch (err) {
    return cb(`Angular compilation failed': ${err}`);
  }
};

const isWatchMode = ({ verbose, minify, production }) => !verbose && !minify && !production;
