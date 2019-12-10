const state = {};
module.exports = (opts, cb) => {
  var jsText =
    state.jsText ||
    `var oc = {
      angularComponents:{
        ['666']: {
          destroy: ${ jest.fn()},
          getInstance: ${ jest.fn()}
        }
      }
    };`;
  return cb(null, jsText);
};

module.exports.__setResponse = jsText => {
  state.jsText = jsText;
};
