const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const pkg = require('./package.json');

const banner = `/*!
 * reveal.js ${pkg.version}
 * ${pkg.homepage}
 * MIT licensed
 *
 * Copyright (C) 2011-2023 Hakim El Hattab, https://hakim.se
 */\n`;

const configs = [
    {
        name: 'reveal-js',
        entry: './js/index.js',
        outputPath: 'dist',
        outputFile: 'reveal.js',
        library: null
    },
    {
        name: 'reveal-esm',
        entry: './js/index.js',
        outputPath: 'dist',
        outputFile: 'reveal.esm.js',
        library: { type: 'module' },
        experiments: { outputModule: true }
    },
    {
        name: 'reveal-css',
        entry: './css/reveal.scss',
        outputPath: 'dist',
        outputFile: 'reveal.css',
        library: null
    },
    {
        name: 'plugin-highlight',
        entry: './plugin/highlight/plugin.js',
        outputPath: 'plugin/highlight',
        outputFile: 'highlight.js',
        library: { name: 'RevealHighlight', type: 'umd' }
    },
    {
        name: 'plugin-markdown',
        entry: './plugin/markdown/plugin.js',
        outputPath: 'plugin/markdown',
        outputFile: 'markdown.js',
        library: { name: 'RevealMarkdown', type: 'umd' }
    },
    {
        name: 'plugin-search',
        entry: './plugin/search/plugin.js',
        outputPath: 'plugin/search',
        outputFile: 'search.js',
        library: { name: 'RevealSearch', type: 'umd' }
    },
    {
        name: 'plugin-notes',
        entry: './plugin/notes/plugin.js',
        outputPath: 'plugin/notes',
        outputFile: 'notes.js',
        library: { name: 'RevealNotes', type: 'umd' }
    },
    {
        name: 'plugin-zoom',
        entry: './plugin/zoom/plugin.js',
        outputPath: 'plugin/zoom',
        outputFile: 'zoom.js',
        library: { name: 'RevealZoom', type: 'umd' }
    },
    {
        name: 'plugin-math',
        entry: './plugin/math/plugin.js',
        outputPath: 'plugin/math',
        outputFile: 'math.js',
        library: { name: 'RevealMath', type: 'umd' }
    },
    {
        name: 'copy-plugins',
        entry: './js/index.js',
        outputPath: 'dist',
        outputFile: 'noop.js',
        library: null
    }
];

function buildConfig(config) {
    const isCSS = config.entry.endsWith('.scss');
    const isESM = config.experiments?.outputModule;
    
    const webpackConfig = {
        name: config.name,
        mode: 'production',
        entry: config.entry,
        output: {
            path: path.resolve(__dirname, config.outputPath),
            filename: config.outputFile,
            ...(config.library && !isESM ? {
                library: config.library,
                globalObject: 'this'
            } : {})
        },
        ...(config.experiments && { experiments: config.experiments }),
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
                    type: 'asset/source'
                },
                ...(isCSS ? [{
                    test: /\.s?css$/,
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
                }] : [])
            ]
        },
        plugins: [
            new webpack.BannerPlugin({ banner: banner.replace('reveal.js', config.library?.name || 'reveal.js') }),
            ...(isCSS ? [new MiniCssExtractPlugin({ filename: config.outputFile })] : []),
            ...(config.name === 'copy-plugins' ? [
                new CopyPlugin({
                    patterns: [{
                        from: 'node_modules/reveal.js-mermaid-plugin/plugin/',
                        to: path.resolve(__dirname, 'plugin/mermaid')
                    }]
                })
            ] : [])
        ],
        optimization: {
            minimizer: [
                ...(isCSS ? [] : [new TerserPlugin({
                    terserOptions: {
                        compress: { drop_console: false },
                        format: { comments: false }
                    },
                    extractComments: false
                })]),
                ...(isCSS ? [new CssMinimizerPlugin()] : [])
            ]
        }
    };
    
    return webpack(webpackConfig);
}

async function runBuild() {
    const args = process.argv.slice(2);
    const target = args[0];
    
    if (target && target.startsWith('--config-name=')) {
        const configName = target.split('=')[1];
        const config = configs.find(c => c.name === configName);
        if (config) {
            console.log(`Building ${configName}...`);
            await buildConfig(config);
            return;
        }
    }
    
    console.log('Building all...');
    for (const config of configs) {
        console.log(`Building ${config.name}...`);
        await buildConfig(config);
    }
    console.log('Done!');
}

if (require.main === module) {
    runBuild().catch(console.error);
}

module.exports = {
    configs: configs.map(c => buildConfig(c)),
    buildConfig: buildConfig,
    configsList: configs
};
