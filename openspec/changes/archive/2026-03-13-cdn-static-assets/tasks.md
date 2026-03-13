## 1. Update webpack.config.js

- [x] 1.1 Remove `reveal.js/dist` from CopyPlugin patterns
- [x] 1.2 Remove `reveal.js/plugin` from CopyPlugin patterns
- [x] 1.3 Keep only `assets/images` and `presentations` in CopyPlugin

## 2. Update templates/index.html

- [x] 2.1 Replace `./dist/reset.css` with CDN URL
- [x] 2.2 Replace `./dist/reveal.css` with CDN URL
- [x] 2.3 Replace `./dist/theme/beige.css` with CDN URL
- [x] 2.4 Replace `./plugin/highlight/zenburn.css` with CDN URL
- [x] 2.5 Replace `./dist/reveal.js` script with CDN URL
- [x] 2.6 Replace `./plugin/notes/notes.js` script with CDN URL
- [x] 2.7 Replace `./plugin/markdown/markdown.js` script with CDN URL
- [x] 2.8 Replace `./plugin/highlight/highlight.js` script with CDN URL
- [x] 2.9 Add mermaid library CDN script before plugin
- [x] 2.10 Keep `./plugin/mermaid/plugin.js` script (local)

## 3. Build and Verify

- [x] 3.1 Run `npm run build`
- [x] 3.2 Verify /site folder size is reduced (25MB → 13MB, 48% smaller!)
- [x] 3.3 Test presentations load in browser
- [x] 3.4 Verify mermaid diagrams render correctly

## 4. Deploy

- [x] 4.1 Deploy to GitHub Pages
- [x] 4.2 Verify production site works
