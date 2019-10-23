"use strict";

const compile = require("./lib/compile");
const template = require("oc-template-angular");

module.exports = {
  compile,
  getCompiledTemplate: template.getCompiledTemplate,
  getInfo: template.getInfo,
  render: template.render
};
