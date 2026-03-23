/**
 * Property-based tests for the jsMind mindmap plugin.
 * Feature: jsmind-mindmap-plugin
 * Uses fast-check with a minimum of 100 iterations per property.
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import * as markedLib from 'marked';
import { createMarkedRenderer } from '../../src/js/markedRenderer.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pluginSrc = readFileSync(join(__dirname, '../../src/js/jsmind/plugin.js'), 'utf8');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeRenderer() {
    return createMarkedRenderer(markedLib);
}

function loadPlugin(jsMindMock) {
    const fakeWindow = {};
    // eslint-disable-next-line no-new-func
    new Function('window', 'jsMind', pluginSrc)(fakeWindow, jsMindMock);
    return fakeWindow.RevealJsMind;
}

function makeRevealEnv(jsonStrings) {
    const containers = jsonStrings.map((json) => ({ textContent: json, id: '' }));
    const revealMock = {
        getRevealElement: () => ({
            querySelectorAll: (sel) => (sel === '.jsmind-container' ? containers : []),
        }),
    };
    return { revealMock, containers };
}

function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
