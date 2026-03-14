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
            // Priority 1: Custom individual files/mappings
            {
                directory: path.resolve(__dirname, 'custom-plugins'),
                publicPath: '/plugin/mermaid', // Map mermaid-plugin.js (named plugin.js)
                watch: true
            },
            {
                directory: path.resolve(__dirname, 'custom-plugins'),
                publicPath: '/plugin/spotlight', // Map spotlight.js here
                watch: true
            },
            // Priority 2: Built assets or specific overrides
            {
                directory: path.resolve(__dirname, 'site'),
                watch: true
            },
            // Priority 3: Shared assets
            {
                directory: path.resolve(__dirname, 'assets/images'),
                publicPath: '/images',
                watch: true
            },
            // Priority 4: Reveal.js library files (dist and plugin)
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
            // Priority 5: Presentation source content
            {
                directory: path.resolve(__dirname, 'presentations'),
                publicPath: '/presentations',
                watch: true
            },
            {
                directory: path.resolve(__dirname, 'css'),
                publicPath: '/css',
                watch: true
            }
        ],
        // Watch all markdown files and the index template for changes
        watchFiles: ['presentations/**/*.md', 'templates/**/*.html'],
        port: 8000,
        hot: true,
        liveReload: true,
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
