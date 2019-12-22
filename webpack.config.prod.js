const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkBoxPlugin = require('workbox-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',

    output: {
        path: `${__dirname}/dist`,
        filename: 'bundle.min.js'
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
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
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
            'process.env.NODE_ENV': JSON.stringify('production')
        }),

        // new BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            inject: true,
            minify: true
        }),

        new MiniCssExtractPlugin({
            filename: 'bundle.min.css'
        }),

        new WorkBoxPlugin.GenerateSW({
            swDest: 'sw.js',
            clientsClaim: true,
            skipWaiting: true
        }),

        new WebappWebpackPlugin({
            logo: `${__dirname}/src/assets/logo.svg`,
            outputPath: '',
            publicPath: './',
            prefix: '',
            favicons: {
                appName: 'Intl Demo',
                appDescription: 'Intl API Demo',
                developerName: 'Simon Reinisch',
                developerURL: 'https://github.com/Simonwep',
                background: '#fff',
                theme_color: '#2e2e2e',
                start_url: '.'
            }
        }),

        new CleanWebpackPlugin()
    ]
};
