const SLIDE_SEPARATOR = '>>';
const VERTICAL_SEPARATOR = 'VV';
const NOTE_PREFIX = '^Note:';

// Detect base path and presentation name
const params = new URLSearchParams(window.location.search);
let presentationName = params.get('presentation');

// Calculate relative base path to root
// site/index.html -> ""
// site/openspec/index.html -> "../"
const pathParts = window.location.pathname.split('/').filter(Boolean);
let basePath = '';

// If we are on GitHub Pages (e.g. /tech-talks/), the first part is the repo name
const isGHPages = window.location.hostname.includes('github.io');
const repoName = isGHPages ? pathParts[0] : null;

// Filter out repo name from depth calculation if necessary
const actualPathParts = isGHPages ? pathParts.slice(1) : pathParts;
if (actualPathParts.length > 0) {
    basePath = '../'.repeat(actualPathParts.length);
}
// Normalize basePath to ensure it ends with / if not empty
if (basePath && !basePath.endsWith('/')) basePath += '/';

// If no query param, infer from the last part of the path
if (!presentationName && actualPathParts.length > 0) {
    presentationName = actualPathParts[actualPathParts.length - 1];
}

const presentations = require('../presentations/config.json');

// Fallback logic
let isLandingPage = false;
if (!presentationName || !presentations[presentationName]) {
    // If we're at root, it's the landing page
    if (!presentationName || presentationName === repoName || presentationName === 'site') {
        isLandingPage = true;
    } else {
        // Fallback to java-11-to-17 if it's an unrecognized name but looks like a presentation request
        presentationName = 'java-11-to-17';
    }
}

// Set landing page background if applicable
if (isLandingPage) {
    document.body.style.backgroundImage = `url('${basePath}images/3274408.jpg')`;
    document.body.style.backgroundSize = 'cover';
}

/**
 * Custom marked renderer that preserves reveal.js line-number highlight specs.
 *
 * Markdown fences like:
 *   ```java [0|3-7|9-15]
 * must produce:
 *   <pre><code class="language-java" data-line-numbers="0|3-7|9-15" data-trim>
 *
 * Plain marked.parse() discards everything after the language token, so we
 * override the `code` renderer to extract the optional `[...]` spec ourselves.
 */
function createMarkedRenderer() {
    const renderer = new marked.Renderer();

    renderer.code = function ({ text, lang }) {
        const info = lang || '';

        // Match optional [class-or-line-number-spec] – may appear with or without a language
        const specMatch = info.match(/\[([^\]]+)\]$/);
        const specContent = specMatch ? specMatch[1] : null;

        // Language is everything before the optional [ ... ]
        const language = info.replace(/\s*\[[^\]]*\]$/, '').trim();

        // If it's a mermaid block, return a div with class 'mermaid'
        // If there's fragment info, wrap it in a fragment div
        if (language === 'mermaid') {
            const mermaidDiv = `<div class="mermaid">${text}</div>`;
            if (specContent) {
                return `<div class="${specContent}">${mermaidDiv}</div>\n`;
            }
            return `${mermaidDiv}\n`;
        }

        const langClass = language ? ` class="language-${language}"` : '';
        const lineNumAttr = specContent ? ` data-line-numbers="${specContent}"` : '';

        // Escape HTML entities in the code body (marked does this by default too)
        const escaped = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');

        return `<pre><code${langClass}${lineNumAttr} data-trim>${escaped}</code></pre>\n`;
    };

    return renderer;
}



/**
 * Parse a single markdown file's content into slide groups.
 * Handles multiple VV (vertical) separators per >> (horizontal) section.
 *
 * @param {string} content - Raw markdown content
 * @returns {Array<{content: string, verticals: string[], notes: string}>}
 */
