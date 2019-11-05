"use strict";

const async = require("async");
const fs = require("fs-extra");
const hashBuilder = require("oc-hash-builder");
const MemoryFS = require("memory-fs");
const ocViewWrapper = require("oc-view-wrapper");
const path = require("path");
const angularComponentWrapper = require("oc-angular-component-wrapper");
const strings = require("oc-templates-messages");
const { execSync } = require('child_process');
const rimraf = require("rimraf");
const ocRootComponentTemplate = require("./oc-root/oc-root.component.template");
const ocRootModuleTemplate = require("./oc-root/oc-root.module.template");
const ocMainTemplate = require("./oc-main/oc-main.template");
// const ocParamsServiceTemplate = require("./oc-params-service/oc-params-service.service.template");
const ocFactory = require("./utils/oc-factory");

const {
  compiler,
  configurator: { client: webpackConfigurator }
} = require("./to-abstract-base-template-utils/oc-webpack");

const viewTemplate = require("./viewTemplate");

module.exports = (options, callback) => {
  const viewFileName = options.componentPackage.oc.files.template.src;
  let viewPath = path.join(options.componentPath, viewFileName);
  const componentPath = options.componentPath;
  if (process.platform === "win32") {
    viewPath = viewPath.split("\\").join("\\\\");
  }
  const publishPath = options.publishPath;
  const tempPath = path.join(publishPath, "temp");
  const ocPath = path.join(componentPath, "src", "app", "oc");
  const publishFileName = options.publishFileName || "template.js";
  const componentPackage = options.componentPackage;
  const { getInfo } = require("../index");
  const externals = getInfo().externals;
  const production = options.production;


  const ocRootComponent = {
    name: 'oc-root.component.ts',
    content: ocFactory(options.componentPackage.name, options.componentPath, ocRootComponentTemplate),
    path: path.join(ocPath, 'oc-root.component.ts')
  }

  const ocRootModule = {
    name: 'oc-root.module.ts',
    content: ocFactory(options.componentPackage.name, viewPath, ocRootModuleTemplate),
    path: path.join(ocPath, 'oc-root.module.ts')
  }

  const ocMain = {
    name: 'main.ts',
    content: ocFactory(options.componentPackage.name, viewPath, ocMainTemplate),
    path: path.join(ocPath, 'main.ts')
  }

  const compile = (options, cb) => {

    execSync(`ng build --output-path=${tempPath} --main=src/app/oc/main.ts --crossOrigin=none --prod=true --baseHref=${componentPath} --output-hashing none`);
    const config = webpackConfigurator({
      viewPath: path.join(tempPath, 'main-es2015.js'),
      externals: externals.reduce((externals, dep) => {
        externals[dep.name] = dep.global;
        return externals;
      }, {}),
      publishFileName,
      production,
      buildIncludes: componentPackage.oc.files.template.buildIncludes || []
    });
    compiler(config, (err, data) => {
      if (err) {
        return cb(err);
      }

      const memoryFs = new MemoryFS(data);
      const bundle = memoryFs.readFileSync(
        `/build/${config.output.filename}`,
        "UTF8"
      );

      const bundleHash = hashBuilder.fromString(bundle);
      const bundleName = "angular-component";
      const bundlePath = path.join(publishPath, `${bundleName}.js`);
      const wrappedBundle = angularComponentWrapper(bundleHash, bundle);
      fs.outputFileSync(bundlePath, wrappedBundle);

      const angularRoot = `${componentPackage.name}`;
      const templateString = viewTemplate({
        angularRoot,
        externals,
        bundleHash,
        bundleName
      });

      const templateStringCompressed = production
        ? templateString.replace(/\s+/g, " ")
        : templateString;
      const hash = hashBuilder.fromString(templateStringCompressed);
      const view = ocViewWrapper(hash, templateStringCompressed);
      return cb(null, {
        template: { view, hash },
        bundle: { hash: bundleHash }
      });
    });

    rimraf.sync(ocPath);
  };

  async.waterfall(
    [
      (next) => fs.outputFile(ocRootComponent.path, ocRootComponent.content, next),
      // (next) => fs.outputFile(ocParamsService.path, ocParamsService.content, next),
      (next) => fs.outputFile(ocRootModule.path, ocRootModule.content, next),
      (next) => fs.outputFile(ocMain.path, ocMain.content, next),
      (next) => compile({ viewPath: path.join(componentPath, '/src/main.ts') }, next),
      (compiled, next) => fs.ensureDir(publishPath, err => next(err, compiled)),
      (compiled, next) => {
        return fs.writeFile(
          path.join(publishPath, publishFileName),
          compiled.template.view,
          err => next(err, compiled)
        )
      }

    ],
    (err, compiled) => {
      if (err) {
        return callback(strings.errors.compilationFailed(viewFileName, err));
      }
      callback(null, {
        template: {
          type: options.componentPackage.oc.files.template.type,
          hashKey: compiled.template.hash,
          src: publishFileName
        },
        bundle: { hashKey: compiled.bundle.hash }
      });
    }
  );
};
