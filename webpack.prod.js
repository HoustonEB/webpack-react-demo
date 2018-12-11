const merge = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    entry: {
        app: "./src/index.js",
        // vendor: ["react", "react-dom", "react-router-dom", "antd", "mobx", "mobx-react"]
    },
    output: {
        path: path.resolve(__dirname, "dist/prod/"),
        filename: "main[hash]bundle.js",
        chunkFilename: "[name].[chunkhash].js"
    },
    plugins: [
        new CleanWebpackPlugin(["dist/prod/"]),
        new HtmlWebpackPlugin({
            title: "Prod ko", // 模板中有title就会替代
            template: "template/prod-template.html" // 生成的html模板
        })
    ],
    mode: "production",
    devtool: undefined,
    // optimization: {
    //     splitChunks: {
    //         chunks: "initial",
    //         name: "vendor"
    //     }
    // }
})