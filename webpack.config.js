const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const sitePath = path.resolve(__dirname, 'site');

module.exports = {
    mode: 'production',
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename],
        },
    },
    entry: {
        bundle: './src/js/presentation.js'
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
                        cacheDirectory: true,
                        compact: true
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin({ banner: '/*! tech-talks */' }),
        new MiniCssExtractPlugin({ filename: 'reveal.css' }),
        // Single HTML output — all presentations use ?presentation=name query param
        new HtmlWebpackPlugin({
            template: './src/html/index.html',
            filename: 'index.html',
            chunks: ['bundle'],
            chunksSortMode: 'manual',
            inject: 'body'
        }),
        new CopyPlugin({
            patterns: [
                { from: 'css', to: 'css', noErrorOnMissing: true },
                { from: 'assets/images', to: 'images', noErrorOnMissing: true, info: { minimized: true } },
                { from: 'presentations', to: 'presentations', noErrorOnMissing: true },
                { from: 'src/js/plugin.js', to: 'plugin/mermaid/plugin.js' },
                { from: 'src/js/spotlight.js', to: 'plugin/spotlight/spotlight.js' },
                { from: 'src/js/jsmind/plugin.js', to: 'plugin/jsmind/plugin.js' }
            ]
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    compress: {
                        drop_console: false,
                        passes: 2
                    },
                    format: {
                        comments: false
                    }
                },
                extractComments: false
            })
        ]
    }
};
