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
          mermaid
            .render(
              "mermaid-" + Math.random().toString(36).substring(2),
              graphDefinition
            )
            .then(function(result) {
              insertSvg(result.svg);
            });
        } catch (error) {
          var errorStr = "";
          if (error && error.str) {
            errorStr = error.str;
          }
          if (error && error.message) {
            errorStr = error.message;
          }
          console.error(errorStr, { error: error, graphDefinition: graphDefinition, el: el });
          el.innerHTML = errorStr;
        }
      });
    },
  };

  if (typeof Reveal !== 'undefined') {
    Reveal.registerPlugin(Plugin);
  }
})();
