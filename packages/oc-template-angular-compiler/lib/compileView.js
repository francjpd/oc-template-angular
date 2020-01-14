const { outputFileSync } = require('fs-extra');
const { readdirSync, readFileSync, writeFileSync } = require('fs');
const hashBuilder = require('oc-hash-builder');
const ocViewWrapper = require('oc-view-wrapper');
const path = require('path');
const angularComponentWrapper = require('oc-angular-component-wrapper');
const { execSync } = require('child_process');
const rimraf = require('rimraf');
const ocRootComponentTemplate = require('./compile-view/oc-ng-entities/oc-root/oc-root.component.template');
const ocRootModuleTemplate = require('./compile-view/oc-ng-entities/oc-root/oc-root.module.template');
const ocMainTemplate = require('./compile-view/oc-ng-entities/oc-main/oc-main.template');
// const ocParamsServiceTemplate = require('./oc-params-service/oc-params-service.service.template');
const pascalcase = require('pascalcase');
const viewTemplate = require('./viewTemplate');

const TEMPORAL_FOLDER = 'temp';
const angularComponentFilename = 'angular-component.js';


/**
 * Copy the needed entities (components, modules, etc.) to the <ng-app-path>/src/app/oc path.
 * These entities are created dinamically based on the components's name.
 */
function copyOcNgEntities({ componentPath, componentPackage: { name } }) {
  const ocPath = path.join(componentPath, 'src', 'app', 'oc');

  [
    ['oc-root.component.ts', ocRootComponentTemplate({ name })],
    ['oc-root.module.ts', ocRootModuleTemplate({ name, namePascalCase: pascalcase(name) })],
    ['main.ts', ocMainTemplate()]
  ].forEach(([fileName, content]) => outputFileSync(path.join(ocPath, fileName), content));
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
 * Calls the ng CLI to compile the ng app; next, wraps the compiled ng app so OC can understand it; lastly
 * creates a hash so it can be used by the template.js to have a reference of it.
 */
function compileNg({ publishPath, componentPath }) {
  const outputTempPath = path.join(publishPath, TEMPORAL_FOLDER);

  execSync(`ng build --output-path=${outputTempPath} --main=src/app/oc/main.ts --crossOrigin=none --prod=true --baseHref=${componentPath} --output-hashing none`);

  const files = readdirSync(path.join(outputTempPath));
  const mainFile = findByPrecedenceOrder(files);
  const bundle = readFileSync(path.join(outputTempPath, mainFile), 'UTF8');
  const bundleHash = hashBuilder.fromString(bundle);
  const wrappedBundle = angularComponentWrapper(bundleHash, bundle);

  outputFileSync(path.join(publishPath, angularComponentFilename), wrappedBundle);

  return bundleHash;
};

/**
 * Cleans the folder created by the execution of the `copyOcNgEntities` function.
 */
const cleanOcNgEntities = ({ componentPath }) => rimraf.sync(path.join(componentPath, 'src', 'app', 'oc'));

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
  } = options;

  const { getInfo } = require('../index');
  const externals = getInfo().externals;
  const bundleName = angularComponentFilename.split('.js')[0];
  const templateString = viewTemplate({
    angularRoot: `${name}`,
    externals,
    bundleHash,
    bundleName
  });

  const templateStringCompressed = production ? templateString.replace(/\s+/g, ' ') : templateString;
  const templateHash = hashBuilder.fromString(templateStringCompressed);
  const view = ocViewWrapper(templateHash, templateStringCompressed);


  writeFileSync(path.join(publishPath, publishFileName), view);

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
 * 2. Compiles the NG app.
 * 3. Wraps the compiled NG app with a JS that OC understands & creates the angular-component.js file.
 * 4. Removes the files and folders created in step 1.
 * 5. Creates a file called template.js that will contain the
 * reference from the angular-component.js file and external libraries.
 * 6. calls the callback with the template & bundle if everything its ok.
 */
module.exports = (options, callback) => {
  try {
    copyOcNgEntities(options);
    const bundleHash = compileNg(options);
    cleanOcNgEntities(options);
    return callback(null, compileNgWrapper(options, bundleHash));
  } catch (err) {
    return callback(`Angular compilation failed': ${err}`);
  }
};

