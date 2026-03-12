# AGENTS.md - Tech Talks Repository

## Overview

This repository contains a multi-presentation [reveal.js](https://revealjs.com/) application. It supports multiple presentations (e.g., Java 11 to 17, OpenSpec) loaded dynamically from markdown files.

## Project Structure

```
/Users/reflex/dev/gh/tech-talks/
├── js/
│   └── presentation.js       # Main presentation loader logic
├── presentations/           # Markdown slide content
│   ├── java-11-to-17/       # Java 11-17 presentation slides
│   │   ├── intro.md
│   │   ├── http-client.md
│   │   ├── switch-updates.md
│   │   ├── text-blocks.md
│   │   ├── instanceof.md
│   │   ├── records.md
│   │   ├── sealed-classes.md
│   │   ├── api-updates.md
│   │   ├── runtime-updates.md
│   │   ├── other-updates.md
│   │   └── thank-you.md
│   └── openspec/            # OpenSpec presentation slides
│       └── intro.md
├── templates/
│   └── index.html           # Main HTML template
├── assets/
│   └── images/              # Source images (copied to site/)
│       └── hd-liquid-bg.svg
├── site/                    # Built production output (deployed to GitHub Pages)
│   ├── index.html
│   ├── bundle.js
│   ├── dist/                # reveal.js built assets
│   ├── plugin/              # reveal.js plugins
│   ├── images/              # Copied images
│   └── presentations/       # Copied markdown files
├── reveal.js/               # reveal.js library source
├── .github/
│   └── workflows/
│       └── static.yml       # GitHub Pages deployment workflow
├── webpack.config.js        # Production build config
├── webpack.dev.js          # Development server config
├── watch.js                # File watcher for auto-rebuild
└── package.json            # Node dependencies
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

Starts a local server at `http://localhost:8000` with hot reload. Watches markdown and template changes.

### Build (Production)

```bash
npm run build
```

Builds the project to `site/` directory using webpack. Outputs:
- `site/index.html` - Main landing page
- `site/bundle.js` - Bundled JavaScript
- `site/dist/` - reveal.js assets
- `site/plugin/` - reveal.js plugins
- `site/images/` - Copied images
- `site/presentations/` - Markdown content

### Watch Mode

```bash
npm run watch
```

Watches `presentations/` and `templates/` for changes and auto-rebuilds.

### Deployment

The project auto-deploys to GitHub Pages on push to main via `.github/workflows/static.yml`.

---

## Presentation Configuration

### Adding Slides

Slides are defined in `js/presentation.js` under `slidesConfig`:

```javascript
const slidesConfig = {
    'presentation-name': [
        { file: 'slide-file.md', bg: './images/background.svg', bgSize: 'cover' }
    ]
};
```

- `file`: Markdown filename in `presentations/<name>/`
- `bg`: Background image path (optional)
- `bgSize`: CSS background-size value (optional, defaults to reveal.js default)

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
- **Variable declarations**: Use `const` by default, `let` when reassignment needed, avoid `var`
- **Strings**: Single quotes preferred, template literals for interpolation

### Markdown Slides

- Use `>>` as slide separator
- Use `VV` for vertical slides (sub-slides)
- Use `^Note:` for speaker notes
- Code blocks: use triple backticks with language identifier

### File Naming

- JavaScript: camelCase (e.g., `presentation.js`)
- CSS/SCSS: kebab-case
- Markdown: kebab-case (e.g., `http-client.md`)

---

## Notes for Agents

- This is a multi-presentation reveal.js application
- Presentations are loaded dynamically from markdown files in `presentations/`
- Background images are configured in `js/presentation.js` `slidesConfig` object
- SVG background images must use explicit dimensions (not `100vw`/`100vh`) for Firefox compatibility
- Production build outputs to `site/` which is deployed to GitHub Pages
- To test: run `npm start` and view in browser with live reload
