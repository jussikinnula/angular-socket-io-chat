const common = require('./webpack.common');
const merge = require('webpack-merge');
const webpack = require('webpack');

// plugins
const DedupePlugin = webpack.optimize.DedupePlugin;
const DefinePlugin = webpack.DefinePlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
        //new DedupePlugin(),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new UglifyJsPlugin({
            compress: {
                dead_code: true,
                screw_ie8: true,
                unused: true,
                warnings: false
            },
            mangle: false
        })
    ]
});
