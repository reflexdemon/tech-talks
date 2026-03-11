## ADDED Requirements

### Requirement: Plugin update automated via Webpack
The plugin update process MUST be automated through the Webpack build system, replacing the shell script.

#### Scenario: Mermaid plugin sync
- **WHEN** `npm run build` is executed
- **THEN** Webpack copies mermaid plugin from `node_modules/reveal.js-mermaid-plugin/plugin/` to `./plugin/mermaid/`

#### Scenario: Manual plugin update trigger
- **WHEN** developer needs to update plugins
- **THEN** running `npm run build` syncs all node_modules plugins to appropriate plugin directories

### Requirement: Update script removed or deprecated
The update-plugin.sh script MUST either be removed or marked as deprecated since Webpack handles plugin updates.

#### Script deprecated
- **WHEN** `update-plugin.sh` is executed
- **THEN** script outputs deprecation notice and refers to `npm run build`
