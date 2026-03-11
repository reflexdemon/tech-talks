# AGENTS.md - Tech Talks Repository

## Overview

This repository contains a [reveal.js](https://revealjs.com/) presentation about Java 11 to 17 new features. The presentation content is in markdown files under `java-11-to-17/mark-down/`.

## Project Structure

```
/Users/reflex/dev/gh/tech-talks/
├── java-11-to-17/          # Main presentation project
│   ├── index.html           # Main presentation entry point
│   ├── mark-down/           # Slide content (markdown files)
│   ├── js/                  # reveal.js library code
│   ├── css/                 # Styles
│   ├── dist/                # Built assets
│   ├── plugin/              # reveal.js plugins
│   ├── test/                # QUnit tests
│   ├── gulpfile.js          # Build automation
│   └── package.json         # Node dependencies
├── .github/                  # GitHub workflows
└── tech-talk-qr-code.png    # QR code for presentation
```

---

## Build, Lint, and Test Commands

All commands run from the `java-11-to-17/` directory.

### Installation

```bash
cd java-11-to-17
npm install
```

### Development Server

```bash
npm start
# or with custom root/port
npm start -- --root=. --port=8000
```

Starts a local server at `http://localhost:8000` with live reload.

### Build

```bash
npm run build
```

Builds JS bundles, CSS, and plugins to `dist/` directory.

### Linting

```bash
npm run test        # Runs lint + tests
# or just lint
npx gulp eslint
```

ESLint is configured in `package.json` with rules for:
- `eqeqeq`: enforce `===` and `!==`
- `no-caller`:禁止使用caller/callee
- `new-cap`:构造函数命名大写
- And more (see `package.json` lines 84-102)

### Running Tests

```bash
npm test
```

Runs all QUnit tests via Puppeteer. Tests are in `test/*.html`.

**Running a Single Test:**

To run a specific test file, modify `gulpfile.js` or run directly:

```bash
# Edit gulpfile.js line 203 to filter specific test:
let testFiles = glob.sync('test/test.html')  # single file
# Then run:
npm test
```

Alternatively, serve the project and open `test/test.html` directly in browser.

### Package for Distribution

```bash
npx gulp package
```

Creates `reveal-js-presentation.zip` with all assets.

---

## Code Style Guidelines

### JavaScript (reveal.js)

This project follows reveal.js coding conventions:

- **Indentation**: 4 spaces
- **Braces**: Same-line braces (K&R style)
- **Semicolons**: Required
- **Variable declarations**: Use `const` by default, `let` when reassignment needed, avoid `var`
- **Functions**: Prefer arrow functions for callbacks; use function declarations for methods
- **Strings**: Single quotes preferred, template literals for interpolation

### ESLint Configuration

The project uses Babel parser with these rules:
- No curlying braces requirement (`curly: 0`)
- Strict equality required (`eqeqeq: 2`)
- IIFEs wrapped in parentheses (`wrap-iife: ["any"]`)
- No unused expressions allowed

### Java Code Examples

The presentation includes Java code examples in markdown. When adding Java code:

- Use standard Java naming conventions (camelCase for methods/variables, PascalCase for classes)
- Java version: 17 (see `.java-version`)
- Include proper null handling (the `Main.java` demo intentionally shows a NullPointerException for educational purposes)

### Markdown Slides

- Use `>>` as slide separator
- Use `VV` for vertical slides (sub-slides)
- Use `^Note:` for speaker notes
- Code blocks: use triple backticks with language identifier

Example:
```markdown
>>
## Slide Title

Content here

VV
### Vertical Slide

>>

## Next Slide
```

### Import Conventions

- Standard library imports first, then third-party
- No wildcard imports (explicit is better)
- Group by category with blank lines between

### Error Handling

- Use descriptive error messages
- Prefer specific exceptions over generic ones
- Always handle async errors in promises with `.catch()`

### File Naming

- JavaScript: camelCase (e.g., `slideContent.js`)
- CSS/SCSS: kebab-case (e.g., `reveal-theme.scss`)
- Markdown: kebab-case (e.g., `http-client.md`)

### General Principles

1. **Keep it simple**: Prefer readable code over clever one-liners
2. **Consistency**: Match surrounding code style
3. **Comments**: Explain *why*, not *what*
4. **Testing**: Add tests for new functionality
5. **No console.log in production**: Use proper logging or debug conditionally

---

## Notes for Agents

- This is a presentation repository, not a typical application
- Main work involves: adding/editing markdown slides in `mark-down/`, modifying `index.html` for slide configuration
- The `js/` directory contains the reveal.js library - avoid modifying unless necessary
- Java examples are for demonstration purposes in the presentation
- To test changes: run `npm start` and view in browser with live reload
