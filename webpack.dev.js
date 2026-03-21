const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    name: 'presentation-dev',
    mode: 'development',
    entry: {
        main: './src/js/presentation.js'
    },
    output: {
        path: path.resolve(__dirname, 'site'),
        filename: '[name].js',
        publicPath: '/'
    },
    devServer: {
        static: [
            // Source assets served directly — no build step needed in dev
            {
                directory: path.resolve(__dirname, 'presentations'),
                publicPath: '/presentations',
                watch: true
            },
            {
                directory: path.resolve(__dirname, 'css'),
                publicPath: '/css',
                watch: true
            },
            {
                directory: path.resolve(__dirname, 'assets/images'),
                publicPath: '/images',
                watch: true
            },
            // Plugins served from src/js/
            {
                directory: path.resolve(__dirname, 'src/js'),
                publicPath: '/plugin/mermaid',
                watch: true
            },
            {
                directory: path.resolve(__dirname, 'src/js'),
                publicPath: '/plugin/spotlight',
                watch: true
            },
            {
                directory: path.resolve(__dirname, 'src/js/jsmind'),
                publicPath: '/plugin/jsmind',
                watch: true
            }
        ],
        watchFiles: {
            paths: [
                'presentations/**/*.md',
                'presentations/**/*.json',
                'src/html/**/*.html',
                'css/**/*.css'
            ],
            options: {
                usePolling: false,
                ignored: /node_modules/
            }
        },
        port: 8000,
        hot: false,
        liveReload: true,
        open: false,
        historyApiFallback: true
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
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // Single HTML — all presentations use ?presentation=name query param
        new HtmlWebpackPlugin({
            template: './src/html/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ]
};
