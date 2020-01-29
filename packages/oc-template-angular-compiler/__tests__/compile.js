jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

const _ = require("lodash");
const fs = require("fs-extra");
const nodeDir = require("node-dir");
const path = require("path");
const compile = require("../lib/compile.js");
jest.mock('child_process');
jest.mock("oc-template-angular", () => ({
  getInfo() {
    return {
      version: "6.6.6",
      externals: [
        { name: "Object.assign", global: "Object assign", url: "cdn.com/object-assign-auto" },
        { name: "Zone", global: "Zone", url: "cdn.com/zone.js" }
      ]
    };
  }
}));

describe.each([
  ['angular-component']
])('component', (componentName) => {

  it('should handle the happy path', (done) => {
    const scenario = {
      componentPackage: componentPackage(componentName),
      ocPackage: {
        version: "1.0.0"
      },
      production: true,
      componentPath: componentPath(componentName),
      publishPath: path.join(
        componentPath(componentName),
        "_compile-tests-package1"
      )
    };

    execute(scenario, err => {
      expect(err).toBeNull();
      fs.remove(scenario.publishPath, done);
    });
  })

  it('Should handle empty static folder', (done) => {
    const scenario = {
      componentPackage: (function () {
        const manifest = componentPackage(componentName);
        delete manifest.oc.files.static;
        return manifest;
      })(),
      ocPackage: {
        version: "1.0.0"
      },
      componentPath: componentPath(componentName),
      production: true,
      publishPath: path.join(
        componentPath(componentName),
        "_compile-tests-package2"
      )
    };

    execute(scenario, err => {
      expect(err).toBeNull();
      fs.remove(scenario.publishPath, done);
    });
  });

  it('Should handle server.js-less components', (done) => {
    const scenario = {
      componentPackage: (function () {
        const manifest = componentPackage(componentName);
        delete manifest.oc.files.data;
        return manifest;
      })(),
      ocPackage: {
        version: "1.0.0"
      },
      production: true,
      componentPath: componentPath(componentName),
      publishPath: path.join(
        componentPath(componentName),
        "_compile-tests-package4"
      )
    }

    execute(scenario, err => {
      expect(err).toBeNull();
      fs.remove(scenario.publishPath, done);
    });
  })
});

const componentPath = name => path.join(__dirname, `../../../mocks/${name}`);
const componentPackage = name =>
  fs.readJsonSync(
    path.join(__dirname, `../../../mocks/${name}`, "package.json")
  );

const execute = (options, cb) => {
  compile(options, (err, result) => {
    if (err) {
      return fs.remove(options.publishPath, () => cb(err));
    }

    result.oc.date = "";
    result.oc.files.template.version = "";
    nodeDir.paths(options.publishPath, (err2, res2) => {
      const files = _.chain(res2.files)
        .map(filePath => {
          const source = fs.readFileSync(filePath, "UTF8");
          return {
            source: !filePath.match(/\.png$/)
              ? source
                .replace(/"date":\d+/, "")
                .replace(/\"hashKey\"\:\".*?\"\,/g, "")
                .replace(/omponents\['.*?'\]/g, "omponents['dummyContent']")
                .replace(/key\:\'.*?\'/g, "")
                .replace(
                  /\[\"oc\",.*?\"angularComponents\",.*?\".*?\"\]/g,
                  '["oc", "angularComponents", "dummyContent"]'
                )
              : "img-binary",
            path: path.relative(__dirname, filePath)
          };
        })
        .sortBy(["path", "source"])
        .value();
      fs.remove(options.publishPath, () => cb(err, { result, files }));
    });
  });
};

test("When server compilation fails should return an error", done => {
  const publishPath = path.join(
    componentPath("angular-component"),
    "_compile-tests-package5"
  );
  const options = {
    componentPackage: (function () {
      const manifest = componentPackage("angular-component");
      manifest.oc.files.data = "not-found.js";
      return manifest;
    })(),
    ocPackage: {
      version: "1.0.0"
    },
    componentPath: componentPath("angular-component"),
    publishPath
  };

  execute(options, err => {
    expect(err).toContain("Angular compilation failed");
    fs.remove(publishPath, done);
  });
});