function parseSlidesWithVertical(content) {
    const slideGroups = [];
    const sections = content.split(SLIDE_SEPARATOR);
    // Reuse a single renderer instance per parse call for efficiency
    const markedOpts = { renderer: createMarkedRenderer() };

    for (const section of sections) {
        if (!section.trim()) continue;

        // Split by VV to get all parts (main + each vertical slide)
        const parts = section.split(VERTICAL_SEPARATOR);

        // --- Process Main Part ---
        let mainRaw = parts[0].trim();
        let mainNotes = '';
        let cleanedMain = mainRaw;

        // Match 'Note:' at the start of a line and capture everything until the end of the segment
        const noteRegex = /(?:^|\n)Note:\s*([\s\S]+)$/im;
        const mainNoteMatch = mainRaw.match(noteRegex);
        if (mainNoteMatch) {
            mainNotes = mainNoteMatch[1].trim();
            cleanedMain = mainRaw.replace(mainNoteMatch[0], '').trim();
        }

        const verticals = [];

        // --- Process Vertical Parts ---
        for (let i = 1; i < parts.length; i++) {
            let vRaw = parts[i].trim();
            if (!vRaw) continue;

            let vNotes = '';
            let cleanedV = vRaw;

            const vNoteMatch = vRaw.match(noteRegex);
            if (vNoteMatch) {
                vNotes = vNoteMatch[1].trim();
                cleanedV = vRaw.replace(vNoteMatch[0], '').trim();
            }

            if (cleanedV) {
                let vHtml = marked.parse(cleanedV, markedOpts);
                verticals.push({
                    content: processElementAttributes(vHtml),
                    notes: vNotes
                });
            }
        }

        let mainHtml = marked.parse(cleanedMain, markedOpts);
        slideGroups.push({
            content: processElementAttributes(mainHtml),
            verticals: verticals,
            notes: mainNotes
        });
    }

    return slideGroups;
}

/**
* Processes reveal.js-style element attributes like <!-- .element: class="fragment" -->
* by applying them to the parent HTML element.
*/
function processElementAttributes(html) {
    const div = document.createElement('div');
    div.innerHTML = html;

    const iterator = document.createNodeIterator(div, NodeFilter.SHOW_COMMENT, null, false);
    let node;
    const toRemove = [];

    while ((node = iterator.nextNode())) {
        const text = node.nodeValue.trim();
        if (text.startsWith('.element:')) {
            const attributesLine = text.replace('.element:', '').trim();
            const parent = node.parentElement;
            if (parent) {
                // Apply attributes to parent: match key="value" or key='value'
                const attrRegex = /([\w-]+)\s*=\s*(?:"([^"]+)"|'([^']+)')/g;
                let match;
                while ((match = attrRegex.exec(attributesLine)) !== null) {
                    const attrName = match[1];
                    const attrValue = match[2] || match[3];
                    parent.setAttribute(attrName, attrValue);
                }
                toRemove.push(node);
            }
        }
    }

    toRemove.forEach(n => n.remove());
    return div.innerHTML;
}

