const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const DefinePlugin = webpack.DefinePlugin;
const LoaderOptionsPlugin = webpack.LoaderOptionsPlugin;

import { root } from './helpers';
import * as commonWebpackConfig from './webpack.common';

export const config = {
  devtool: 'cheap-source-map',

  resolve: commonWebpackConfig.commonConfig.resolve,

  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            query: {
              // use inline sourcemaps for "karma-remap-coverage" reporter
              sourceMap: false,
              inlineSourceMap: true,
              compilerOptions: {
                // Remove TypeScript helpers to be injected
                // below by DefinePlugin
                removeComments: true
              }
            }
          },
          'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        use: ['raw-loader', 'html-loader']
      },
      {
        test: /\.scss$/,
        use: ['raw-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.json$/,
        use: ['json-loader']
      }
    ]
  }
};

export const plugins = [
  new DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('development')
    }
  }),

  new LoaderOptionsPlugin({
    debug: false,
    options: {
      postcss: [
        autoprefixer({ browsers: ['last 3 versions', 'Firefox ESR'] })
      ],
      resolve: {}
    }
  })
];

module.exports = webpackMerge(
  config,
  { plugins }
);
