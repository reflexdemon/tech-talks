const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

const sitePath = path.resolve(__dirname, 'site');
const presentationsPath = path.resolve(__dirname, 'presentations');

const presentationFolders = glob.sync('*/', { cwd: presentationsPath }).map(f => f.replace(/\/$/, ''));

const htmlPlugins = presentationFolders.map(name => {
    return new HtmlWebpackPlugin({
        template: './templates/index.html',
        filename: name === 'java-11-to-17' ? 'index.html' : `${name}/index.html`,
        chunks: ['bundle'],
        chunksSortMode: 'manual',
        inject: 'body'
    });
});

module.exports = {
    mode: 'production',
    entry: {
        bundle: './js/presentation.js'
    },
    output: {
        path: sitePath,
        filename: '[name].js',
        clean: true
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: '> 2%, not dead', modules: false }]
                        ],
                        compact: false
                    }
                }
            },
            {
                test: /\.html$/,
                exclude: /templates/,
                type: 'asset/source'
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: { outputStyle: 'compressed' }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin({ banner: '/*! reveal.js */' }),
        new MiniCssExtractPlugin({ filename: 'reveal.css' }),
        new CopyPlugin({
            patterns: [
                { from: 'reveal.js/dist', to: 'dist', noErrorOnMissing: true },
                { from: 'reveal.js/plugin', to: 'plugin', noErrorOnMissing: true },
                { from: 'assets/images', to: 'images', noErrorOnMissing: true },
                { from: 'presentations', to: 'presentations', noErrorOnMissing: true }
            ]
        }),
        ...htmlPlugins
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: { drop_console: false },
                    format: { comments: false }
                },
                extractComments: false
            }),
            new CssMinimizerPlugin()
        ]
    }
};
