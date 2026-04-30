(function() {
    var body = document.body;
    var root = document.documentElement;
    var hero = document.querySelector('.hero-banner');
    var heroParticles = document.getElementById('hero-particles');
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var revealObserver = null;
    var rafId = 0;
    var pointerRafId = 0;
    var heroPointer = {
        currentX: 0,
        currentY: 0,
        targetX: 0,
        targetY: 0
    };

    function forEachNode(nodeList, callback) {
        Array.prototype.forEach.call(nodeList, callback);
    }

    function tagReveal(node, animation, delay, duration) {
        if (!node || node.hasAttribute('data-reveal')) {
            return;
        }

        node.setAttribute('data-reveal', animation || 'animate__fadeInUp');

        if (typeof delay === 'number') {
            node.setAttribute('data-reveal-delay', String(delay));
        }

        if (duration) {
            node.setAttribute('data-reveal-duration', duration);
        }
    }

    function tagChildren(selector, animation, baseDelay, step, duration) {
        forEachNode(document.querySelectorAll(selector), function(node, index) {
            tagReveal(node, animation, baseDelay + index * step, duration);
        });
    }

    function tagPairLayouts(selector) {
        forEachNode(document.querySelectorAll(selector), function(layout) {
            forEachNode(layout.children, function(node, index) {
                tagReveal(node, index === 0 ? 'animate__fadeInLeft' : 'animate__fadeInRight', index * 120, '900ms');
            });
        });
    }

    function reveal(node) {
        if (!node || node.classList.contains('is-revealed')) {
            return;
        }

        var animation = node.getAttribute('data-reveal') || 'animate__fadeInUp';
        var delay = node.getAttribute('data-reveal-delay');
        var duration = node.getAttribute('data-reveal-duration');

        node.classList.add('is-revealed', 'animate__animated', animation);

        if (delay) {
            node.style.animationDelay = delay + 'ms';
        }

        if (duration) {
            node.style.setProperty('--animate-duration', duration);
        }
    }

    function isNearViewport(node) {
        var rect = node.getBoundingClientRect();
        return rect.top < window.innerHeight * 1.08 && rect.bottom > -window.innerHeight * 0.08;
    }

    function setupReveal() {
        tagChildren('.hero-copy--banner > *', 'animate__fadeInUp', 40, 50, '640ms');
        tagChildren('.hero-stat-strip > *', 'animate__fadeInUp', 60, 55, '680ms');
        tagChildren('.page-copy > *', 'animate__fadeInUp', 40, 50, '640ms');
        tagChildren('.section-heading', 'animate__fadeInUp', 0, 0, '620ms');
        tagChildren('.hero-scroll-cue', 'animate__fadeInUp', 180, 0, '680ms');
        tagPairLayouts('.page-hero-grid, .feature-split, .split-layout, .cta-layout, .download-layout, .video-showcase');
        tagChildren('.feature-grid > *, .world-grid > *, .qte-grid > *, .platform-grid > *, .skill-grid > *, .motion-grid > *, .contact-grid > *, .character-grid > *, .note-grid > *, .video-grid > *, .character-strip > *, .surface-meta > *, .pill-row > *, .tag-list > *, .footer-panel > *', 'animate__fadeInUp', 0, 56, '700ms');
        tagChildren('.art-card, .surface-panel, .contact-panel, .quote-panel, .video-frame, .media-stack, .media-copy, .page-visual', 'animate__zoomIn', 20, 20, '760ms');

        body.classList.add('motion-enabled');

        if (!('IntersectionObserver' in window)) {
            forEachNode(document.querySelectorAll('[data-reveal]'), function(node) {
                reveal(node);
            });
            return;
        }

        revealObserver = new IntersectionObserver(function(entries) {
            forEachNode(entries, function(entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                reveal(entry.target);
                revealObserver.unobserve(entry.target);
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px 10% 0px'
        });

        forEachNode(document.querySelectorAll('[data-reveal]'), function(node) {
            if (isNearViewport(node)) {
                reveal(node);
                return;
            }

            revealObserver.observe(node);
        });
    }

    function updateScrollMotion() {
        var scrollTop = window.pageYOffset || root.scrollTop || 0;
        var scrollable = Math.max(root.scrollHeight - window.innerHeight, 1);
        root.style.setProperty('--scroll-progress', Math.min(scrollTop / scrollable, 1).toFixed(4));

        if (hero) {
            var rect = hero.getBoundingClientRect();
            var progress = Math.min(Math.max(-rect.top / Math.max(rect.height * 0.9, 1), 0), 1);

            hero.style.setProperty('--hero-parallax', (progress * 52).toFixed(2) + 'px');
            hero.style.setProperty('--hero-copy-shift', (progress * 18).toFixed(2) + 'px');
            hero.style.setProperty('--hero-overlay-shift', (progress * 32).toFixed(2) + 'px');
        }

        rafId = 0;
    }

    function requestScrollMotion() {
        if (rafId) {
            return;
        }

        rafId = window.requestAnimationFrame(updateScrollMotion);
    }

    function animateHeroPointer() {
        heroPointer.currentX += (heroPointer.targetX - heroPointer.currentX) * 0.14;
        heroPointer.currentY += (heroPointer.targetY - heroPointer.currentY) * 0.14;

        if (hero) {
            hero.style.setProperty('--hero-pointer-x', heroPointer.currentX.toFixed(2) + 'px');
            hero.style.setProperty('--hero-pointer-y', heroPointer.currentY.toFixed(2) + 'px');
            hero.style.setProperty('--hero-tilt-x', (heroPointer.currentY * -0.08).toFixed(2) + 'deg');
            hero.style.setProperty('--hero-tilt-y', (heroPointer.currentX * 0.12).toFixed(2) + 'deg');
        }

        if (Math.abs(heroPointer.targetX - heroPointer.currentX) > 0.08 || Math.abs(heroPointer.targetY - heroPointer.currentY) > 0.08) {
            pointerRafId = window.requestAnimationFrame(animateHeroPointer);
            return;
        }

        pointerRafId = 0;
    }

    function requestHeroPointer() {
        if (pointerRafId) {
            return;
        }

        pointerRafId = window.requestAnimationFrame(animateHeroPointer);
    }

    function bindHeroPointer() {
        if (!hero) {
            return;
        }

        hero.addEventListener('pointermove', function(event) {
            var rect = hero.getBoundingClientRect();
            var normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
            var normalizedY = (event.clientY - rect.top) / rect.height - 0.5;

            heroPointer.targetX = normalizedX * 26;
            heroPointer.targetY = normalizedY * 18;
            requestHeroPointer();
        });

        hero.addEventListener('pointerleave', function() {
            heroPointer.targetX = 0;
            heroPointer.targetY = 0;
            requestHeroPointer();
        });
    }

    function initHeroParticles() {
        if (!heroParticles || typeof window.particlesJS !== 'function') {
            return;
        }

        window.particlesJS('hero-particles', {
            particles: {
                number: {
                    value: 24,
                    density: {
                        enable: true,
                        value_area: 960
                    }
                },
                color: {
                    value: '#6fc9ff'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.32,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 0.7,
                        opacity_min: 0.08,
                        sync: false
                    }
                },
                size: {
                    value: 3.8,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.6,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 118,
                    color: '#9bdbff',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: false,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 148,
                        line_linked: {
                            opacity: 0.34
                        }
                    }
                }
            },
            retina_detect: true
        });
    }

    if (!body || prefersReducedMotion.matches) {
        root.style.setProperty('--scroll-progress', '0');
        return;
    }

    setupReveal();
    initHeroParticles();
    bindHeroPointer();
    updateScrollMotion();

    window.addEventListener('scroll', requestScrollMotion, { passive: true });
    window.addEventListener('resize', requestScrollMotion);
})();