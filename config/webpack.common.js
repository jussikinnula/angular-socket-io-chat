const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');

// plugins
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const ContextReplacementPlugin = webpack.ContextReplacementPlugin;
const DedupePlugin = webpack.optimize.DedupePlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OccurrenceOrderPlugin = webpack.optimize.OccurrenceOrderPlugin;
//const ProvidePlugin = webpack.ProvidePlugin;

module.exports = {
    target: 'web',
    cache: true,
    debug: false,

    module: {
        noParse: ['ws'],
        loaders: [
            {
                test: /\.ts$/,
                exclude: [path.resolve(__dirname, '../node_modules')],
                loader: 'ts-loader'
            },
            {
                test: /\.html$/,
                loader: 'raw'
            },
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, '../src/app')],
                loader: 'raw!postcss-loader!sass-loader'
            },
            {
                test: /\.scss$/,
                exclude: [path.resolve(__dirname, '../src/app')],
                include: [path.resolve(__dirname, '../src/styles')],
                loader: ExtractTextPlugin.extract('raw!postcss-loader!sass-loader')
            }
        ]
    },

    stats: {
        cached: true,
        cachedAssets: true,
        chunks: true,
        chunkModules: false,
        colors: true,
        hash: false,
        reasons: false,
        timings: true,
        version: false
    },

    entry: {
        'assets/js/main.js': './src/main',
        'assets/js/vendor.js': './src/vendor',
        'assets/js/polyfills.js': './src/polyfills'
    },

    externals: ['ws'],

    postcss: [
        autoprefixer({ browsers: ['last 3 versions', 'Firefox ESR'] })
    ],

    sassLoader: {
        outputStyle: 'compressed',
        precision: 10,
        sourceComments: false
    },

    plugins: [
        new ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname
        ),
        new ExtractTextPlugin('assets/css/main.css'),
        new OccurrenceOrderPlugin(),
        // new ProvidePlugin({
        //     io: 'socket.io-client'
        // }),
        new CommonsChunkPlugin({
            name: [
                'assets/js/main.js',
                'assets/js/vendor.js',
                'assets/js/polyfills.js'
            ]
        }),
        new HtmlWebpackPlugin({
            chunksSortMode: 'auto',
            filename: 'index.html',
            hash: true,
            inject: 'body',
            template: './src/index.html'
        })
    ],

    resolve: {
        extensions: ['', '.ts', '.js', '.json'],
        modulesDirectories: ['node_modules'],
        root: path.resolve('../src')
    },

    output: {
        filename: '[name]',
        path: path.resolve(__dirname, '../target'),
        publicPath: '/'
    },

    node: {
        'child_process': 'empty',
        clearImmediate: false,
        crypto: 'empty',
        fs: 'empty',
        module: false,
        net: 'empty',
        setImmediate: false,
        tls: 'empty',
        util: true
    }
};
