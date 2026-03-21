/**
 * Extracted createMarkedRenderer for testability.
 * Pass the marked library instance explicitly (required in Node/test environments).
 * In the browser build, presentation.js passes the global `marked`.
 */
function createMarkedRenderer(markedLib) {
    if (!markedLib || !markedLib.Renderer) {
        throw new Error('createMarkedRenderer requires a marked library instance with a Renderer constructor');
    }
    const renderer = new markedLib.Renderer();

    renderer.code = function ({ text, lang }) {
        const info = lang || '';

        const specMatch = info.match(/\[([^\]]+)\]$/);
        const specContent = specMatch ? specMatch[1] : null;
        const language = info.replace(/\s*\[[^\]]*\]$/, '').trim();

        if (language === 'mermaid') {
            const mermaidDiv = `<div class="mermaid">${text}</div>`;
            if (specContent) {
                return `<div class="${specContent}">${mermaidDiv}</div>\n`;
            }
            return `${mermaidDiv}\n`;
        }

        if (language === 'jsmind') {
            const jsmindDiv = `<div class="jsmind-container">${text}</div>`;
            if (specContent) {
                return `<div class="${specContent}">${jsmindDiv}</div>\n`;
            }
            return `${jsmindDiv}\n`;
        }

        const langClass = language ? ` class="language-${language}"` : '';
        const lineNumAttr = specContent ? ` data-line-numbers="${specContent}"` : '';

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

module.exports = { createMarkedRenderer };
