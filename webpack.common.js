const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: [/src/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env', '@babel/polyfill'],
                        plugins: [
                            ['import', { libraryName: 'antd', style: 'css' }],
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
                            ["@babel/plugin-proposal-decorators", { "legacy": true }], //支持修饰符
                            // "@babel/plugin-proposal-function-sent",
                            // "@babel/plugin-proposal-export-namespace-from",
                            // "@babel/plugin-proposal-numeric-separator",
                            // "@babel/plugin-proposal-throw-expressions",

                            // Stage 3
                            // "@babel/plugin-syntax-dynamic-import",
                            // "@babel/plugin-syntax-import-meta",
                            ["@babel/plugin-proposal-class-properties", { "loose": true }]// ES7中类属性的定义=>支持类中定义属性
                            // "@babel/plugin-proposal-json-strings"
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images/'
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
            {
                test: /\.less$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    'less-loader' // compiles Less to CSS
                ]
            },
            {
                test: /\.md$/,
                use: [
                    'text-loader'
                ]
            }
        ]
    }
};