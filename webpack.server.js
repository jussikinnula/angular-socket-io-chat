//const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    target: 'node',

    entry: {
        'assets/js/server': './src/server'
    },

    resolve: {
        extensions: ['', '.ts', '.js'],
        modulesDirectories: ['node_modules'],
        root: path.resolve('./src')
    },

    module: {
        loaders: [
            {test: /\.ts$/, exclude: [/\.spec\.ts$/, /node_modules/], loader: 'ts'}
        ],

        noParse: [
            /angular2\/bundles\/.+/
        ]
    },

    stats: {
        cached: true,
        cachedAssets: true,
        chunks: true,
        chunkModules: true,
        colors: true,
        hash: false,
        reasons: false,
        timings: true,
        version: false
    },

    externals: function checkNodeImport(context, request, cb) {
        if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
            cb(null, 'commonjs ' + request); return;
        }
        cb();
    },

    node: {
        global: true,
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: true
    },

    output: {
        filename: '[name].js',
        path: path.resolve('./target'),
        publicPath: '/'
    },
};