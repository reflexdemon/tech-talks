## Why

The current project structure has all npm/build files inside `java-11-to-17/`, making it difficult to manage multiple presentations. The reveal.js library code, tests, and build configuration are mixed with presentation content. This reorganization will enable a multi-presentation architecture with a common presentation framework.

## What Changes

- Move all npm/build configuration files (package.json, gulpfile.js, webpack.config.js) to project root
- Create a `presentations/` folder containing all presentation markdown files
- Move js/, css/, dist/, plugin/ folders to project root as common presentation assets
- Move background images to a common `assets/images/` folder
- Remove all test files and test configuration
- Configure webpack to build all presentations into a `/site` folder
- Create an index.html at project root that serves as the entry point
- Ensure `npm run dev` enables hot reload for markdown changes
- Ensure `npm run build` creates a deployable `/site` folder with compressed assets

## Capabilities

### New Capabilities

- **multi-presentation-structure**: Define the folder structure for hosting multiple presentations in a single reveal.js project
- **webpack-multi-entry**: Configure webpack to build multiple presentation entry points and generate index.html
- **presentation-build-pipeline**: Define the build process that bundles, compresses, and copies assets to /site folder

### Modified Capabilities

- None (new capabilities only)

## Impact

- Build system changes: gulp replaced with webpack-only build
- File organization: All presentations in `presentations/`, assets in common folders
- Development workflow: Hot reload at project root, served from /site in production
- Tests: Removed (as requested)
