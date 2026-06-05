// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const tags = process.env && process.env['NG_TEST_TAGS'];
const processENV = require('process');
processENV.env.CHROME_BIN = require('puppeteer').executablePath();

function AngularBuildCleanupReporter() {
  this.onExit = done => {
    try {
      // The Angular 22 Karma builder leaves esbuild's service process alive after a single run.
      const esbuildPath = require.resolve('esbuild', { paths: [require.resolve('@angular/build')] });
      require(esbuildPath).stop();
    } finally {
      done();
    }
  };
}

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
      require('karma-viewport'),
      { 'reporter:angular-build-cleanup': ['type', AngularBuildCleanupReporter] }
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
    reporters: ['progress', 'kjhtml', 'spec', 'junit', 'angular-build-cleanup'],
    junitReporter: {
      outputDir: 'junit'
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
        flags: ['--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage']
      }
    },
    singleRun: false,
    browserDisconnectTimeout: 1000 * 60 * 10, // (Default: 2000)
    browserNoActivityTimeout: 1000 * 60 // (Default: 10000)
  });
};
