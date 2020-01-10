const { outputFileSync, writeFileSync } = require('fs-extra');
const { readdirSync, renameSync, readFileSync } = require('fs');
const hashBuilder = require('oc-hash-builder');
const ocViewWrapper = require('oc-view-wrapper');
const path = require('path');
const angularComponentWrapper = require('oc-angular-component-wrapper');
const strings = require('oc-templates-messages');
const { execSync } = require('child_process');
const rimraf = require('rimraf');
const ocRootComponentTemplate = require('./compile-view/oc-ng-entities/oc-root/oc-root.component.template');
const ocRootModuleTemplate = require('./compile-view/oc-ng-entities/oc-root/oc-root.module.template');
const ocMainTemplate = require('./compile-view/oc-ng-entities/oc-main/oc-main.template');
// const ocParamsServiceTemplate = require('./oc-params-service/oc-params-service.service.template');
const ocFactory = require('./utils/oc-factory');
const viewTemplate = require('./viewTemplate');

const TEMPORAL_FOLDER = 'temp';
const angularComponentFilename = 'angular-component.js';


/**
 * Copy the needed entities (components, modules, etc.) to the <ng-app-path>/src/app/oc path.
 * These entities are created dinamically based on the components's name.
 */
function copyOcNgEntities(options) {
  const { componentPath, componentPackage, componentPackage: { name } } = options;
  const ocPath = path.join(componentPath, 'src', 'app', 'oc');

  let viewPath = path.join(componentPath, componentPackage.oc.files.template.src);
  if (process.platform === 'win32') {
    viewPath = viewPath.split('\\').join('\\\\');
  }

  const ocRootComponent = {
    fileName: 'oc-root.component.ts',
    content: ocFactory(name, componentPath, ocRootComponentTemplate),
  };

  const ocRootModule = {
    fileName: 'oc-root.module.ts',
    content: ocFactory(name, viewPath, ocRootModuleTemplate),
  };

  const ocMain = {
    fileName: 'main.ts',
    content: ocFactory(name, viewPath, ocMainTemplate),
  };

  [
    ocRootComponent,
    ocRootModule,
    ocMain
  ].forEach(({ fileName, content }) => outputFileSync(path.join(ocPath, fileName), content));
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
 * Calls the ng CLI to compile the ng app.
 */
function compileNg({ publishPath, componentPath }) {
  const outputTempPath = path.join(publishPath, TEMPORAL_FOLDER);

  execSync(`ng build --output-path=${outputTempPath} --main=src/app/oc/main.ts --crossOrigin=none --prod=true --baseHref=${componentPath} --output-hashing none`);

  const files = readdirSync(path.join(outputTempPath));
  const mainFile = findByPrecedenceOrder(files);

  console.log(mainFile);

  renameSync(
    path.join(outputTempPath, mainFile),
    path.join(outputTempPath, angularComponentFilename)
  );
};

/**
 * Cleans the folder created by the execution of the `copyOcNgEntities` function.
 */
const cleanOcNgEntities = ({ componentPath }) => rimraf.sync(path.join(componentPath, 'src', 'app', 'oc'));

/**
 * Function that returns a callback that will build the template based
 * on the config created by the `compileNgWrapper` function
 * 
 */
const compileNgWrapper = (options) => {
  const { publishPath, production, componentPackage: { name }, } = options;
  const { getInfo } = require('../index');
  const outputTempPath = path.join(publishPath, TEMPORAL_FOLDER);
  const externals = getInfo().externals;

  const bundle = readFileSync(path.join(outputTempPath, angularComponentFilename), 'UTF8');
  const bundleHash = hashBuilder.fromString(bundle);
  const bundleName = angularComponentFilename.split('.js')[0];
  const wrappedBundle = angularComponentWrapper(bundleHash, bundle);

  outputFileSync(path.join(publishPath, angularComponentFilename), wrappedBundle);

  const templateString = viewTemplate({
    angularRoot: `${name}`,
    externals,
    bundleHash,
    bundleName
  });

  const templateStringCompressed = production ? templateString.replace(/\s+/g, ' ') : templateString;
  const hash = hashBuilder.fromString(templateStringCompressed);
  const view = ocViewWrapper(hash, templateStringCompressed);

  return {
    template: {
      view,
      hash
    },
    bundle: { hash: bundleHash }
  }
};


const bundleAll = (options, compiled, callback) => {
  const { publishPath, publishFileName = 'template.js', componentPackage } = options;

  writeFileSync(path.join(publishPath, publishFileName), compiled.template.view);

  callback(null, {
    template: {
      type: componentPackage.oc.files.template.type,
      hashKey: compiled.template.hash,
      src: publishFileName
    },
    bundle: { hashKey: compiled.bundle.hash }
  });
};

module.exports = (options, callback) => {
  try {
    [copyOcNgEntities, compileNg, cleanOcNgEntities].forEach(fn => fn(options));
  } catch (err) {
    return callback('Angular compilation failed', err);
  }
  const compiled = compileNgWrapper(options);

  bundleAll(options, compiled, callback);
};

