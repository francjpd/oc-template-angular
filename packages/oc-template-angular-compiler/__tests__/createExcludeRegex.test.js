const createExcludeRegex = require("../lib/to-abstract-base-template-utils/oc-webpack/lib/configurator/createExcludeRegex");

describe('createExcludeRegex', () => {
  it.each([
    ['node_modules/lodash', true],
    ['node_modules/oc-template-typescript-react-compiler', true],
    ['node_modules/oc-template-typescript-react-compiler/utils', false],
    ['node_modules/underscore', false]
  ])("should create a regex that match against any node module set aside given ones", (nodeModule, expected) => {
    const regex = createExcludeRegex([
      "oc-template-typescript-react-compiler/utils",
      "underscore"
    ]);
    expect(regex.test(nodeModule)).toBe(expected);
  });
})

