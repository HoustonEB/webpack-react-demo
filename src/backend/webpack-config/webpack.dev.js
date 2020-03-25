const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const config = require('common/config');

/*
 * @babel/polyfill 支持promise object.assign等. 老版本是在index.js中require('@babel/polyfill')引入
 * */
module.exports = merge(common, {
    mode: 'development', // 开发模式不会压缩代码
    devtool: 'cheap-source-map', // 'inline-source-map',// 仅用于development
    entry: {
        main: ['@babel/polyfill', config.path.frontend + '/MainModule/index.js'],
        demo: ['@babel/polyfill', config.path.frontend + '/DemoModule/index.js']
    },
    output: {
        path: config.path.dev,
        filename: './dll/[name].bundle.[hash].js',
        // publicPath: '/jjij/'
    },
    plugins: [
        new webpack.DefinePlugin({
            '__PRODUCTION__': false,
            '__DEVELOPMENT__': true,
            '__DEVTOOLS__': true
        }),
        new CleanWebpackPlugin(['dev'], {
            root: config.path.dest,
            exclude: ['dist'],
            // Write logs to console.17629992939
            verbose: true,
            // Use boolean "true" to test/emulate delete. (will not remove files).
            // Default: false - remove files
            dry: false 
        }),
        new HtmlWebpackPlugin({
            title: 'Dev', // 模板中有title就会替代
            template: config.path.webpackTemplates + '/dev-page.html', // html模板
            filename: config.path.dev + '/pages/main.html',
            chunks: ['main', 'vendor'] // 使用splitChunks拆成多个文件需要引入
        }),
        new HtmlWebpackPlugin({
            title: 'Dev', // 模板中有title就会替代
            template: config.path.webpackTemplates + '/dev-page.html', // html模板
            filename: config.path.dev + '/pages/demo.html',
            chunks: ['demo', 'vendor'] // 引入entry对应的js文件
        }),
        // new webpack.HotModuleReplacementPlugin()
    ],
    // watch: false, // 在webpack-dev-server和webpack-dev-middleware中watch default enabled
    // watchOptions: {
    //   aggregateTimeout: 300, // 每次rebuild的延迟
    //   ignored: /node_modules/, // not watch node_moudules
    //   poll: 1000 // 每一秒检查文件是否change, true=>rebuild
    // },
    devServer: {
        host:'localhost',
        // contentBase: [config.path.src],// 对哪个目录下的文件进行热加载
        compress: false, // 是否压缩
        port: 9000,
        inline: true,
        hot: true,
        // open: true,
        // openPage: 'pages/main.html',
    }
});