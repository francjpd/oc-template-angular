"use strict";

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const path = require("path");
const webpack = require("webpack");
const _ = require("lodash");
const pascalcase = require('pascalcase');


module.exports = options => {
  const buildPath = options.buildPath || "/build";
  const production = options.production;

  let plugins = [
    new AngularCompilerPlugin({
      tsConfigPath: options.tsconfigPath,
      entryModule: `${options.viewPath}#${pascalcase('oc-provider-module')}`,
      sourceMap: true
    })
  ];
  if (production) {
    plugins = plugins.concat(new MinifyPlugin());
  }

  const cacheDirectory = !production;
  const polyfills = ["Object.assign"];

  return {
    mode: production ? "production" : "development",
    optimization: {
      // https://webpack.js.org/configuration/optimization/
      // Override production mode optimization for minification
      // As it currently breakes the build, still rely on babel-minify-webpack-plugin instead
      minimize: false
    },
    entry: options.viewPath,
    output: {
      path: buildPath,
      filename: options.publishFileName
    },
    externals: _.omit(options.externals, polyfills),
    module: {
      rules: [
        // cssLoader,
        {
          test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          loader: '@ngtools/webpack'
        }
      ]
    },
    plugins,
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".json", ".css"]
    }
  };
};
