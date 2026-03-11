## ADDED Requirements

### Requirement: Webpack configuration at root
The project SHALL have a `webpack.config.js` at the project root that handles all build tasks.

#### Scenario: Webpack config exists
- **WHEN** the project root is inspected
- **THEN** `webpack.config.js` SHALL exist

### Requirement: Dynamic entry points
Webpack SHALL automatically discover all presentation folders under `presentations/` and create an entry point for each.

#### Scenario: Multiple presentations discovered
- **WHEN** there are multiple presentation folders under `presentations/`
- **THEN** webpack SHALL create a separate bundle for each presentation

### Requirement: Single entry point build
Webpack SHALL build all presentations into a single index.html that can route to any presentation.

#### Scenario: Index.html generated
- **WHEN** `npm run build` is executed
- **THEN** an `index.html` file SHALL be generated in the `/site` folder
- **AND** it SHALL contain script tags for all presentation bundles

### Requirement: Query parameter routing
The generated index.html SHALL support selecting a presentation via query parameter (e.g., `?presentation=java-11-to-17`).

#### Scenario: Presentation query param
- **WHEN** a user visits the site with `?presentation=<name>`
- **THEN** the corresponding presentation SHALL be loaded

### Requirement: Gulp and package.json removed
The project root SHALL NOT contain `gulpfile.js` or duplicate `package.json` files in subfolders.

#### Scenario: No gulp file
- **WHEN** the project root is inspected
- **THEN** `gulpfile.js` SHALL NOT exist
