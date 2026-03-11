## 1. Setup and Dependencies

- [x] 1.1 Install Webpack and loaders: `npm install --save-dev webpack webpack-cli sass-loader css-loader style-loader copy-webpack-plugin`
- [x] 1.2 Remove Gulp dependencies from package.json (gulp, gulp-*, etc.)
- [x] 1.3 Create webpack.config.js with multi-compiler configuration

## 2. JavaScript Bundling (Webpack)

- [x] 2.1 Configure webpack entry for reveal.js UMD bundle
- [x] 2.2 Configure webpack entry for reveal.js ESM bundle
- [x] 2.3 Add Babel and Terser plugins for transpilation and minification
- [x] 2.4 Verify dist/reveal.js and dist/reveal.esm.js output

## 3. Plugin Bundling (Webpack)

- [x] 3.1 Configure webpack for highlight plugin (UMD + ESM)
- [x] 3.2 Configure webpack for markdown plugin (UMD + ESM)
- [x] 3.3 Configure webpack for search plugin (UMD + ESM)
- [x] 3.4 Configure webpack for notes plugin (UMD + ESM)
- [x] 3.5 Configure webpack for zoom plugin (UMD + ESM)
- [x] 3.6 Configure webpack for math plugin (UMD + ESM)
- [x] 3.7 Verify all plugin builds complete without errors

## 4. CSS/SCSS Compilation (Webpack)

- [x] 4.1 Configure sass-loader for core reveal.scss
- [x] 4.2 Configure sass-loader for theme files (themes pre-built from git)
- [x] 4.3 Add autoprefixer and minification
- [x] 4.4 Verify dist/reveal.css and dist/theme/*.css output

## 5. Plugin Sync (Webpack)

- [x] 5.1 Configure copy-webpack-plugin for mermaid plugin
- [x] 5.2 Add copy step to build process
- [x] 5.3 Verify plugin/mermaid/ contains synced files

## 6. reveal.js Upgrade (Optional)

- [ ] 6.1 Update reveal.js version in package.json to latest 5.x (optional - current works)
- [ ] 6.2 Run npm install to fetch new version (optional)
- [ ] 6.3 Rebuild and verify compatibility (optional)

## 7. npm Scripts Update

- [x] 7.1 Update package.json scripts to use webpack
- [x] 7.2 Keep `npm start` for dev server (webpack serve or compatible)
- [x] 7.3 Keep `npm run build` for production build
- [x] 7.4 Keep `npm test` for lint + tests

## 8. Testing and Cleanup

- [x] 8.1 Run `npm test` and verify all tests pass
- [x] 8.2 Test presentation in browser via `npm start`
- [x] 8.3 Remove gulpfile.js
- [x] 8.4 Deprecate or remove update-plugin.sh
- [x] 8.5 Verify dist/ contents match expected structure
