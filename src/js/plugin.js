/*!
 * reveal.js Mermaid plugin - UMD version for CDN
 */

(function() {
  const Plugin = {
    id: "mermaid",

    init: function(reveal) {
      if (typeof mermaid === 'undefined') {
        console.warn('Mermaid not loaded');
        return;
      }

      let mermaidConfig = reveal.getConfig().mermaid || {};

      mermaid.initialize({
        startOnLoad: false,
        ...mermaidConfig,
      });

      const mermaidEls = reveal.getRevealElement().querySelectorAll(".mermaid");

      Array.from(mermaidEls).forEach(function(el) {
        var insertSvg = function(svgCode) {
          el.innerHTML = svgCode;
        };

        var graphDefinition = el.textContent.trim();

        try {
          const id = "mermaid-" + Math.random().toString(36).substring(2);
          mermaid
            .render(id, graphDefinition)
            .then(function(result) {
              insertSvg(result.svg);
            })
            .catch(function(error) {
               console.error('[Mermaid plugin] Rendering failed:', error);
               el.innerHTML = `<div class="error">Mermaid Error: ${error.message || error}</div>`;
            });
        } catch (error) {
          console.error('[Mermaid plugin] Sync check failed:', error);
          el.innerHTML = error.message || String(error);
        }

      });
    },
  };

  window.RevealMermaid = Plugin;
})();
