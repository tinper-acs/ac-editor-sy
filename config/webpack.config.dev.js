const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");
const config = webpackMerge(baseConfig, {
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    path.join(__dirname, '../demo/index.js'),
  ],
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  devServer: {
    //主机域名
    host: '0.0.0.0',
    compress: true,
    port: '3000',
    //服务于webpack生成的静态文件，用dist
    // contentBase: path.join(__dirname, '../dist'),
    //热更新
    hot: true,
    //网页显示报错
    overlay: {
      //只显示错误的信息，warn不显示
      errors: true
    },
    //webpack-dev-server中加上/public路径进行访问 里面的js，css前方加上/public
    publicPath: '/',
    //所有404到这个页面
    historyApiFallback: {
      index: '/public/index.html'
    },
    //服务端压缩是否开启
    compress:true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3333/',
        changeOrigin: true
        // pathRewrite: {'^/api': ''}
      }
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, '../index.html')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new OpenBrowserPlugin({
      url: `http://127.0.0.1:3000`
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = config

