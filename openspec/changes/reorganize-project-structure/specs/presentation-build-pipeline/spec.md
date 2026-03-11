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
Webpack SHALL copy required assets (images, fonts, reveal.js assets) to the `/site` folder during build.

#### Scenario: Assets copied
- **WHEN** `npm run build` is executed
- **THEN** all images from `assets/images/` SHALL be copied to `/site/images/`
- **AND** reveal.js assets SHALL be available in `/site/reveal.js/`

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
