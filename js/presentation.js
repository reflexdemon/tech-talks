const params = new URLSearchParams(window.location.search);
const presentationName = params.get('presentation') || 'java-11-to-17';

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
        // info string can be: "java", "java [0|3-7]", "[0|3-7]", etc.
        const info = lang || '';

        // Match optional [line-number-spec] – may appear with or without a language
        const lineNumMatch = info.match(/\[([^\]]+)\]$/);
        const lineNumbers = lineNumMatch ? lineNumMatch[1] : null;

        // Language is everything before the optional [ ... ]
        const language = info.replace(/\s*\[[^\]]*\]$/, '').trim();

        const langClass = language ? ` class="language-${language}"` : '';
        const lineNumAttr = lineNumbers ? ` data-line-numbers="${lineNumbers}"` : '';

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

const slidesConfig = {
    'java-11-to-17':
        [
            { file: 'intro.md', bg: './images/16252246_rm380-13.jpeg' },
            { file: 'http-client.md', bg: './images/6600687_3306588.jpg' },
            { file: 'switch-updates.md', bg: './images/6402686_3274406.jpg' },
            { file: 'text-blocks.md', bg: './images/16252285_rm380-18.jpg' },
            { file: 'instanceof.md', bg: './images/16367383_rm380-10.jpeg' },
            { file: 'records.md', bg: './images/15276013_5570863.jpeg' },
            { file: 'sealed-classes.md', bg: './images/15276012_5570869.jpeg' },
            { file: 'api-updates.md', bg: './images/elegant-blue-background-business-presentation.jpeg' },
            { file: 'runtime-updates.md', bg: './images/abstract-yellow-light-luminous-background.jpeg' },
            { file: 'other-updates.md', bg: './images/SL-120722-54440-38.jpg' },
            { file: 'thank-you.md', bg: './images/10136775_17973908.jpeg' }
        ],
    'openspec': [
        { file: 'intro.md', bg: './images/16252246_rm380-13.jpeg' },
    ]
};

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
        const mainContent = parts[0].trim();

        // Extract speaker notes from main content
        let notes = '';
        let cleanedContent = mainContent;

        const noteMatch = mainContent.match(new RegExp(`${NOTE_PREFIX}(.+?)(?=\\n|$)`, 's'));
        if (noteMatch) {
            notes = noteMatch[1].trim();
            cleanedContent = mainContent.replace(noteMatch[0], '').trim();
        }

        const verticals = [];

        // Process all remaining parts (parts[1], parts[2], ...) as vertical slides
        for (let i = 1; i < parts.length; i++) {
            let vContent = parts[i].trim();
            if (!vContent) continue; // skip empty segments between consecutive VV

            // Extract notes from vertical slide content too
            const vNoteMatch = vContent.match(new RegExp(`${NOTE_PREFIX}(.+?)(?=\\n|$)`, 's'));
            if (vNoteMatch) {
                vContent = vContent.replace(vNoteMatch[0], '').trim();
            }

            if (vContent) {
                verticals.push(marked.parse(vContent, markedOpts));
            }
        }

        slideGroups.push({
            content: marked.parse(cleanedContent, markedOpts),
            verticals: verticals,
            notes: notes
        });
    }

    return slideGroups;
}

async function loadPresentation() {
    try {
        if (typeof marked === 'undefined') {
            document.getElementById('slides-container').innerHTML = '<section><h2>Error: marked library not loaded</h2></section>';
            return;
        }

        const slidesContainer = document.getElementById('slides-container');

        for (const slideConfig of slidesConfig[presentationName]) {
            try {
                const response = await fetch(`./presentations/${presentationName}/${slideConfig.file}`);
                if (!response.ok) continue;
                const content = await response.text();
                const slideGroups = parseSlidesWithVertical(content);

                for (const group of slideGroups) {
                    const section = document.createElement('section');
                    section.setAttribute('data-background-image', slideConfig.bg);

                    if (group.notes) {
                        section.setAttribute('data-notes', group.notes);
                    }

                    if (group.verticals && group.verticals.length > 0) {
                        // Reveal.js vertical stacks: wrap main + verticals in a parent <section>
                        const stack = document.createElement('section');

                        const mainSlide = document.createElement('section');
                        mainSlide.setAttribute('data-background-image', slideConfig.bg);
                        mainSlide.innerHTML = group.content;
                        stack.appendChild(mainSlide);

                        for (const verticalContent of group.verticals) {
                            const verticalSection = document.createElement('section');
                            verticalSection.setAttribute('data-background-image', slideConfig.bg);
                            verticalSection.innerHTML = verticalContent;
                            stack.appendChild(verticalSection);
                        }

                        slidesContainer.appendChild(stack);
                    } else {
                        // Single horizontal slide
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
            plugins: [
                typeof RevealMarkdown !== 'undefined' ? RevealMarkdown : null,
                typeof RevealHighlight !== 'undefined' ? RevealHighlight : null,
                typeof RevealNotes !== 'undefined' ? RevealNotes : null,
                typeof RevealMermaid !== 'undefined' ? RevealMermaid : null
            ].filter(Boolean)
        });
    } else {
        // Reveal.js not yet available — wait for it
        console.warn('Reveal not defined yet, retrying in 200ms...');
        setTimeout(initializeReveal, 200);
    }
}

document.addEventListener('DOMContentLoaded', loadPresentation);
