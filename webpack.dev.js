const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const fs = require('fs');

const presentationsPath = path.resolve(__dirname, 'presentations');
const presentationFolders = glob.sync('*/', { cwd: presentationsPath }).map(f => f.replace(/\/$/, ''));

const htmlPlugins = presentationFolders.map(name => {
    return new HtmlWebpackPlugin({
        template: './templates/index.html',
        filename: name === 'java-11-to-17' ? 'index.html' : `${name}/index.html`,
        inject: 'body'
    });
});

module.exports = {
    name: 'presentation-dev',
    mode: 'development',
    entry: {
        main: './js/presentation.js'
    },
    output: {
        path: path.resolve(__dirname, 'site'),
        filename: '[name].js',
        publicPath: '/'
    },
    devServer: {
        static: [
            // Priority 1: Source Content (Always take precedence)
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
            // Priority 2: Custom Plugins
            {
                directory: path.resolve(__dirname, 'custom-plugins'),
                publicPath: '/plugin/mermaid',
                watch: true
            },
            {
                directory: path.resolve(__dirname, 'custom-plugins'),
                publicPath: '/plugin/spotlight',
                watch: true
            },
            // Priority 3: Reveal.js library
            {
                directory: path.resolve(__dirname, 'reveal.js/dist'),
                publicPath: '/dist',
                watch: true
            },
            {
                directory: path.resolve(__dirname, 'reveal.js/plugin'),
                publicPath: '/plugin',
                watch: true
            },
            // Priority 4: Built assets fallback
            {
                directory: path.resolve(__dirname, 'site'),
                watch: false // Don't watch built folder in dev to avoid loops
            }
        ],
        // Watch all markdown files and the index template for changes
        watchFiles: {
            paths: [
                'presentations/**/*.md',
                'presentations/**/*.json',
                'templates/**/*.html',
                'css/**/*.css'
            ],
            options: {
                usePolling: false,
                ignored: /node_modules/
            }
        },
        port: 8000,
        hot: false,      // Disable HMR — markdown is served statically, full reload is correct
        liveReload: true, // Full page reload when watched files change
        open: false,
        historyApiFallback: true,
        setupMiddlewares: (middlewares, devServer) => {
            if (!devServer) {
                throw new Error('webpack-dev-server is not defined');
            }
            // Add a simple redirect/rewrite for the mermaid plugin path if needed
            // but the static priority above should handle it.
            return middlewares;
        }
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.md$/,
                type: 'asset/source'
            },
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
        ...htmlPlugins
    ]
};
