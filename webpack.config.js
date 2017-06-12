/**
 * Created by yeyangmei on 2017/6/1.
 */
const path = require('path');

module.exports = {
  entry: './src/example.js',
  //entry: './src/react/toggle.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: './dist/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js(x$|$)/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['es2015', 'react'],
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              root: '.',
              modules: true,
              localIdentName: '[path]__[local]-[hash: base64:5]',
            },
          },
        ],
      },
    ]
  }
};
