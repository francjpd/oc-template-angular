const MinifyPlugin = require('babel-minify-webpack-plugin');
const webpack = require('webpack');
const _ = require('lodash');

module.exports = ({ externals, entry, publishFileName, buildPath = '/build', production }) => {
  let plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        production ? 'production' : 'development'
      )
    })
  ];
  if (production) {
    plugins = plugins.concat(new MinifyPlugin());
  }

  const cacheDirectory = !production;
  const polyfills = ['Object.assign'];

  return {
    mode: production ? 'production' : 'development',
    optimization: {
      // https://webpack.js.org/configuration/optimization/
      // Override production mode optimization for minification
      // As it currently breakes the build, still rely on babel-minify-webpack-plugin instead
      minimize: false
    },
    entry: entry,
    output: {
      path: buildPath,
      filename: publishFileName
    },
    externals: _.omit(externals, polyfills),
    plugins
  };
};