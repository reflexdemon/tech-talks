## ADDED Requirements

### Requirement: Presentation folder structure
The project SHALL contain a `presentations/` folder at the root that contains all presentation markdown files in separate subfolders.

#### Scenario: Single presentation folder exists
- **WHEN** a presentation folder is created under `presentations/`
- **THEN** it SHALL contain only markdown files for that presentation

### Requirement: Common assets location
The project SHALL contain a `reveal.js/` folder at the root with all reveal.js library files (js/, css/, dist/, plugin/).

#### Scenario: Reveal.js assets at root
- **WHEN** the project is inspected
- **THEN** the `reveal.js/` folder SHALL exist at project root
- **AND** SHALL contain js/, css/, dist/, and plugin/ subdirectories

### Requirement: Shared images folder
The project SHALL contain an `assets/images/` folder at the root for common background images used across presentations.

#### Scenario: Assets folder exists
- **WHEN** the project is inspected
- **THEN** the `assets/images/` folder SHALL exist at project root

### Requirement: Legacy presentation folder removed
The original `java-11-to-17/` folder SHALL only contain markdown files after migration.

#### Scenario: Java presentation folder cleaned
- **WHEN** the migration is complete
- **THEN** the `java-11-to-17/` folder SHALL contain only markdown files (no js/, css/, dist/, plugin/, test/, gulpfile.js, package.json)
