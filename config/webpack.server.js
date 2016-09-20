const common = require('./webpack.common');
const path = require('path');

module.exports = {
    target: 'node',

    resolve: common.resolve,

    entry: {
        'assets/js/server.js': './src/server'
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                exclude: [/\.spec\.ts$/, path.resolve(__dirname, '../node_modules')],
                loader: 'ts'
            }
        ]
    },

    stats: common.stats,

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

    output: common.output
};