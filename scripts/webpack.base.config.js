const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer-core')
const pxtorem = require('postcss-pxtorem')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
});

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}
const theme = require(resolve('../package.json')).theme;

const webpackConfigBase = {

  entry: [
    resolve('../app/client.js')
  ],
  output: {
    path: resolve('../dist'),
    publicPath: "/activity/",
    filename: '[name].[hash:4].js',
    chunkFilename: 'chunks/[name][hash:4].js',
  },
  resolve: {
    extensions: ['.js', '.json', '.txt'],
    alias: {
      components: path.join(__dirname, '/../app/components'),
      actions: path.join(__dirname, '/../app/actions'),
      api: path.join(__dirname, '/../app/api'),
      reducers: path.join(__dirname, '/../app/reducers'),
      utils: path.join(__dirname, '/../app/utils'),
      controllers: path.join(__dirname, '/../app/controllers'),
      style: path.join(__dirname, '/../app/style'),
      images: path.join(__dirname, '/../app/images'),
    },
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [{
        test: /\.js[x]?$/,
        include: resolve('../app'),
        loader: 'happypack/loader?id=happyBabel',
      },
      {
        test: /\.(less|css)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [{
              loader: 'css',
              options: {
                importLoaders: 1,
                modules: true,
                localIdentName: 'cssm-[name]_[local]_[hash:base64:5]',
                sourceMap: true
              }
            },
            {
              loader: 'postcss',
              options: {
                plugins: (loader) => [
                  autoprefixer({
                    remove: false,
                    browsers: ['iOS >= 8', 'Android >= 4']
                  }),
                  pxtorem({
                    rootValue: 32,
                    propList: ['*'],
                    selectorBlackList: [],
                  })
                ],
                sourceMap: true
              }
            },
            {
              loader: 'less',
              options: {
                sourceMap: true,
                modifyVars: theme
              }
            },
          ]
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        options: {
          limit: 8192, //小于   base64
          name: 'img/[name].[hash:4].[ext]'
        }
      },
      {
        test: /\.(woff|eot|ttf|svg|gif)$/,
        loader: 'url',
        options: {
          limit: 8192,
          name: 'font/[name].[hash:4].[ext]'
        }
      }
    ],
  },
  plugins: [
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'happyBabel',
      //如何处理  用法和loader 的配置一样
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true',
      }],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true,
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../scripts/dll/manifest.json'),
    }),
    // 提取css
    new ExtractTextPlugin('style.[hash:4].css'),
    // 将打包后的资源注入到html文件内    
    new HtmlWebpackPlugin({
      template: resolve('../app/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      chunksSortMode: 'dependency'
    }),
    new AddAssetHtmlPlugin({
      filepath: require.resolve('../scripts/dll/lib.df97.js'),
      includeSourcemap: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'async-common',
      minChunks: 5, // 页面引入 大于等于3次  ，公共文件打包
    }),
    new webpack.ContextReplacementPlugin(
      /moment[\\\/]locale$/,
      /^\.\/(zh-cn)$/
    ),
    new CopyWebpackPlugin([{
        from: 'app/MP_verify_oFRe1Joj1GtdrfI3.txt',
        to: './MP_verify_oFRe1Joj1GtdrfI3.txt'
      },
      {
        from: 'app/BN9q3R8DTy.txt',
        to: './BN9q3R8DTy.txt'
      },
      {
        from: 'app/qxmZfiRqf8.txt',
        to: './qxmZfiRqf8.txt'
      },
    ]),

  ]
}

module.exports = webpackConfigBase