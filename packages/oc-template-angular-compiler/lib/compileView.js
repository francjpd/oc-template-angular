"use strict";

const async = require("async");
const fs = require("fs-extra");
const hashBuilder = require("oc-hash-builder");
const MemoryFS = require("memory-fs");
const minifyFile = require("oc-minify-file");
const ocViewWrapper = require("oc-view-wrapper");
const path = require("path");
const angularComponentWrapper = require("oc-angular-component-wrapper");
const strings = require("oc-templates-messages");

const {
  compiler,
  configurator: { client: webpackConfigurator }
} = require("./to-abstract-base-template-utils/oc-webpack");

const fontFamilyUnicodeParser = require("./to-abstract-base-template-utils/font-family-unicode-parser");
const ocProviderComponentTemplate = require("./oc-provider/oc-provider.component.template");
const ocProviderModuleTemplate = require("./oc-provider/oc-provider.module.template");
const ocProviderFactory = require("./oc-provider/oc-Provider-factory");
const viewTemplate = require("./viewTemplate");

module.exports = (options, callback) => {
  const viewFileName = options.componentPackage.oc.files.template.src;
  let viewPath = path.join(options.componentPath, viewFileName);
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

  const ocProviderComponent = {
    name: 'oc-provider.component.ts',
    content: ocProviderFactory(options.componentPackage.name, options.componentPath, ocProviderComponentTemplate),
    path: path.join(tempPath, 'oc-provider.component.ts')
  }

  const ocProviderModule = {
    name: 'oc-provider.module.ts',
    content: ocProviderFactory(options.componentPackage.name, viewPath, ocProviderModuleTemplate),
    path: path.join(tempPath, 'oc-provider.module.ts')
  }

  const compile = (options, cb) => {
    const config = webpackConfigurator({
      tsconfigPath: path.join(tempPath, "tsconfig.json"),
      viewPath: options.viewPath,
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

      let css = null;
      if (data.build["main.css"]) {
        // This is an awesome hack by KimTaro that will blow your mind.
        // Remove it once this get merged: https://github.com/webpack-contrib/css-loader/pull/523
        css = fontFamilyUnicodeParser(
          memoryFs.readFileSync(`/build/main.css`, "UTF8")
        );

        // We convert single quotes to double quotes in order to
        // support the viewTemplate's string interpolation
        css = minifyFile(".css", css).replace(/\'/g, '"');
        const cssPath = path.join(publishPath, `styles.css`);
        fs.outputFileSync(cssPath, css);
      }

      const angularRoot = `oc-angularRoot-${componentPackage.name}`;
      const templateString = viewTemplate({
        angularRoot,
        css,
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
      next =>
        fs.outputFile(
          path.join(tempPath, "tsconfig.json"),
          JSON.stringify({
            files: [ocProviderComponent.name, ocProviderModule.name],
            compilerOptions: {
              declaration: false,
              downlevelIteration: true,
              experimentalDecorators: true,
              importHelpers: true,
              moduleResolution: "node",
              module: "commonjs",
              target: "es2015",
              lib: ["es2018", "dom"],
              typeRoots: [path.join(__dirname, "../node_modules/@types")]
            },
            angularCompilerOptions: {
              fullTemplateTypeCheck: true,
              strictInjectionParameters: true
            }
          }),
          next
        ),
      next => fs.outputFile(ocProviderComponent.path, ocProviderComponent.content, next),
      next => fs.outputFile(ocProviderModule.path, ocProviderModule.content, next),
      // next => compile({ viewPath: ocProviderComponent.path }, next),
      // (compiled, next) =>
      //   fs.remove(ocProviderComponent.path, err => next(err, compiled)),
      next => compile({ viewPath: ocProviderModule.path }, next),
      (compiled, next) =>
        fs.remove(ocProviderModule.path, err => next(err, compiled)),
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
