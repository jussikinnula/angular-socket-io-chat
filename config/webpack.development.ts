const clone = require('js.clone');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const DefinePlugin = webpack.DefinePlugin;

import { root, includeClientPackages } from './helpers';
import * as commonWebpackConfig from './webpack.common';


export const commonPlugins = [];

export const commonConfig = {
  devtool: 'cheap-source-map'
};


// Client.
export const clientPlugins = [
  new DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('development')
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
