/*!
 * reveal.js jsMind plugin
 * Renders jsmind fenced code blocks as interactive mind maps using jsMind.
 * Renders lazily on slidechanged to ensure the container has dimensions.
 */

(function () {
    const Plugin = {
        id: 'jsmind',

        init: function (reveal) {
            if (typeof jsMind === 'undefined') {
                console.warn('[jsMind plugin] jsMind global not loaded');
                return;
            }

            const rendered = new WeakSet();

            function renderContainer(el) {
                if (rendered.has(el)) return;

                const rawText = el.textContent.trim();

                let mindData;
                try {
                    mindData = JSON.parse(rawText);
                } catch (err) {
                    console.error('[jsMind plugin] Invalid JSON:', err, rawText);
                    el.textContent = '[jsMind error: invalid JSON]';
                    rendered.add(el);
                    return;
                }

                el.id = 'jsmind-' + Math.random().toString(36).substring(2);

                // Use Reveal's configured slide dimensions so jsMind gets real pixel sizes,
                // not the CSS-transformed (scaled-down) values that offsetWidth would return.
                var config = reveal.getConfig();
                var slideWidth = config.width || 960;
                var slideHeight = config.height || 700;
                var mapHeight = Math.round(slideHeight * 0.75);

                el.style.width = slideWidth + 'px';
                el.style.height = mapHeight + 'px';
                el.style.position = 'relative';
                el.textContent = '';

                try {
                    var jm = new jsMind({
                        container: el.id,
                        theme: 'cloud',
                        editable: false,
                        mode: 'full',
                        view: {
                            width: slideWidth,
                            height: mapHeight,
                            hmargin: 0,
                            vmargin: 0,
                            line_width: 2,
                            line_color: 'rgba(255,255,255,0.5)',
                            draggable: true,
                            hide_scrollbars_when_draggable: true,
                            zoom: {
                                min: 0.5,
                                max: 3.0,
                                step: 0.1
                            }
                        }
                    });

                    jm.show(mindData);

                    // Expose instance for zooming and other interactions
                    el.__jsmind_instance = jm;

                    // Explicitly center the entire graph (bounding box) rather than just the root node
                    setTimeout(function () {
                        if (jm && jm.view && jm.view.e_panel) {
                            var e_panel = jm.view.e_panel;
                            var jmnodes = e_panel.querySelectorAll('jmnode');
                            if (jmnodes.length > 0) {
                                var minX = Infinity, maxX = -Infinity;
                                var minY = Infinity, maxY = -Infinity;

                                jmnodes.forEach(function (node) {
                                    var left = parseInt(node.style.left) || 0;
                                    var top = parseInt(node.style.top) || 0;
                                    var width = node.offsetWidth || 0;
                                    var height = node.offsetHeight || 0;

                                    if (left < minX) minX = left;
                                    if (left + width > maxX) maxX = left + width;
                                    if (top < minY) minY = top;
                                    if (top + height > maxY) maxY = top + height;
                                });

                                if (minX !== Infinity) {
                                    var centerX = minX + (maxX - minX) / 2;
                                    var centerY = minY + (maxY - minY) / 2;

                                    // Calculate target scrolls to center the bounding box
                                    e_panel.scrollLeft = Math.round(centerX - e_panel.clientWidth / 2);
                                    e_panel.scrollTop = Math.round(centerY - e_panel.clientHeight / 2);
                                }
                            }
                        }
                    }, 100);

                    // Stop event propagation for wheel to prevent reveal.js from scrolling or zooming natively
                    // and implement custom zoom using wheel
                    el.addEventListener('wheel', function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        if (e.deltaY > 0) {
                            jm.view.zoom_out();
                        } else {
                            jm.view.zoom_in();
                        }
                    }, { passive: false });

                    rendered.add(el);
                } catch (err) {
                    console.error('[jsMind plugin] jsMind.show failed:', err);
                    el.textContent = '[jsMind error: ' + (err.message || String(err)) + ']';
                    rendered.add(el);
                }
            }

            function renderVisibleContainers() {
                var currentSlide = reveal.getCurrentSlide();
                if (!currentSlide) return;
                currentSlide.querySelectorAll('.jsmind-container').forEach(renderContainer);
            }

            reveal.on('slidechanged', renderVisibleContainers);
            reveal.on('ready', renderVisibleContainers);

            // Add global keyboard shortcuts for zoom if a jsmind container is on the active slide
            if (!document.__jsmind_keydown_added) {
                document.addEventListener('keydown', function (e) {
                    if (e.key === '=' || e.key === '+' || e.key === '-') {
                        var currentSlide = reveal.getCurrentSlide();
                        if (!currentSlide) return;
                        var containers = currentSlide.querySelectorAll('.jsmind-container');
                        if (containers.length > 0 && containers[0].__jsmind_instance) {
                            var jmInstance = containers[0].__jsmind_instance;
                            if (e.key === '=' || e.key === '+') {
                                jmInstance.view.zoom_in();
                            } else if (e.key === '-') {
                                jmInstance.view.zoom_out();
                            }
                            e.stopPropagation();
                        }
                    }
                });
                document.__jsmind_keydown_added = true;
            }
        },
    };

    window.RevealJsMind = Plugin;
})();
