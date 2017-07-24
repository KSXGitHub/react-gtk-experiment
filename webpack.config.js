const webpack = require('webpack')

module.exports = {
  entry: './src/App.jsx',
  output: {
    path: __dirname,
    filename: 'app.js',
  },
  module: {
    loaders: [
      {
        test: /\.js(x*)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css/,
        loader: 'text-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
}

