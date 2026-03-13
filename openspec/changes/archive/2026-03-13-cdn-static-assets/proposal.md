## Why

The `npm run build` command takes 14+ seconds because it copies ~25MB of static assets (reveal.js library, plugins, highlight.js) to the `/site` folder on every build. Most of this data never changes and could be loaded from CDN instead, dramatically reducing build time and deployment size.

## What Changes

- Remove reveal.js library from local copy - load from jsDelivr CDN
- Remove highlight.js plugin from local copy - load from jsDelivr CDN  
- Remove mermaid library from local copy - load from jsDelivr CDN
- Keep only the mermaid reveal.js plugin wrapper (expects window.mermaid)
- Update webpack.config.js to exclude reveal.js directories from CopyPlugin
- Update templates/index.html to use CDN URLs for all reveal.js assets
- Reduce build output size from ~25MB to ~12MB

## Capabilities

### New Capabilities
None - this is a build optimization with no new functionality.

### Modified Capabilities
- `presentation-build-pipeline`: The build process will no longer copy reveal.js, highlight.js, or mermaid library to /site. Instead, these will be loaded from CDN in the generated HTML.

## Impact

- **Files modified**: `webpack.config.js`, `templates/index.html`
- **Files removed from build**: All of `reveal.js/dist/` (~3MB), `reveal.js/plugin/` (~13MB), mermaid library (~11MB)
- **Dependencies**: None added, CDN URLs replace local files
- **Performance**: Build time reduced by ~60% (14s → ~5s estimated)
- **Deployment**: Site folder reduced from ~25MB to ~12MB
