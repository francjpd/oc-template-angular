const compile = (callbackCompile) => {

    execSync(`ng build --output-path=${tempPath} --main=src/app/oc/main.ts --crossOrigin=none --prod=true --baseHref=${componentPath} --output-hashing none`);
    const angularCompiledBundle = path.join(tempPath, 'main-es2015.js');

    if (!existsSync(angularCompiledBundle)) {
      callbackCompile(new Error('Angular compilation failed'));
    }
    const config = webpackConfigurator({
      viewPath: angularCompiledBundle,
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
        return callbackCompile(err);
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
      outputFileSync(bundlePath, wrappedBundle);

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

      return callbackCompile(null, {
        template: { view, hash },
        bundle: { hash: bundleHash }
      })
    })
    rimraf.sync(ocPath);
  };