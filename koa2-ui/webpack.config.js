const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const PluginProposalClassProperties= require('@babel/plugin-proposal-class-properties')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        port: 9000,
        contentBase: './dist',
        publicPath: '/',
        historyApiFallback: true
    },
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, 'src/'),
            utils: path.resolve(__dirname, 'src/utils')
        },
        extensions: ['.js', '.jsx', 'ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: require.resolve('babel-loader'),
                    options: {
                        presets: [
                            ['@babel/preset-react']
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            }, {
                test: /\.tsx?$/,
                use: 'ts-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: "css-loader",
                    // options: {
                    //     esModule: true,
                    //     modules: {
                    //         // 这个为true时，只能通过import { XX } from 'xx.css'的形式，
                    //         // 不能通过 import styles from 'xx.css'的形式
                    //         // namedExport: true,
                    //         // localIdentName: 'foo__[name]__[local]',
                    //         localIdentName: '[local]_[hash:5]',
                    //     }
                    // }
                }]
            },
            {
                test: /\.less$/i,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader',
                    // options: {
                    //     esModule: true,
                    //     modules: {
                    //         // 这个为true时，只能通过import { XX } from 'xx.css'的形式，
                    //         // 不能通过 import styles from 'xx.css'的形式
                    //         namedExport: true,
                    //         // localIdentName: 'foo__[name]__[local]',
                    //         localIdentName: '[local]_[hash:5]',
                    //     }
                    // }
                }, {
                    loader: 'less-loader',
                    options: {
                        webpackImporter: true,
                    },
                }]
            }
        ]
    },
    plugins: [
        // new MiniCssExtractPlugin({
        //     filename: '[name].css',
        //     chunkFilename: '[id].css',
        //     ignoreOrder: false, // 忽略有关顺序冲突的警告
        // }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
            publicPath: '/'
        })
    ]
}