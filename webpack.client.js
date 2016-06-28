const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');

// plugins
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const DedupePlugin = webpack.optimize.DedupePlugin;
const DefinePlugin = webpack.DefinePlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;


module.exports = {
    target: 'web',
    cache: true,
    debug: true,
    devtool: 'source-map',

    module: {
        loaders: [
            {test: /\.ts$/, exclude: [/\.spec\.ts$/, /node_modules/], loader: 'ts'},
            {test: /\.html$/, loader: 'raw'},
            {test: /\.scss$/, include: [path.resolve(__dirname, 'src/client')], loader: 'raw!postcss-loader!sass'},
            {test: /\.scss$/, exclude: [path.resolve(__dirname, 'src/client')], include: [path.resolve(__dirname, 'src/styles')], loader: ExtractTextPlugin.extract('css!postcss-loader!sass')},
            {test: /\.json$/, loader: 'json'}
        ],

        noParse: [
            /angular2\/bundles\/.+/
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
        'assets/js/client': './src/client',
        'assets/js/vendor': './src/vendor',
        'assets/js/polyfills': './src/polyfills'
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
        new UglifyJsPlugin({
            compress: {
                dead_code: true,
                screw_ie8: true,
                unused: true,
                warnings: false
            },
            mangle: false
        })
    ],

    resolve: {
        extensions: ['', '.ts', '.js'],
        modulesDirectories: ['node_modules'],
        root: path.resolve('.')
    },

    output: {
        filename: '[name].js',
        path: path.resolve('./target'),
        publicPath: '/'
    }
};
