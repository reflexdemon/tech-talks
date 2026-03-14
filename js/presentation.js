const params = new URLSearchParams(window.location.search);
let presentationName = params.get('presentation');

// If no presentation param, try to infer from the URL path
if (!presentationName) {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    if (pathParts.length > 0) {
        presentationName = pathParts[pathParts.length - 1];
    }
}

// Fallback to java-11-to-17
if (!presentationName || presentationName === 'site') {
    presentationName = 'java-11-to-17';
}

const SLIDE_SEPARATOR = '>>';
const VERTICAL_SEPARATOR = 'VV';
const NOTE_PREFIX = '^Note:';

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

// const presentations = {
//     'java-11-to-17': {
//         theme: 'beige',
//         slides: [
//             { file: 'intro.md', bg: '/images/16252246_rm380-13.jpeg', bgSize: 'cover' },
//             { file: 'http-client.md', bg: '/images/elegant-blue-background-business-presentation.jpeg', bgSize: 'cover' },
//             { file: 'switch-updates.md', bg: '/images/15276012_5570869.jpeg', bgSize: 'cover' },
//             { file: 'text-blocks.md', bg: '/images/16252285_rm380-18.jpg', bgSize: 'cover' },
//             { file: 'instanceof.md', bg: '/images/15276012_5570869.jpeg', bgSize: 'cover' },
//             { file: 'records.md', bg: '/images/6402686_3274406.jpg', bgSize: 'cover' },
//             { file: 'sealed-classes.md', bg: '/images/elegant-blue-background-business-presentation.jpeg', bgSize: 'cover' },
//             { file: 'api-updates.md', bg: '/images/16252246_rm380-13.jpeg', bgSize: 'cover' },
//             { file: 'runtime-updates.md', bg: '/images/abstract-yellow-light-luminous-background.jpeg', bgSize: 'cover' },
//             { file: 'other-updates.md', bg: '/images/16252246_rm380-13.jpeg', bgSize: 'cover' },
//             { file: 'thank-you.md', bg: '/images/6402686_3274406.jpg', bgSize: 'cover' }
//         ]
//     },
//     'openspec': {
//         theme: 'black',
//         slides: [
//             { file: 'intro.md', bgSize: 'cover' },
//         ]
//     }
// };
const presentations = require('../presentations/config.json');

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
                const response = await fetch(`/presentations/${presentationName}/${slideConfig.file}`);
                if (!response.ok) continue;
                const content = await response.text();
                const slideGroups = parseSlidesWithVertical(content);

                for (const group of slideGroups) {
                    const section = document.createElement('section');
                    if (slideConfig.bg) {
                        section.setAttribute('data-background-image', slideConfig.bg);
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
                        if (slideConfig.bg) {
                            mainSlide.setAttribute('data-background-image', slideConfig.bg);
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
                            if (slideConfig.bg) {
                                verticalSection.setAttribute('data-background-image', slideConfig.bg);
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
                    lineColor: '#0fefff', // Highly visible teal for connectors
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
