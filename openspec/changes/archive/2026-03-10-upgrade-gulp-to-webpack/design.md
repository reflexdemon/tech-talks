## Context

The project currently uses Gulp 4 as its build system with the following tasks:
- `js-es5`: Build UMD bundle with Babel + Terser
- `js-es6`: Build ESM bundle with Babel + Terser  
- `plugins`: Build 6 reveal.js plugins (highlight, markdown, search, notes, zoom, math) as both UMD and ESM
- `css-themes`: Compile Sass themes to CSS
- `css-core`: Compile core reveal.css with autoprefixer and minification
- `eslint`: Lint JavaScript
- `qunit`: Run QUnit tests via Puppeteer
- `serve`: Development server with live reload
- `package`: Create distribution zip

The reveal.js library is at version 5.0.2 (from package.json).

## Goals / Non-Goals

**Goals:**
- Replace all Gulp tasks with Webpack 5 equivalents
- Maintain identical build output in `dist/` directory
- Keep npm scripts compatible (`npm start`, `npm run build`, `npm test`)
- Upgrade reveal.js to latest version (5.x)
- Integrate plugin copy task into Webpack

**Non-Goals:**
- Change the reveal.js version beyond 5.x (no v6)
- Modify slide content in `mark-down/`
- Add new plugins (existing only)
- Change test framework (keep QUnit/Puppeteer)

## Decisions

1. **Webpack 5 over Vite/Esbuild**: 
   - Vite is primarily for dev server, less control over multi-entry builds
   - Esbuild is fast but less mature for Sass processing
   - Webpack 5 has established ecosystem for reveal.js plugins and tree-shaking
   - Alternative considered: Keep Gulp but upgrade to v5 - rejected because ecosystem is declining

2. **Single webpack.config.js with multiple entry points**:
   - Use webpack's multi-compiler mode for separate JS, ESM, and plugin bundles
   - Enables parallel building and shared configuration

3. **Sass processing via sass-loader + dart-sass**:
   - Modern alternative to node-sass (deprecated)
   - Matches current gulpfile behavior

4. **Plugin sync via Webpack's copying mechanism**:
   - Use `copy-webpack-plugin` to sync node_modules/plugin to dist
   - Replace bash rsync from update-plugin.sh

5. **Keep ESLint separate**:
   - Run via `npx eslint` as before
   - Webpack doesn't need to handle linting

## Risks / Trade-offs

- **[Risk] Build output differences**: Webpack may produce slightly different bundle output
  - *Mitigation*: Verify dist/ contents match before/after, update hash in CDN links if needed

- **[Risk] Breaking changes in reveal.js upgrade**
  - *Mitigation*: Check changelog for v5.x changes, run tests after upgrade

- **[Risk] Loss of parallel task execution** 
  - *Mitigation*: Webpack 5's parallel builds provide similar performance

- **[Risk] Learning curve for future maintainers**
  - *Mitigation*: Document webpack configuration with comments

## Migration Plan

1. Install webpack and loaders (`npm install --save-dev webpack webpack-cli sass-loader css-loader style-loader copy-webpack-plugin`)
2. Create `webpack.config.js` with all build targets
3. Update `package.json` scripts to use webpack
4. Run build and verify output in `dist/`
5. Run tests to ensure functionality preserved
6. Remove `gulpfile.js` and Gulp dependencies
7. Update `update-plugin.sh` or remove if handled by webpack

## Open Questions

- Should the webpack config use TypeScript for better maintainability?
- How to handle the reveal.js version upgrade - exact version or range?
