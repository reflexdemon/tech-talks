const path = require('path');
const webpack = require('webpack');

const pkg = require('./package.json');

const banner = `/*!
 * reveal.js ${pkg.version}
 * ${pkg.homepage}
 * MIT licensed
 *
 * Copyright (C) 2011-2023 Hakim El Hattab, https://hakim.se
 */\n`;

module.exports = {
    name: 'reveal-js-dev',
    mode: 'development',
    entry: './js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'reveal.js'
    },
    devServer: {
        static: {
            directory: path.join(__dirname),
        },
        port: 8000,
        hot: true,
        open: false
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
            },
            {
                test: /\.html$/,
                type: 'asset/source'
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin({ banner })
    ]
};
