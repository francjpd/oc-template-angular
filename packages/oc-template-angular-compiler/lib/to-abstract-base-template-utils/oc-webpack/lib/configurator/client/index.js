"use strict";

const MinifyPlugin = require("babel-minify-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const _ = require("lodash");
const pascalcase = require('pascalcase');


module.exports = options => {
  const buildPath = options.buildPath || "/build";
  const production = options.production;
  let angularCompilerDev;
  
  // We can't have multiple instances of ngtools/webpack.
  try {
    angularCompilerDev = require(path.join(options.componentPath, 'node_modules/@ngtools/webpack'));
  } catch (err) {
    angularCompilerDev = require(`@ngtools/webpack`);
  }
  const { AngularCompilerPlugin } = angularCompilerDev;

  let plugins = [
    new AngularCompilerPlugin({
      tsConfigPath: options.tsconfigPath,
      entryModule: `${options.viewPath}#${pascalcase('oc-provider-module')}`,
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        production ? "production" : "development"
      )
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
        { test: /\.scss$/, loader: ['raw-loader', 'sass-loader'], },
        { test: /\.css$/, loader: 'raw-loader', },
        { test: /\.html$/, loader: 'raw-loader' },
        { test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/, loader: '@ngtools/webpack' }
      ]
    },
    plugins,
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".json", ".css"]
    }
  };
};
