const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const HappyPack = require('happypack');

console.log(devMode, '===============423243====================================', process.env.NODE_ENV)

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: 'happypack/loader',
                // use: {
                //     loader: 'babel-loader',
                //     options: {
                //         presets: ['@babel/preset-react', '@babel/preset-env'],
                //         plugins: [
                //             ['import', {libraryName: 'antd', style: 'css'}],
                //             // ['react-hot-loader/babel'], // 功能待定
                //             // Stage 0
                //             // "@babel/plugin-proposal-function-bind",
                //
                //             // Stage 1
                //             // "@babel/plugin-proposal-export-default-from",
                //             // "@babel/plugin-proposal-logical-assignment-operators",
                //             // ["@babel/plugin-proposal-optional-chaining", { "loose": false }],
                //             // ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }],
                //             // ["@babel/plugin-proposal-nullish-coalescing-operator", { "loose": false }],
                //             // "@babel/plugin-proposal-do-expressions",
                //
                //             // Stage 2
                //             ["@babel/plugin-proposal-decorators", {"legacy": true}], //支持修饰符
                //             // "@babel/plugin-proposal-function-sent",
                //             // "@babel/plugin-proposal-export-namespace-from",
                //             // "@babel/plugin-proposal-numeric-separator",
                //             // "@babel/plugin-proposal-throw-expressions",
                //
                //             // Stage 3
                //             // "@babel/plugin-syntax-dynamic-import",
                //             // "@babel/plugin-syntax-import-meta",
                //             ["@babel/plugin-proposal-class-properties", {"loose": true}]// ES7中类属性的定义=>支持类中定义属性
                //             // "@babel/plugin-proposal-json-strings"
                //         ]
                //     }
                // }
            },
            // css-loader 将css属性url('./img.jpg')中的路径处理成打包后的路径.
            // html-loader 以相同的方式处理标签中的<img src="./my-image.png" />路径
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                ]
            },
            // 修改图片的路径
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images/',
                        publicPath: '../images/',
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts/'
                    }
                }
            },
            // {
            //     test: /\.html$/,
            //     use: {
            //         loader: 'html-loader',
            //         options: {
            //             outputPath: 'images/'
            //         }
            //     }
            // },
            /**
             * MiniCssExtractPlugin从编译后的js文件中提取css,与style-loader冲突一起使用报错
             * style-loader会创建标签嵌入到html中, css-loader允许js通过import导入css,将css嵌入到对应的js中
             */
            {
                test: /\.less$/,
                use: [
                    // MiniCssExtractPlugin.loader, // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'style-loader', // creates style nodes from JS strings 主要 将css 插入到head 的style 标签中内联
                    'css-loader', // translates CSS into CommonJS
                    'postcss-loader',
                    'less-loader', // compiles Less to CSS
                ]
            },
            {
                test: /\.md$/,
                use: [
                    'text-loader'
                ]
            }
        ]
    },
    resolve: {
        alias: {
            '/src': path.resolve(__dirname, './src')
        }
    },
    plugins: [
        // 2) create the plugin:
        new HappyPack({
            // 3) re-add the loaders you replaced above in #1:
            loaders: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        plugins: [
                            ['import', {libraryName: 'antd', style: 'css'}],
                            // ['react-hot-loader/babel'], // 功能待定
                            // Stage 0
                            // "@babel/plugin-proposal-function-bind",

                            // Stage 1
                            // "@babel/plugin-proposal-export-default-from",
                            // "@babel/plugin-proposal-logical-assignment-operators",
                            // ["@babel/plugin-proposal-optional-chaining", { "loose": false }],
                            // ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }],
                            // ["@babel/plugin-proposal-nullish-coalescing-operator", { "loose": false }],
                            // "@babel/plugin-proposal-do-expressions",

                            // Stage 2
                            ["@babel/plugin-proposal-decorators", {"legacy": true}], //支持修饰符
                            // "@babel/plugin-proposal-function-sent",
                            // "@babel/plugin-proposal-export-namespace-from",
                            // "@babel/plugin-proposal-numeric-separator",
                            // "@babel/plugin-proposal-throw-expressions",

                            // Stage 3
                            // "@babel/plugin-syntax-dynamic-import",
                            // "@babel/plugin-syntax-import-meta",
                            ["@babel/plugin-proposal-class-properties", {"loose": true}]// ES7中类属性的定义=>支持类中定义属性
                            // "@babel/plugin-proposal-json-strings"
                        ]
                    }
                }
            ]
        })
    ]
};