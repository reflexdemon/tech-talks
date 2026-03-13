## Context

The project uses webpack to build a multi-presentation reveal.js application. Currently, the build process copies the entire reveal.js library (~3MB), all plugins (~13MB including 11MB of mermaid), and highlight.js from node_modules to the /site folder on every build. This adds significant time to the build process.

The application is deployed to GitHub Pages and requires internet connectivity to load external resources (fonts, bootstrap, marked.js are already from CDN).

## Goals / Non-Goals

**Goals:**
- Reduce build time by removing ~25MB of static asset copying
- Reduce /site deployment size from ~25MB to ~12MB
- Maintain identical runtime behavior (presentations work the same)
- Keep mermaid plugin wrapper (reveal.js plugin that expects window.mermaid)

**Non-Goals:**
- Change presentation functionality or features
- Add new capabilities
- Modify development server behavior
- Optimize runtime performance (CDN has caching benefits)

## Decisions

### 1. Use jsDelivr CDN for reveal.js and plugins

**Decision:** Load reveal.js (v5.0.0), markdown, notes, highlight plugins from jsDelivr.

**Rationale:** 
- jsDelivr is fast, reliable, and free
- Version 5.0.0 matches local copy (reveal.js/dist/reveal.js shows "reveal.js 5.0.0")
- Provides all needed plugins in the same structure
- Already used for bootstrap, fonts, marked.js in the project

**Alternatives considered:**
- Unpkg: Similar but jsDelivr has better performance
- cdnjs: Less complete plugin coverage
- Self-hosted: Would require separate hosting, defeats the purpose

### 2. Load mermaid library from CDN, keep plugin wrapper

**Decision:** Load mermaid library from CDN, but keep `./plugin/mermaid/plugin.js` locally.

**Rationale:**
- The reveal.js mermaid plugin expects `window.mermaid` to exist
- Loading mermaid.esm.min.js from CDN makes it available globally
- The small plugin wrapper (~2KB) needs local copy to bridge CDN mermaid to reveal.js

**Alternatives considered:**
- Load both library and plugin from CDN: Plugin may not work with CDN version
- Inline mermaid initialization: Would require modifying presentation.js more

### 3. Keep all other local assets

**Decision:** Only load from CDN: reveal.js core, plugins, mermaid library. Keep local:
- `assets/images/` - presentation backgrounds
- `presentations/` - markdown content
- `./plugin/mermaid/plugin.js` - wrapper

**Rationale:**
- These change frequently (new presentations, images)
- Already small enough to not impact build time significantly
- Avoids breaking changes to build pipeline structure

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|------|--------|------------|
| CDN downtime | Presentations won't load | Add fallback local copies if needed |
| Version drift | CDN version differs from local | Pin to exact version (5.0.0, mermaid@10) |
| CORS issues | None expected | CDN supports all origins |
| Offline development | Won't work without internet | Development mode can still use local copies |

## Migration Plan

1. Modify `webpack.config.js`:
   - Remove `reveal.js/dist` from CopyPlugin patterns
   - Remove `reveal.js/plugin` from CopyPlugin patterns

2. Modify `templates/index.html`:
   - Replace local `./dist/` paths with CDN URLs
   - Replace local `./plugin/` paths with CDN URLs
   - Add mermaid CDN script before plugin
   - Keep `./plugin/mermaid/plugin.js` script tag

3. Build and verify:
   - Run `npm run build`
   - Verify /site folder is smaller
   - Test presentations load correctly in browser

4. Deploy to GitHub Pages

**Rollback:** Reverse the changes in webpack.config.js and templates/index.html to restore local copies.
