// webpack 是node的写法
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
let UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
let webpack = require('webpack')
module.exports = {
  optimization: {
    minimizer: [
      new UglifyjsWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'distDemo1'),
    host: 'localhost',
    overlay: false,
    compress: true,
    progress: true,
    port: 9090
  },
  mode: 'development',
  entry: {
    // 首页
    home: './src/index.js',
    other: './src/other.js'
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'distDemo1')
    // 加到统一的前缀
    // publicPath: 'http://www.baidu.com'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html',
      chunks: ['index'],
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true
      },
      hash: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/other.html'),
      filename: 'other.html',
      chunks: ['other', 'index'],
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true
      },
      hash: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'other.html',
      chunks: ['other', 'index'],
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true
      },
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-withimg-loader'
        }
      },
      // {
      //   test: /\.(png|jpg|gif|jpeg)$/,
      //   use: {
      //     loader: 'file-loader'
      //   }
      // },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: {
          // 做一个限制 当我们的图片，小于指定的图片大小的时候，使用base64,来转换
          // 如果大于指定的图片的大小，那么使用file-loader
          loader: 'url-loader',
          options: {
            limit: 1,
            outputPath: '/img/',
            // 单独给图片加前缀
            publickPath: 'http://www.xxx.com'
          }
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              ['@babel/plugin-transform-runtime']
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        exclude: /node-modules/
      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {}
          },
          {
            loader: 'postcss-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {}
          },
          {
            loader: 'postcss-loader',
            options: {}
          },
          {
            loader: 'less-loader',
            options: {}
          }
        ]
      }
    ]
  }
}
