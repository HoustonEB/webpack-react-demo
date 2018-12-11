const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = merge(common, {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/dev/'),
        filename: 'main[hash].js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist/dev/']),
        new HtmlWebpackPlugin({
            title: 'Dev', // 模板中有title就会替代
            template: 'template/dev-template.html' // 生成的html模板
        })
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
        contentBase: path.join(__dirname, 'dist'),// 对哪个目录下的文件进行热加载
        compress: true,
        port: 9000
    }
})