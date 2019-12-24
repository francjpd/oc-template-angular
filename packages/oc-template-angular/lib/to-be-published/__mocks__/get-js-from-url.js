
module.exports = () => cb => {
  return cb(null, {
    getInstance: jest.fn(),
    destroy: jest.fn()
  });
};
