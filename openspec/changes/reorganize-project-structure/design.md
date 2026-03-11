## Context

The current project has a single presentation (`java-11-to-17/`) with reveal.js in a subfolder. The build uses gulp for serving and building. We need to restructure to support multiple presentations with a unified build system.

**Current State:**
- `java-11-to-17/` contains: index.html, mark-down/, js/, css/, dist/, plugin/, test/, gulpfile.js, package.json
- Single presentation, no multi-presentation support
- Gulp-based dev server with live reload

**Constraints:**
- Must maintain reveal.js functionality
- Need hot reload for markdown changes
- Production build must be deployable from /site folder
- Existing presentation (java-11-to-17) must continue to work

## Goals / Non-Goals

**Goals:**
- Restructure to support multiple presentations in a single project
- Replace gulp with webpack for all build tasks
- Enable hot reload during development
- Create a compressable /site folder for deployment
- Remove test infrastructure (as requested)

**Non-Goals:**
- Migrate to a different presentation framework (remain with reveal.js)
- Add authentication or user management
- Create CI/CD pipelines (build output is deployable but not wired to CI)

## Decisions

### 1. Folder Structure
**Decision:** Use `presentations/<name>/` for each presentation's markdown files.

**Rationale:** Clear separation between presentations. Each presentation folder contains only its markdown content. Common assets (reveal.js, css, images) live at project root.

**Alternative considered:** Keep presentations in `mark-down/` subfolders - rejected because it mixes content with the reveal.js folder structure.

### 2. Build System
**Decision:** Replace gulp with webpack-only build.

**Rationale:** Webpack handles multi-entry builds, code splitting, and compression natively. Simpler toolchain (one build system instead of two).

**Alternative considered:** Keep gulp for dev server, use webpack for production - rejected to avoid maintaining two build systems.

### 3. Development Server
**Decision:** Use webpack-dev-server with contentBase for serving static assets.

**Rationale:** Native hot module replacement, built-in live reload, single process for both API and static files.

**Alternative considered:** http-server or serve - rejected because webpack-dev-server integrates better with the build pipeline.

### 4. Asset Organization
**Decision:** Move js/, css/, dist/, plugin/ to project root as `reveal.js/` folder.

**Rationale:** Single copy of reveal.js assets shared across all presentations. Easier to upgrade reveal.js version.

### 5. Image Assets
**Decision:** Create `assets/images/` at project root for common background images.

**Rationale:** Images used across presentations should be centralized. Presentation-specific images can stay in presentation folder.

## Risks / Trade-offs

- **Risk:** Breaking existing presentation URLs
  - **Mitigation:** Ensure index.html at root redirects or serves the default presentation

- **Risk:** Webpack configuration complexity for multiple entry points
  - **Mitigation:** Use glob to dynamically discover presentation folders and create entries

- **Risk:** Losing gulp live reload quality
  - **Mitigation:** Test hot reload thoroughly; webpack-dev-server should match gulp performance

- **Trade-off:** Removing tests means no automated verification of presentation builds
  - **Mitigation:** Manual verification via browser, build output inspection

## Open Questions

1. Should presentations be built as separate bundles or a single bundle? (Single bundle recommended for simplicity)
 - Single bundle
2. How should the index.html at root select which presentation to show? (Query parameter or path-based routing)
 - Path routhing
