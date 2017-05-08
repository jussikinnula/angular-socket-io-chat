const testWebpackConfig = require('./webpack.test');

const karmaConfig = (config) => {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    files: [ { pattern: './config/karma.entry.js', watched: false } ],

    preprocessors: { './config/karma.entry.js': ['webpack', 'sourcemap'] },

    // webpack config
    webpack: testWebpackConfig,

    // webpack server config
    webpackServer: { noInfo: true },

    webpackMiddleware: { stats: 'errors-only' },

    reporters: ['dots'],

    logLevel: config.LOG_INFO,

    autoWatch: false,

    singleRun: true,

    customLaunchers: {
      TRAVIS_CHROME: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    browsers: process.env.TRAVIS ? ['TRAVIS_CHROME'] : ['Chrome']
  });
};

module.exports = karmaConfig;