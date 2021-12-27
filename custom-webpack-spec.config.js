module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        loader: 'less-loader',
        options: {
          additionalData: `@root-entry-name: default;`,
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }
    ]
  }
};
