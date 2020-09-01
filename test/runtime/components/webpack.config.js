const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080/',
    './app.js'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/'
  },
  module: {
    rules: [
      {
        test: /\.json?$/,
        use: { 
          loader: 'json'
        }
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: [path.resolve(__dirname, '../../../src/babel')],
            }
        }
      } 
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {
      'ko-hot-loader': path.resolve(__dirname, '../../../src/runtime')
    }
  }
}
