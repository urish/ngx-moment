// @AngularClass

module.exports = function (config) {
  var _config = {
    basePath: '',
    frameworks: ['jasmine'],

    files: [
      { pattern: '*.spec.ts', watched: false }
    ],

    preprocessors: {
      '*.ts': ['webpack', 'sourcemap']
    },

    webpack: {
      resolve: {
        root: __dirname,
        extensions: ['', '.ts', '.js', '.json'],
      },
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.ts$/,
            loader: 'typescript-simple',
            exclude: [/node_modules/]
          }
        ]
      },
      stats: { colors: true, reasons: true },
      debug: false
    },

    webpackServer: {
      noInfo: true
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,

    // See http://stackoverflow.com/a/27873086/830623
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  };

  if (process.env.TRAVIS){
    _config.browsers = ['Chrome_travis_ci'];
  }

  config.set(_config);
};
