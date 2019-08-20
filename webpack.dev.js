const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const devMode = process.env.NODE_ENV !== 'production';
/*
 * @babel/polyfill 支持promise object.assign等. 老版本是在index.js中require('@babel/polyfill')引入
 * */
module.exports = merge(common, {
    entry: {
        main: ['@babel/polyfill', './src/MainModule/index.js'],
        demo: ['@babel/polyfill', './src/DemoModule/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist/dev/'),
        filename: 'dist/[name][hash].js'
    },
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify('development')
        // }),
        new CleanWebpackPlugin(['dist/dev/']),
        new HtmlWebpackPlugin({
            title: 'Dev', // 模板中有title就会替代
            template: 'template/dev-template.html', // html模板
            filename: 'pages/main.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            title: 'Dev', // 模板中有title就会替代
            template: 'template/dev-template.html', // html模板
            filename: 'pages/demo.html',
            chunks: ['demo'] // 引入entry对应的js文件
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    mode: 'development', // 开发模式不会压缩代码
    devtool: 'inline-source-map',// 仅用于development
    // watch: false, // 在webpack-dev-server和webpack-dev-middleware中watch default enabled
    // watchOptions: {
    //   aggregateTimeout: 300, // 每次rebuild的延迟
    //   ignored: /node_modules/, // not watch node_moudules
    //   poll: 1000 // 每一秒检查文件是否change, true=>rebuild
    // },
    devServer: {
        contentBase: path.join(__dirname, '/dist/dev/pages/'),// 对哪个目录下的文件进行热加载
        compress: true, // 是否压缩
        port: 9000,
        hot: true,
        open: true,
        openPage: 'pages/main.html',
    }
});
console.log(process.env.NODE_ENV, '===================================================', webpack.DefinePlugin);