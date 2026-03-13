## MODIFIED Requirements

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
