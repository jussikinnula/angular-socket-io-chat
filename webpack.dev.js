const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.client');

// plugins
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const DedupePlugin = webpack.optimize.DedupePlugin;
const DefinePlugin = webpack.DefinePlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;
const LiveReloadPlugin = require('webpack-livereload-plugin');


module.exports = {
    target: 'web',
    cache: true,
    debug: true,
    devtool: 'source-map',
    resolve: config.resolve,
    module: config.module,
    stats: config.stats,
    postcss: config.postcss,
    sassLoader: config.sassLoader,

    entry: {
        'assets/js/client': config.entry['assets/js/client'],
        'assets/js/vendor': config.entry['assets/js/vendor'],
        'assets/js/polyfills': config.entry['assets/js/polyfills']
    },

    plugins: [
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new ExtractTextPlugin('assets/css/styles.css'),
        new DedupePlugin(),
        new OccurenceOrderPlugin(),
        new CommonsChunkPlugin({
            name: [
                'assets/js/client',
                'assets/js/vendor',
                'assets/js/polyfills'
            ]
        }),
        new HtmlWebpackPlugin({
            chunksSortMode: 'none',
            filename: 'index.html',
            hash: true,
            inject: 'body',
            template: './src/index.html'
        }),
        new LiveReloadPlugin({
            appendScriptTag: true
        })
    ],

    output: config.output
};
