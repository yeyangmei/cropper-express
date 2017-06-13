/**
 * Created by yeyangmei on 2017/6/1.
 */
const path = require('path');

module.exports = {
  entry: {
    pageExample: './src/js/example.js',
    pageUpload: './src/js/upload.js',
    pageReact: './src/react/toggle.jsx',
    pageJsNode: './src/js/js-node.js',
  },
  output: {
    // 在path.resolve中使用相对路径
    // __dirname始终指向当前js代码文件的目录。
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: './dist/',
  },
  resolve: {
    //开启后缀自动补全功能
    extensions: ['.js', '.jsx', '.json', '.css', '.less'],
    // alias:{
    //   'jquery':path.join(__dirname, 'node_modules/jquery/dist/jquery')
    // }
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
      {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" },

    ]
  },
  // externals: {
  //   "jquery" : "jQuery",
  //   "lodash": "_",
  //
  // }
};
