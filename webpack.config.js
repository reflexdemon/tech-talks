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
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename],
        },
    },
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
                        cacheDirectory: true,
                        compact: true
                    }
                }
            },
            {
                test: /\.html$/,
                exclude: /templates/,
                type: 'asset/source'
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin({ banner: '/*! reveal.js */' }),
        new MiniCssExtractPlugin({ filename: 'reveal.css' }),
        new CopyPlugin({
            patterns: [
                { from: 'css', to: 'css', noErrorOnMissing: true },
                { from: 'assets/images', to: 'images', noErrorOnMissing: true, info: { minimized: true } },
                { from: 'presentations', to: 'presentations', noErrorOnMissing: true },
                // Only copy custom/locally fixed plugins
                { from: 'custom-plugins/plugin.js', to: 'plugin/mermaid/plugin.js' },
                { from: 'custom-plugins/spotlight.js', to: 'plugin/spotlight/spotlight.js' }
            ]
        }),
        ...htmlPlugins
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
