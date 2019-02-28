// webpack 是node的写法
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
let UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  // 优化css 优化项
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
    // 它指定了服务器资源的根目录，如果不写入contentBase的值，那么contentBase默认是项目的目录。
    contentBase: path.resolve(__dirname, 'distDemo1'),
    // host设置的是服务器的主机号
    host: 'localhost',
    // 这个配置属性用来在编译出错的时候，在浏览器页面上显示错误
    overlay: false,
    /**这是一个布尔型的值，当它被设置为true的时候对所有的服务器资源采用gzip压缩
      采用gzip压缩的优点和缺点：
      优点：对JS，CSS资源的压缩率很高，可以极大得提高文件传输的速率，从而提升web性能
      缺点：服务端要对文件进行压缩，而客户端要进行解压，增加了两边的负载
     * 
     */
    compress: true,
    // 进度条
    progress: true,
    // 开启服务的端口号
    port: 9090
  },
  // 模式 ： 默认2种：production development
  mode: 'development',
  //入口
  entry: './src/index.js',
  // 出口
  output: {
    // 打包后的文件名 每次都会产生不同的文件，防止缓存
    filename: 'index.[hash:8].js',
    // 打包后的路径 必须是一个绝对路径 __dirname 的作用：在当前路径下产生一个叫dist的文件夹
    path: path.resolve(__dirname, 'distDemo1')
  },
  // 插件：  数组 放置所有的webpack插件
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html',
      minify: {
        // 去除双引号
        removeAttributeQuotes: true,
        // 是否去除空格
        collapseWhitespace: true
      },
      // 添加hash 时间戳
      hash: true
    }),
    new MiniCssExtractPlugin({
      // template: path.join(__dirname, './src/index.css'),
      filename: 'main.css'
    })
  ],
  // 模块
  module: {
    // loader
    /**
     * loader:特点：单一
     * 多个loader 需要一个数组,或者数组对象
     * loader 有顺序：默认从右向左执行 说从下到上执行
     *
     */
    // 规则
    rules: [
      // css css-loader
      /**
       * css-loader：解决@import 语法
       * style-loader:把css 插入到head标签中
       * less-loaer:处理less 文件 要安装less less-loader
       * sass-loader
       * stylus-loader
       */
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
