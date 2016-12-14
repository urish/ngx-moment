// @AngularClass

module.exports = function (config) {
  var _config = {
    basePath: '',
    frameworks: ['jasmine'],

    files: [
      { pattern: 'src/*.spec.ts', watched: false }
    ],

    preprocessors: {
      '**/*.ts': ['webpack', 'sourcemap']
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
            loader: 'awesome-typescript-loader',
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
    browsers: ['PhantomJS'],
    singleRun: true
  };

  config.set(_config);
};
