# AGENTS.md - Tech Talks Repository

## Overview

This repository contains a multi-presentation [reveal.js](https://revealjs.com/) application. It supports multiple presentations (e.g., Java 11 to 17, OpenSpec) loaded dynamically from markdown files.

## Project Structure

```
/Users/reflex/dev/gh/tech-talks/
├── src/
│   ├── js/
│   │   ├── presentation.js       # Main presentation loader logic
│   │   ├── markedRenderer.js     # Custom marked renderer for reveal.js
│   │   ├── plugin.js             # Reveal.js mermaid plugin
│   │   ├── spotlight.js          # Reveal.js spotlight plugin
│   │   └── jsmind/
│   │       └── plugin.js         # Custom jsMind plugin for mindmaps
│   └── html/
│       └── index.html            # Main HTML template
├── presentations/                # Markdown slide content and config
│   ├── config.json               # GLOBAL configuration for all presentations
│   ├── java-11-to-17/            # Java 11-17 presentation slides
│   └── openspec/                 # OpenSpec presentation slides
├── assets/
│   └── images/                   # Source images (copied to site/images/)
├── css/
│   ├── custom.css                # Custom presentation styles
│   └── base.css                  # Base styles
├── site/                         # Built production output (deployed to GitHub Pages)
│   ├── index.html
│   ├── bundle.js
│   ├── css/                      # Copied CSS files
│   ├── images/                   # Copied images
│   ├── plugin/                   # Built plugins
│   └── presentations/            # Copied markdown files and config
├── tests/                        # Unit and E2E tests
├── .github/
│   └── workflows/
│       └── static.yml            # GitHub Pages deployment workflow
├── webpack.config.js             # Production build config
├── webpack.dev.js               # Development server config
├── watch.js                     # File watcher for auto-rebuild
└── package.json                 # Node dependencies
```

---

## Build, Lint, and Test Commands

All commands run from the project root.

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
# or
npm start
```

Starts a local server at `http://localhost:8000` with hot reload. Watches `presentations/` and `src/html/` for changes.

### Build (Production)

```bash
npm run build
```

Builds the project to `site/` directory using webpack.

### Watch Mode

```bash
npm run watch
```

Watches `presentations/` and `src/html/` for changes and auto-rebuilds.

### Deployment

The project auto-deploys to GitHub Pages on push to `main` via `.github/workflows/static.yml`.

---

## Presentation Configuration

### Adding/Configuring Presentations

Presentations are configured in `presentations/config.json`:

```json
{
  "presentation-id": {
    "theme": "black",
    "slides": [
      {
        "file": "slide-file.md",
        "bg": "/images/background.jpg",
        "bgSize": "cover"
      }
    ]
  }
}
```

- `theme`: Reveal.js theme name (e.g., `black`, `beige`, `white`).
- `file`: Markdown filename in `presentations/<presentation-id>/`.
- `bg`: Background image path (relative to `site/`, usually starts with `/images/`).
- `bgSize`: CSS background-size value (optional).

### Slide Markdown Format

```markdown
>>
## Slide Title

Content here

VV
### Vertical Slide

Content on vertical slide

>>

## Next Slide
```

- `>>` - Horizontal slide separator
- `VV` - Vertical slide separator
- `^Note:` - Speaker notes
- ` ```jsmind ` - Fenced code block for mindmaps (uses JSON format)

### Background Images

When using SVG background images, use explicit pixel dimensions (not viewport units like `100vw`) for Firefox compatibility:

```xml
<svg width="1920" height="1080" ...>
```

---

## Code Style Guidelines

### JavaScript

- **Indentation**: 4 spaces
- **Braces**: Same-line braces (K&R style)
- **Semicolons**: Required
- **Variable declarations**: Use `const` by default, `let` when reassignment needed
- **Strings**: Single quotes preferred

### Markdown Slides

- Use `>>` as slide separator
- Use `VV` for vertical slides (sub-slides)
- Use `^Note:` for speaker notes
- Code blocks: use triple backticks with language identifier

---

## Notes for Agents

- This is a multi-presentation reveal.js application.
- All presentation routing is via the `?presentation=name` query parameter.
- Configuration is centralized in `presentations/config.json`.
- The `jsMind` plugin renders JSON code blocks into interactive mindmaps.
- Production build outputs to `site/` which is deployed to GitHub Pages.
- To test: run `npm start` and view in browser with live reload.
