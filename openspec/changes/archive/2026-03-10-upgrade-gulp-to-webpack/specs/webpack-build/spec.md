## ADDED Requirements

### Requirement: Webpack build replaces Gulp for JavaScript bundling
The build system MUST use Webpack 5 to bundle JavaScript files, replacing all Gulp-based JS tasks.

#### Scenario: ES5 UMD bundle build
- **WHEN** `npm run build` is executed
- **THEN** Webpack produces `./dist/reveal.js` as UMD bundle with Babel transpilation and Terser minification

#### Scenario: ES6 ESM bundle build
- **WHEN** `npm run build` is executed
- **THEN** Webpack produces `./dist/reveal.esm.js` as ES module bundle

### Requirement: Webpack compiles Sass to CSS
The build system MUST compile Sass files to CSS using webpack sass-loader.

#### Scenario: Core CSS build
- **WHEN** `npm run build` is executed
- **THEN** Webpack compiles `css/reveal.scss` to `./dist/reveal.css` with autoprefixer and minification

#### Scenario: Theme CSS build
- **WHEN** `npm run build` is executed
- **THEN** Webpack compiles all files in `css/theme/source/*.{sass,scss}` to `./dist/theme/` directory

### Requirement: Webpack bundles reveal.js plugins
The build system MUST use Webpack to bundle all reveal.js plugins as both UMD and ESM formats.

#### Scenario: Plugin bundling
- **WHEN** `npm run build` is executed
- **THEN** Webpack produces bundled plugins at:
  - `./plugin/highlight/highlight.js` and `.esm.js`
  - `./plugin/markdown/markdown.js` and `.esm.js`
  - `./plugin/search/search.js` and `.esm.js`
  - `./plugin/notes/notes.js` and `.esm.js`
  - `./plugin/zoom/zoom.js` and `.esm.js`
  - `./plugin/math/math.js` and `.esm.js`

### Requirement: Development server runs with Webpack
The development server MUST use Webpack Dev Server or compatible alternative.

#### Scenario: Dev server starts
- **WHEN** `npm start` is executed
- **THEN** local server starts at `http://localhost:8000` with live reload enabled
