const merge = require("webpack-merge");
const webpack = require('webpack');
const path = require("path");
const common = require("./webpack.common");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('common/config');

module.exports = merge(common, {
    mode: "production",
    devtool: 'source-map',
    entry: {
        // 'main': './src/MainModule/index.js',
        // 'demo': './src/DemoModule/index.js'
        main: ['@babel/polyfill', "react", "react-dom", "react-router-dom", "antd", "mobx", "mobx-react", config.path.frontend + '/MainModule/index.js'],
        demo: ['@babel/polyfill', config.path.frontend + '/DemoModule/index.js']
    },
    output: {
        path: config.path.prodDll,
        filename: "[name].bundle.[hash].js",
        chunkFilename: "[name].[chunkhash].js"
    },
    plugins: [
        new webpack.DefinePlugin({
            '__PRODUCTION__': true,
            '__DEVELOPMENT__': false,
            '__DEVTOOLS__': false
        }),
        new CleanWebpackPlugin(['prod'], {
            root: config.path.dest, 
            exclude: ['dist'],
            // Write logs to console.
            verbose: true,
            // Use boolean "true" to test/emulate delete. (will not remove files).
            // Default: false - remove files
            dry: false 
        }),
        new HtmlWebpackPlugin({
            title: "Prod ko", // 模板中有title就会替代
            template: config.path.webpackTemplates + '/prod-page.html', // html模板
            filename: "pages/main.html",
            hash: true,
            chunks: ['main', 'vendor']
        }),
        new HtmlWebpackPlugin({
            title: "Prod ko", // 模板中有title就会替代
            template: config.path.webpackTemplates + '/prod-page.html', // html模板
            filename: "pages/demo.html",
            hash: true,
            chunks: ['demo', 'vendor']
        }),
        new MiniCssExtractPlugin({
            filename: 'dist/[name].css',
            chunkFilename: 'dist/[id].css'
        })
    ]
});