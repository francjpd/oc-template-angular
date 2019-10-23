const request = require("minimal-request");
const vm = require("vm");

module.exports = ({ url, key, globals, timeout = 5000, extractor }) => cb => {
  request({ url, timeout }, (err, jsAsText) => {
    if (err) {
      return cb({
        status: err,
        response: {
          error: `request ${url} failed (${jsAsText})`
        }
      });
    }
    console.log("get-js-from-url");
    const context = Object.assign({}, globals);

    try {
      vm.runInNewContext(jsAsText, context);
    } catch (err) {
      return cb(err);
    }
    const cached = extractor(key, context);
    cb(null, cached);
  });
};
