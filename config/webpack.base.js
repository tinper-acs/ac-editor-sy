const path = require('path')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, "src/components/"),
      assets: path.resolve(__dirname, "src/assets/"),
      containers: path.resolve(__dirname, "src/containers/")
    }
  },
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /.(js|jsx)$/,
      //   loader: 'eslint-loader',
      //   exclude: [
      //     path.resolve(__dirname, '../node_modules')
      //   ]
      // },
      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      },
      
      {
        test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 10000,
            name: "[name].[hash:8].[ext]"
          }
        }]
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "[name].[hash:8].[ext]"
          }
        }]
      }
    ]
  },
}
