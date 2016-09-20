const common = require('./webpack.common');
const merge = require('webpack-merge');
const prod = require('./webpack.prod');
const webpack = require('webpack');

// plugins
const DefinePlugin = webpack.DefinePlugin;
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = merge(common, {
    devtool: 'cheap-source-map',
    plugins: [
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new LiveReloadPlugin({
            appendScriptTag: true
        })
    ]
});
