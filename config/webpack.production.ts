const clone = require('js.clone');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const DefinePlugin = webpack.DefinePlugin;
const LoaderOptionsPlugin = webpack.LoaderOptionsPlugin;
const NormalModuleReplacementPlugin = webpack.NormalModuleReplacementPlugin;
const NoEmitOnErrorsPlugin = webpack.NoEmitOnErrorsPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

import { root } from './helpers';
import * as commonWebpackConfig from './webpack.common';


export const commonPlugins = [
  // No errors
  new NoEmitOnErrorsPlugin(),

  // Loader options
  new LoaderOptionsPlugin({
    //minimize: false,
    debug: false
  }),

  // Replacements
  new NormalModuleReplacementPlugin(
    /facade(\\|\/)async/,
    root('node_modules/@angular/core/src/facade/async.js')
  ),
  new NormalModuleReplacementPlugin(
    /facade(\\|\/)collection/,
    root('node_modules/@angular/core/src/facade/collection.js')
  ),
  new NormalModuleReplacementPlugin(
    /facade(\\|\/)errors/,
    root('node_modules/@angular/core/src/facade/errors.js')
  ),
  new NormalModuleReplacementPlugin(
    /facade(\\|\/)lang/,
    root('node_modules/@angular/core/src/facade/lang.js')
  ),
  new NormalModuleReplacementPlugin(
    /facade(\\|\/)math/,
    root('node_modules/@angular/core/src/facade/math.js')
  )
];

export const commonConfig = {};


// Client.
export const clientPlugins = [
  new DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),

  new BundleAnalyzerPlugin({
    analyzerMode: 'disabled', // change it to `server` to view bundle stats
    reportFilename: 'report.html',
    generateStatsFile: true,
    statsFilename: 'stats.json',
  }),

  // Uglify
  new UglifyJsPlugin({
    sourceMap: true,
    mangle: {
      keep_fnames: true
    }
  })
];

export const clientConfig = {};


// Server.
export const serverPlugins = [];

export const serverConfig = {};


export default [
  // Client
  webpackMerge(
    clone(commonWebpackConfig.commonConfig),
    commonWebpackConfig.clientConfig,
    clone(commonConfig),
    clientConfig,
    { plugins: [
      ...commonWebpackConfig.commonPlugins,
      ...commonWebpackConfig.clientPlugins,
      ...commonPlugins,
      ...clientPlugins
    ]}
  ),

  // Server
  webpackMerge(
    clone(commonWebpackConfig.commonConfig),
    commonWebpackConfig.serverConfig,
    clone(commonConfig),
    serverConfig,
    { plugins: [
      ...commonWebpackConfig.commonPlugins,
      ...commonWebpackConfig.serverPlugins,
      ...commonPlugins,
      ...serverPlugins
    ]}
  )
];
