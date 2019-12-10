const getJSFromUrl = require("../lib/to-be-published/get-js-from-url");
const Zone = require('zone.js');

describe("When the module is called", () => {
  const predicate = getJSFromUrl({
    globals: { Zone },
    url: "cdn/path/to/file",
    key: "666",
    extractor: jest.fn((key, context) => context.oc.angularComponents[key])
  });

  it("Should correctly initialize a function", () => {
    expect(predicate).toBeInstanceOf(Function);
    expect(predicate.length).toBe(1);
  });

  describe("and the returned function is invoked", () => {
    it("should correctly return the evaluated js", done => {
      predicate((err, res) => {
        expect(err).toBe(null);
        expect(res).toMatchSnapshot();
        done();
      });
    });

    describe("but the evaluated js causes an error", () => {
      const jsError = "throw new Error('Error in template');";
      beforeEach(() => {
        require("minimal-request").__setResponse(jsError);
      });

      it("should send the error to the callback", done => {
        predicate((err, res) => {
          expect(err.message).toBe("Error in template");
          done();
        });
      });
    });
  });
});
