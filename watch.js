/**
 * watch.js – Watches presentations/ and templates/ for changes,
 * then re-runs `npm run build` to update site/ artifacts.
 *
 * Usage:  npm run watch
 *
 * Uses Node's built-in fs.watch (recursive option supported on macOS).
 * No extra dependencies required.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DEBOUNCE_MS = 500;
let timer = null;
let building = false;

const watchDirs = [
    { dir: path.resolve(__dirname, 'presentations'), ext: ['.md'] },
    { dir: path.resolve(__dirname, 'templates'),     ext: ['.html'] }
];

function build() {
    if (building) return;
    building = true;
    const start = Date.now();
    console.log('\n\x1b[36m[watch]\x1b[0m Change detected – rebuilding...');
    try {
        execSync('npm run build', { stdio: 'inherit', cwd: __dirname });
        console.log(`\x1b[32m[watch]\x1b[0m Build completed in ${Date.now() - start}ms`);
    } catch (err) {
        console.error('\x1b[31m[watch]\x1b[0m Build failed');
    }
    building = false;
}

function onFileChange(dir, ext, _event, filename) {
    if (!filename) return;
    if (!ext.some(e => filename.endsWith(e))) return;

    console.log(`\x1b[33m[watch]\x1b[0m File changed: ${path.join(dir, filename)}`);

    // Debounce so rapid saves don't trigger multiple builds
    clearTimeout(timer);
    timer = setTimeout(build, DEBOUNCE_MS);
}

// Initial build
console.log('\x1b[36m[watch]\x1b[0m Running initial build...');
build();

// Start watchers
for (const { dir, ext } of watchDirs) {
    if (!fs.existsSync(dir)) {
        console.warn(`\x1b[33m[watch]\x1b[0m Skipping ${dir} (does not exist)`);
        continue;
    }
    fs.watch(dir, { recursive: true }, (event, filename) => {
        onFileChange(dir, ext, event, filename);
    });
    console.log(`\x1b[36m[watch]\x1b[0m Watching ${path.relative(__dirname, dir)}/ for ${ext.join(', ')} changes`);
}

console.log('\x1b[36m[watch]\x1b[0m Press Ctrl+C to stop.\n');
