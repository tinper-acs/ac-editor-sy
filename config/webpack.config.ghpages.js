


const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const baseConfig = require('./webpack.base')

const pkg = require('../package.json')
const name = pkg.name
let publicPath = '/'
// 取package.json中 name 进行处理
// github.io 路径需要绝对路径或者正确的相对路径，用户可以自定义publicPath，视情况而定
if (name.startsWith('@yonyou')) {
  publicPath = name.replace('@yonyou', '')
} else if(!name.startsWith('/')){
  publicPath = `/${name}`
}

module.exports = webpackMerge(baseConfig, {
  mode:'production',
  entry: {
      app: path.join(__dirname, '../demo/index.js')
  },
  // externals:['react','react-dom','prop-types'],
  output: {
      filename: '[name].[hash].js',
      path: path.join(__dirname, '../ghpages'),
      publicPath: publicPath
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
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
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true 
      }),
      new OptimizeCSSAssetsPlugin({})  // use OptimizeCSSAssetsPlugin
    ], // [new UglifyJsPlugin({...})]
    splitChunks:{
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        },
        styles: {
          name: 'styles',
          test: /\.(sa|sc|c)ss$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
      new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV':  JSON.stringify('production')
          }
      }),
      new HtmlWebPackPlugin({
        template: path.join(__dirname, '../index.html'),
        filename: "./index.html"
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      })
  ]
})

