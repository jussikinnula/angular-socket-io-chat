const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

// plugins
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const DedupePlugin = webpack.optimize.DedupePlugin;
const DefinePlugin = webpack.DefinePlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;


var common = {
    resolve: {
        extensions: ['', '.ts', '.js']
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
    }
};

var client = {
    target: 'web',
    cache: true,
    debug: true,
    devtool: 'source-map',

    entry: {
        client: './src/client',
        vendor: [
            'es6-shim',
            'angular2/bundles/angular2-polyfills',
            'angular2/common',
            'angular2/core',
            'angular2/platform/browser',
            'angular2/router',
            'rxjs',
            'socket.io-client'
        ]
    },

    module: {
        loaders: [
            {test: /\.html$/, loader: 'raw'},
            {test: /\.scss$/, include: [path.resolve(__dirname, 'src/client')], loader: 'raw!postcss-loader!sass'},
            {test: /\.scss$/, include: [path.resolve(__dirname, 'src/styles')], loader: ExtractTextPlugin.extract('css!postcss-loader!sass')}
        ]
    },

    postcss: [
        autoprefixer({ browsers: ['last 3 versions', 'Firefox ESR'] })
    ],

    sassLoader: {
        outputStyle: 'compressed',
        precision: 10,
        sourceComments: false
    },

    plugins: [
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin('styles.css'),
        new DedupePlugin(),
        new OccurenceOrderPlugin(),
        new CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js', minChunks: Infinity}),
        new HtmlWebpackPlugin({
            chunksSortMode: 'none',
            filename: 'index.html',
            hash: true,
            inject: 'body',
            template: './src/index.html'
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
};

var server = {
    target: 'node',

    entry: {
        server: './src/server'
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
    }
};

var defaults = {
    resolve: {
        modulesDirectories: ['node_modules'],
        root: path.resolve('./src')
    },

    output: {
        filename: '[name].js',
        path: path.resolve('./public'),
        publicPath: '/'
    },
};

module.exports = [
    // Client
    webpackMerge({}, defaults, common, client),

    // Server
    webpackMerge({}, defaults, common, server)
];
