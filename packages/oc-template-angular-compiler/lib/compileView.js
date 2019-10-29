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
  const publishFileName = options.publishFileName || "template.js";
  const componentPackage = options.componentPackage;
  const { getInfo } = require("../index");
  const externals = getInfo().externals;
  const production = options.production;


  const compile = (options, cb) => {

    execSync(`ng build --output-path=${tempPath} --crossOrigin=none --prod=true --optimization=false --baseHref=${componentPath} --output-hashing none`);
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


      const angularRoot = `oc-angularRoot-${componentPackage.name}`;
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
  };

  async.waterfall(
    [
      (next) => compile({ viewPath: path.join(componentPath, '/src/main.ts') }, next),
      (compiled, next) => fs.ensureDir(publishPath, err => next(err, compiled)),
      (compiled, next) =>
        fs.writeFile(
          path.join(publishPath, publishFileName),
          compiled.template.view,
          err => next(err, compiled)
        )
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
