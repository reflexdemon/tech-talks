## Purpose

Define the build process that bundles, compresses, and copies assets to /site folder.

## ADDED Requirements

### Requirement: Build output to /site
The `npm run build` command SHALL output all files to a `/site` folder at project root.

#### Scenario: Site folder created
- **WHEN** `npm run build` is executed
- **THEN** a `/site` folder SHALL be created at project root
- **AND** it SHALL contain all necessary files for hosting

### Requirement: JavaScript bundling
Webpack SHALL bundle all JavaScript into the `/site` folder, with compression enabled for production.

#### Scenario: JS bundled and compressed
- **WHEN** `npm run build` is executed
- **THEN** JavaScript files in `/site` SHALL be minified/compressed

### Requirement: HTML generation
Webpack SHALL generate HTML files in `/site` that load the appropriate bundled JavaScript.

#### Scenario: HTML generated
- **WHEN** `npm run build` is executed
- **THEN** HTML files SHALL be generated in `/site` folder

### Requirement: Asset copying
Webpack SHALL copy required assets (images) to the `/site` folder during build.

#### Scenario: Assets copied
- **WHEN** `npm run build` is executed
- **THEN** all images from `assets/images/` SHALL be copied to `/site/images/`

### Requirement: CDN-based reveal.js loading
The build output SHALL reference reveal.js and its plugins from jsDelivr CDN instead of local copies.

#### Scenario: CDN URLs in HTML
- **WHEN** `npm run build` is executed
- **THEN** the generated HTML files SHALL load reveal.js from `https://cdn.jsdelivr.net/npm/reveal.js@5.0.0/dist/`
- **AND** the generated HTML files SHALL load reveal.js plugins from `https://cdn.jsdelivr.net/npm/reveal.js@5.0.0/plugin/`

#### Scenario: Mermaid loads from CDN
- **WHEN** a presentation with mermaid diagrams is loaded
- **THEN** mermaid library SHALL load from `https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js`
- **AND** the mermaid reveal.js plugin SHALL initialize using the CDN-loaded mermaid

### Requirement: Local plugin wrapper retained
The project SHALL retain a local copy of the mermaid reveal.js plugin wrapper to bridge the CDN mermaid library to reveal.js.

#### Scenario: Mermaid plugin present
- **WHEN** `npm run build` is executed
- **AND** the project contains `./plugin/mermaid/plugin.js`
- **THEN** the generated HTML files SHALL load this plugin from the local `./plugin/mermaid/plugin.js` path

### Requirement: Dev server with hot reload
The `npm run dev` command SHALL start a development server with hot reload capability that detects markdown file changes.

#### Scenario: Dev server starts
- **WHEN** `npm run dev` is executed
- **THEN** a local server SHALL start
- **AND** changes to markdown files SHALL trigger automatic reload

### Requirement: Test files removed
The project SHALL NOT contain any test files or test configuration.

#### Scenario: No test files
- **WHEN** the project is inspected
- **THEN** no test files SHALL exist in any folder
- **AND** no test-related dependencies SHALL be in package.json
