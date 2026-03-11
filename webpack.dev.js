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

function copyDevAssets() {
    const sitePath = path.resolve(__dirname, 'site');
    // Note: 'presentations' is served directly from source by devServer static,
    // so it does not need to be copied into site/ during development.
    const dirs = ['reveal.js/dist', 'reveal.js/plugin', 'assets/images'];
    const targets = ['dist', 'plugin', 'images'];

    for (let i = 0; i < dirs.length; i++) {
        const src = path.resolve(__dirname, dirs[i]);
        const dest = path.resolve(sitePath, targets[i]);
        if (fs.existsSync(src) && !fs.existsSync(dest)) {
            copyDir(src, dest);
        }
    }
}

function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

copyDevAssets();

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
            {
                directory: path.resolve(__dirname, 'site'),
                watch: true
            },
            {
                directory: path.resolve(__dirname, 'presentations'),
                publicPath: '/presentations',
                watch: true
            }
        ],
        // Watch all markdown files and the index template for changes
        watchFiles: ['presentations/**/*.md', 'templates/**/*.html'],
        port: 8000,
        hot: true,
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