async function loadPresentation() {
    try {
        const config = presentations[presentationName];
        if (!config) {
            throw new Error(`Presentation "${presentationName}" not found.`);
        }

        // Apply theme dynamically
        const theme = config.theme || 'black';
        const themeLink = document.getElementById('reveal-theme');
        if (themeLink) {
            themeLink.href = `https://cdn.jsdelivr.net/npm/reveal.js@5.0.0/dist/theme/${theme}.css`;
        }

        if (typeof marked === 'undefined') {
            document.getElementById('slides-container').innerHTML = '<section><h2>Error: marked library not loaded</h2></section>';
            return;
        }

        const slidesContainer = document.getElementById('slides-container');
        // Clear container before loading to prevent duplicate slides on hot reload
        slidesContainer.innerHTML = '';

        for (const slideConfig of config.slides) {
            try {
                // Ensure the presentation path accounts for common repo subdirectories on GH Pages
                const fetchUrl = `${basePath}presentations/${presentationName}/${slideConfig.file}`;
                const response = await fetch(fetchUrl);
                if (!response.ok) continue;
                const content = await response.text();
                const slideGroups = parseSlidesWithVertical(content);

                for (const group of slideGroups) {
                    const section = document.createElement('section');
                    // Prepend basePath to images if they are root-relative (start with /)
                    let slideBg = slideConfig.bg;
                    if (slideBg && slideBg.startsWith('/')) {
                        slideBg = basePath + slideBg.substring(1);
                    }

                    if (slideBg) {
                        section.setAttribute('data-background-image', slideBg);
                    } else {
                        section.setAttribute('data-background-color', '#000');
                    }
                    if (slideConfig.bgSize) {
                        section.setAttribute('data-background-size', slideConfig.bgSize);
                    }

                    if (group.verticals && group.verticals.length > 0) {
                        // Reveal.js vertical stacks: wrap main + verticals in a parent <section>
                        const stack = document.createElement('section');

                        const mainSlide = document.createElement('section');
                        if (slideBg) {
                            mainSlide.setAttribute('data-background-image', slideBg);
                        } else {
                            mainSlide.setAttribute('data-background-color', '#000');
                        }
                        if (slideConfig.bgSize) {
                            mainSlide.setAttribute('data-background-size', slideConfig.bgSize);
                        }
                        // Apply notes to the main slide of the stack
                        if (group.notes) {
                            mainSlide.setAttribute('data-notes', group.notes);
                        }
                        mainSlide.innerHTML = group.content;
                        stack.appendChild(mainSlide);

                        for (const vObj of group.verticals) {
                            const verticalSection = document.createElement('section');
                            if (slideBg) {
                                verticalSection.setAttribute('data-background-image', slideBg);
                            } else {
                                verticalSection.setAttribute('data-background-color', '#000');
                            }
                            if (slideConfig.bgSize) {
                                verticalSection.setAttribute('data-background-size', slideConfig.bgSize);
                            }
                            // Apply notes to vertical slides
                            if (vObj.notes) {
                                verticalSection.setAttribute('data-notes', vObj.notes);
                            }
                            verticalSection.innerHTML = vObj.content;
                            stack.appendChild(verticalSection);
                        }

                        slidesContainer.appendChild(stack);
                    } else {
                        // Single horizontal slide
                        if (group.notes) {
                            section.setAttribute('data-notes', group.notes);
                        }
                        section.innerHTML = group.content;
                        slidesContainer.appendChild(section);
                    }
                }
            } catch (e) {
                console.warn(`Could not load ${slideConfig.file}:`, e);
            }
        }

        initializeReveal();
    } catch (error) {
        console.error('Error loading presentation:', error);
        document.getElementById('slides-container').innerHTML = `
            <section>
                <h2>Error Loading Presentation</h2>
                <p>Could not load presentation: ${presentationName}</p>
                <p><small>${error.message}</small></p>
            </section>
        `;
        initializeReveal();
    }
}

function initializeReveal() {
    if (typeof Reveal !== 'undefined') {
        Reveal.initialize({
            controls: true,
            progress: true,
            center: true,
            hash: true,
            slideNumber: 'h.v',
            transition: 'slide',
            mermaid: {
                theme: 'dark',
                themeVariables: {
                    lineColor: 'rgba(255, 255, 255, 0.5)', // Subtle white for connectors
                    textColor: '#ffffff',
                    primaryColor: '#2d3436',
                    primaryBorderColor: '#636e72',
                    fontFamily: 'Inter, system-ui, sans-serif'
                },
                flowchart: {
                    padding: 20,
                    htmlLabels: false
                }
            },
            plugins: [
                typeof RevealMarkdown !== 'undefined' ? RevealMarkdown : null,
                typeof RevealHighlight !== 'undefined' ? RevealHighlight : null,
                typeof RevealNotes !== 'undefined' ? RevealNotes : null,
                typeof RevealMermaid !== 'undefined' ? RevealMermaid : null,
                typeof RevealSpotlight !== 'undefined' ? RevealSpotlight : null
            ].filter(Boolean)
        });
    } else {
        // Reveal.js not yet available — wait for it
        console.warn('Reveal not defined yet, retrying in 200ms...');
        setTimeout(initializeReveal, 200);
    }
}

document.addEventListener('DOMContentLoaded', loadPresentation);
