const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const { AotPlugin } = require('@ngtools/webpack')
const { PurifyPlugin } = require('@angular-devkit/build-optimizer')

function packageSort(packages) {
  return function sort(left, right) {
    const leftIndex = packages.indexOf(left.names[0])
    const rightindex = packages.indexOf(right.names[0])

    if (leftIndex < 0 || rightindex < 0) {
        throw "unknown package"
    }

    if (leftIndex > rightindex){
        return 1
    }

    return -1
  }
}

module.exports = {
  entry: {
    main: './src/main.ts',
    polyfills: './src/polyfills.ts',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: '@ngtools/webpack',
      },
      {
        test: /\.js$/,
        loader: '@angular-devkit/build-optimizer/webpack-loader',
        options: {
          sourceMap: false
        }
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  plugins: [
    new AotPlugin({
      tsConfigPath: path.resolve(__dirname, 'src/tsconfig.app.json'),
      entryModule: path.resolve(__dirname, 'src/app/app.module#AppModule'),
    }),
    new PurifyPlugin(),
    new UglifyJSPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      chunksSortMode: packageSort(['polyfills', 'main']),
    }),
  ],
}
