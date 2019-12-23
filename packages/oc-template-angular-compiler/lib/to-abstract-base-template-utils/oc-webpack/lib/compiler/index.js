const MemoryFS = require("memory-fs");
const webpack = require("webpack");
const memoryFs = new MemoryFS();

module.exports = function compiler(config, callback) {
  const logger = config.logger;
  delete config.logger;

  const compiler = webpack(config);
  compiler.outputFileSystem = memoryFs;

  compiler.run((err, stats) => {
    if (err) {
      return callback(err);
    }
    const info = stats.toJson();

    // handleSoftErrors
    if (stats.hasErrors()) {
      softError = info.errors.toString();
      return callback(softError);
    }
    
    const log = stats.toString(config.stats || "errors-only");

    if (log) {
      logger.log(log);
    }
    callback(null, memoryFs.data);
  })

};
