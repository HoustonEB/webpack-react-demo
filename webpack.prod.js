const merge = require("webpack-merge");
const webpack = require('webpack');
const path = require("path");
const common = require("./webpack.common");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
// console.log(devMode, '===================================================', process.env.NODE_ENV);

module.exports = merge(common, {
    entry: {
        'main': './src/MainModule/index.js',
        'demo': './src/DemoModule/index.js'
        // 'main': {
        //     entry: "./src/MainModule/index.js",
        //     // vendor: ["react", "react-dom", "react-router-dom", "antd", "mobx", "mobx-react"]
        // },
        // 'demo': {
        //     entry: './src/DemoModule/index.js'
        // }
    },
    output: {
        path: path.resolve(__dirname, "dist/prod/"),
        filename: "dist/[name][hash]bundle.js",
        chunkFilename: "dist/[name].[chunkhash].js"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new CleanWebpackPlugin(["dist/prod/"]),
        new HtmlWebpackPlugin({
            title: "Prod ko", // 模板中有title就会替代
            template: "template/prod-template.html", // html模板
            filename: "pages/main.html",
            hash: true,
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            title: "Prod ko", // 模板中有title就会替代
            template: "template/prod-template.html", // html模板
            filename: "pages/demo.html",
            hash: true,
            chunks: ['demo']
        }),
        new MiniCssExtractPlugin({
            filename: 'dist/[name].css',
            chunkFilename: 'dist/[id].css'
        })
    ],
    mode: "production",
    devtool: 'source-map',
    // optimization: {
    //     splitChunks: {
    //         chunks: "all",
    //         name: "vendor"
    //     }
    // }
});