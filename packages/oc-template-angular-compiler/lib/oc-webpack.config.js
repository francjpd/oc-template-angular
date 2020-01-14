const webpackMerge = require('webpack-merge');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const ocAngularWebpack = (config, options) => {
    const ocConfig = {
        optimization: {
            // https://webpack.js.org/configuration/optimization/
            // Override production mode optimization for minification
            // As it currently breakes the build, still rely on babel-minify-webpack-plugin instead
            minimize: false
        },
        plugins: [
            new MinifyPlugin({}, { comments: false })
        ],
        externals: {
            'zone.js': 'Zone',
        }
    }

    const mergedConfig = webpackMerge.smart(config, ocConfig)

    removePluginByName(mergedConfig.plugins, 'IndexHtmlWebpackPlugin');
    removeMiniCssExtract(mergedConfig);

    if (Array.isArray(mergedConfig.entry.styles)) {
        // We want the global styles to be part of the "main" entry. The order of strings in this array
        // matters -- only the last item in the array will have its exports become the exports for the entire
        // webpack bundle
        mergedConfig.entry.main = [...mergedConfig.entry.styles, ...mergedConfig.entry.main];
    }

    delete mergedConfig.entry.polyfills;
    delete mergedConfig.entry.styles;
    delete mergedConfig.optimization.runtimeChunk;
    delete mergedConfig.optimization.splitChunks;

    return mergedConfig;
}

function removePluginByName(plugins, name) {
    const pluginIndex = plugins.findIndex(plugin => plugin.constructor.name === name);
    if (pluginIndex > -1) {
        plugins.splice(pluginIndex, 1);
    }
}

function removeMiniCssExtract(config) {
    removePluginByName(config.plugins, 'MiniCssExtractPlugin');
    config.module.rules.forEach(rule => {
        if (rule.use) {
            const cssMiniExtractIndex = rule.use.findIndex(use => typeof use === 'string' && use.includes('mini-css-extract-plugin'));
            if (cssMiniExtractIndex >= 0) {
                rule.use[cssMiniExtractIndex] = { loader: 'style-loader' }
            }
        }
    });
}

module.exports = (angularWebpackConfig, options) => {
    const ocWebpackConfig = ocAngularWebpack(angularWebpackConfig, options)

    // Feel free to modify this webpack config however you'd like to
    return ocWebpackConfig
}