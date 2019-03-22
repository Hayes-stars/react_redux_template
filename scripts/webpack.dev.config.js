
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin'); //处理不同操作系统路径问题
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

const PORT = 3010
function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}
webpackConfigBase.output.publicPath="/";
webpackConfigBase.entry.push("react-hot-loader/patch")
webpackConfigBase.entry.push(require.resolve('react-dev-utils/webpackHotDevClient'))
webpackConfigBase.entry.push(require.resolve('react-error-overlay'))
webpackConfigBase.plugins.push(new WatchMissingNodeModulesPlugin(resolve("../node_modules"))) //不存在模块自动npm install
webpackConfigBase.plugins.push(new CaseSensitivePathsPlugin())
const webpackConfigDev = {
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      IS_DEVELOPMETN: true,
      BASENAME: JSON.stringify("")
    }),
    // 自动打开浏览器插件
    new OpenBrowserPlugin({
      url: `http://localhost:${PORT}/`,
    }),
    // 热更新替换
    new webpack.HotModuleReplacementPlugin(),
    // 压缩
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS:{
        output: {
          comments: false
        },
        compress: {
          warnings: false
        }
      }
    }),
  ],
  devtool: 'eval',
  // devtool: 'cheap-module-eval-source-map', // 映射源代码方式
  devServer: {
    contentBase: resolve('../app'), // 指定服务器资源的根目录
    historyApiFallback: { // 应对返回404页面时定向到特定页面用
      disableDotRule: true,
    },
    overlay: false, // 用来在编译出错的时候，在浏览器页面上显示错误
    inline: true, // 设置页面引入，代码有变化，浏览器端刷新
    hot: true, // 设置热替换
    host: '0.0.0.0', // 服务器的主机号
    port: PORT, // 默认webpack是用 8080端口起的，通过port可以配成其他的端口
    setup(app) { // 访问Express app对象并向其添加自己的定制中间件
      app.use(errorOverlayMiddleware());
    }
  },
}


module.exports = merge(webpackConfigBase, webpackConfigDev)
