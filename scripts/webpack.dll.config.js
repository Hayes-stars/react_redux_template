const webpack = require('webpack');
const path = require('path');

module.exports = {
    output: {
        // 将会生成./ddl/lib.js文件
        path: path.join(__dirname, '../scripts/dll'),
        filename: '[name].[hash:4].js',
        library: '[name]',
    },
    entry: {
        "lib": [
            'react',
            'react-dom',
            'react-router',
            // 'history',
            'react-addons-css-transition-group',
            'redux',
            'react-redux',
            'react-router-redux',
            'redux-actions',
            'redux-thunk',
            'immutable',
            'whatwg-fetch',
            // 'antd',
            // 'antd-mobile',
            // 'moment',
        ],
    },
    plugins: [
        new webpack.DllPlugin({
            // 生成的映射关系文件
            path: path.join(__dirname, '../scripts/dll/manifest.json'),
            name: '[name]',
            context: __dirname,
        }),
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
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            }
        }),
    ],
};