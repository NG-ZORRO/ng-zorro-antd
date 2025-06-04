// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const tags = process.env && process.env['NG_TEST_TAGS'];
const processENV = require('process');
processENV.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'viewport'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-spec-reporter'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-junit-reporter'),
      require('karma-viewport')
    ],
    client: {
      jasmine: {
        random: false
      },
      clearContext: true, // leave Jasmine Spec Runner output visible in browser
      ...(tags && { args: [tags] })
    },
    coverageReporter: {
      subdir: '.',
      dir: require('path').join(__dirname, '../coverage-report'),
      reporters: [{ type: 'html' }, { type: 'text-summary' }, { type: 'lcovonly' }, { type: 'cobertura' }]
    },
    reporters: ['progress', 'kjhtml', 'spec', 'junit'],
    junitReporter: {
      outputDir: '../junit'
    },
    specReporter: {
      maxLogLines: 5,
      suppressErrorSummary: true,
      suppressFailed: false,
      suppressPassed: false,
      suppressSkipped: true,
      showSpecTiming: false
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--disable-gpu', '--no-sandbox']
      }
    },
    singleRun: false,
    browserDisconnectTimeout: 1000 * 60 * 10, // (Default: 2000)
    browserNoActivityTimeout: 1000 * 60 // (Default: 10000)
  });
};
