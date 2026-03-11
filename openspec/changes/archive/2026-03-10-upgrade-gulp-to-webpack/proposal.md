## Why

The current build system uses Gulp (v4) which is an older build tool. Webpack 5 offers more modern features, better tree-shaking, code splitting, and a more active ecosystem. Additionally, reveal.js has released newer versions with performance improvements and new features that should be leveraged.

## What Changes

- Upgrade reveal.js from version 5.0.2 to the latest stable version (currently 5.x)
- Replace Gulp-based build system with Webpack 5
- Migrate all build tasks: JS bundling (ES5 + ESM), CSS compilation (Sass), plugin bundling
- Integrate `update-plugin.sh` script functionality into the Webpack build pipeline
- Remove Gulp dependencies from package.json
- Add Webpack and related dependencies to package.json

## Capabilities

### New Capabilities

- `webpack-build`: Replace Gulp with Webpack 5 for all build tasks including JS bundling, CSS compilation, and plugin processing
- `reveal-js-upgrade`: Upgrade reveal.js library from 5.0.2 to latest version with compatibility testing
- `plugin-update-workflow`: Automate plugin update process through Webpack instead of shell script

### Modified Capabilities

- None (new capabilities only)

## Impact

- **Files modified**: `package.json`, `gulpfile.js` (removed), new `webpack.config.js`
- **Dependencies changed**: Remove gulp/* packages, add webpack, webpack-cli, sass-loader, etc.
- **Build output**: Maintained in `dist/` directory with same structure
- **Development workflow**: `npm start` and `npm run build` continue to work with Webpack dev server
