const { outputFileSync, writeFileSync, existsSync } = require('fs-extra');
const hashBuilder = require('oc-hash-builder');
const MemoryFS = require('memory-fs');
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

const { compiler, configurator: { client: webpackConfigurator } } = require('./to-abstract-base-template-utils/oc-webpack');
const viewTemplate = require('./viewTemplate');


/**
 * Copy the needed entities (components, modules, etc.) to the <ng-app-path>/src/app/oc path.
 * These entities are created dinamically based on the components's name.
 */
function copyOcNgEntities(options) {
  const { componentPath, componentPackage, componentPackage: { name } } = options;
  const ocPath = path.join(componentPath, "src", "app", "oc");

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
 * Calls the ng CLI to compile the ng app.
 */
function compileNg(options) {
  const { publishPath, componentPath } = options;
  const tempPath = path.join(publishPath, 'temp');

  execSync(`ng build --output-path=${tempPath} --main=src/app/oc/main.ts --crossOrigin=none --prod=true --baseHref=${componentPath} --output-hashing none`);

  if (!existsSync(path.join(tempPath, 'main-es2015.js'))) {
    throw 'Angular compilation failed';
  }
};

/**
 * Cleans the folder created by the `copyOcNgEntities` function.
 */
const cleanOcNgEntities = ({ componentPath }) => rimraf.sync(path.join(componentPath, 'src', 'app', 'oc'));

/**
 * Compiles the ng wrapper (template.js) using the previously created build as a entry point.
 */
function compileNgWrapper(options, callback) {
  const { publishPath, production, publishFileName = 'template.js', componentPackage } = options;
  const { getInfo } = require('../index');
  const externals = getInfo().externals;
  const entry = path.join(publishPath, 'temp', 'main-es2015.js');

  const config = webpackConfigurator({
    entry,
    externals: externals.reduce((externals, dep) => {
      externals[dep.name] = dep.global;
      return externals;
    }, {}),
    publishFileName,
    production,
    buildIncludes: componentPackage.oc.files.template.buildIncludes || []
  });
  compiler(config, compilerHandler(options, config, callback));
}

/**
 * Function that returns a callback that will build the template based
 * on the config created by the `compileNgWrapper` function
 * 
 * @param {*} options 
 * @param {*} config 
 * @param {*} parentCallback 
 */
const compilerHandler = (options, config, parentCallback) => (err, data) => {
  const { publishPath, production, componentPackage: { name }, } = options;
  const { externals, output: { filename } } = config;

  if (err) {
    return parentCallback(err);
  }

  const memoryFs = new MemoryFS(data);
  const bundle = memoryFs.readFileSync(`/build/${filename}`, 'UTF8');
  const bundleHash = hashBuilder.fromString(bundle);
  const bundleName = 'angular-component';
  const bundlePath = path.join(publishPath, `${bundleName}.js`);
  const wrappedBundle = angularComponentWrapper(bundleHash, bundle);
  outputFileSync(bundlePath, wrappedBundle);

  const templateString = viewTemplate({
    angularRoot: `${name}`,
    externals,
    bundleHash,
    bundleName
  });

  const templateStringCompressed = production ? templateString.replace(/\s+/g, ' ') : templateString;
  const hash = hashBuilder.fromString(templateStringCompressed);
  const view = ocViewWrapper(hash, templateStringCompressed);

  return parentCallback(null, {
    template: { view, hash },
    bundle: { hash: bundleHash }
  })
};


const compilerWrapperHandler = (options, parentCallback) => (err, compiled) => {
  const { publishPath, publishFileName = 'template.js', componentPackage } = options;

  if (err) {
    parentCallback(strings.errors.compilationFailed(componentPackage.oc.files.template.src, err))
  }

  writeFileSync(path.join(publishPath, publishFileName), compiled.template.view);

  parentCallback(null, {
    template: {
      type: componentPackage.oc.files.template.type,
      hashKey: compiled.template.hash,
      src: publishFileName
    },
    bundle: { hashKey: compiled.bundle.hash }
  });
};

/**
 * Function that will compile the Ng app, the wrapper & return em within the callback.
 */
module.exports = (options, callback) => {
  try {
    [copyOcNgEntities, compileNg, cleanOcNgEntities].forEach(fn => fn(options));
  } catch (err) {
    return callback(err);
  }
  compileNgWrapper(options, compilerWrapperHandler(options, callback));
};

