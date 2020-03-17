const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',

    output: {
        path: `${__dirname}/dist`,
        filename: 'bundle.min.js'
    },

    devServer: {
        contentBase: `${__dirname}/dist`,
        host: '0.0.0.0',
        port: 8080,
        stats: 'errors-only'
    },

    resolve: {
        extensions: ['.jsx', '.js', '.json', '.scss'],
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        }
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(scss|css)$/,
                include: path.resolve('src', 'components'),
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            prependData: `
                              @import '~sassyfication';
                              @import 'src/styles/_global.scss';
                            `
                        }
                    }
                ]
            },
            {
                test: /\.(scss|css)$/,
                exclude: path.resolve('src', 'components'),
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true
                        }
                    },
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            prependData: `
                              @import '~sassyfication';
                              @import 'src/styles/_global.scss';
                            `
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            h: ['preact', 'h'],
            Fragment: ['preact', 'Fragment']
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),

        new HtmlWebpackPlugin({
            template: 'public/index.html',
            inject: true
        }),

        new MiniCssExtractPlugin({
            filename: 'bundle.min.css'
        })
    ]
};
