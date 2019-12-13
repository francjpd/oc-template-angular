"use strict";

const MemoryFS = require("memory-fs");
const webpack = require("webpack");
const { promisify } = require('util')

const memoryFs = new MemoryFS();

module.exports = async function compiler(config) {
  const logger = config.logger;
  delete config.logger;

  const compiler = webpack(config);
  compiler.outputFileSystem = memoryFs;

  const runPromise = promisify(compiler.run);

  return await runPromise()
    .then(stats => {
      // handleSoftErrors
      if (stats.hasErrors()) {
        softError = info.errors.toString();
        throw (softError);
      }
      const info = stats.toJson();

      const log = stats.toString(config.stats || "errors-only");

      if (log) {
        logger.log(log);
      }
      return memoryFs.data;
    })
    .catch(error => {
      // handleFatalError
      if (error) {
        throw (error);
      }


    });
};
