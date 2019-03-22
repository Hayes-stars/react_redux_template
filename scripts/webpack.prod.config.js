
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const Copy = require('copy-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CleanWebpackPlugin = require('clean-webpack-plugin');
function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}
const webpackConfigProd = {
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      IS_DEVELOPMETN: false,
      BASENAME: JSON.stringify("/activity")
    }),
    // 提取css
    // 根据入口文件，提取重复引用的公共代码类库，打包到单独文件中
    // new webpack.optimize.OccurenceOrderPlugin(),
    /* 压缩优化代码开始*/
    new webpack.optimize.UglifyJsPlugin({
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告  
        warnings: false,
        // 删除所有的 `console` 语句
        // 还可以兼容ie浏览器
        drop_console: false,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
      }
    }),
    // 分析代码
    // new BundleAnalyzerPlugin({ analyzerPort: 3011 }),
    new Copy([
      { from: './app/images', to: './images' },
      { from: './app/iconfont', to: './iconfont' },
    ]),
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new CleanWebpackPlugin(['dist'],{ root: resolve('../') }), //传入数组,指定要删除的目录
  ],
}
module.exports = merge(webpackConfigBase, webpackConfigProd)
