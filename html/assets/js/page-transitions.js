(function() {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var header = document.querySelector('.site-header');
    var navToggle = document.querySelector('.nav-toggle');

    function closeNav() {
        if (!header || !navToggle) {
            return;
        }

        header.classList.remove('is-nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    function toggleNav() {
        if (!header || !navToggle) {
            return;
        }

        var isOpen = header.classList.toggle('is-nav-open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            toggleNav();
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 820) {
                closeNav();
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeNav();
            }
        });
    }

    document.addEventListener('click', function(event) {
        if (header && header.classList.contains('is-nav-open') && !event.target.closest('.site-header') && !event.target.closest('.nav-toggle')) {
            closeNav();
        }

        var link = event.target.closest('a[href]');
        if (!link || event.defaultPrevented || event.button !== 0) {
            return;
        }

        if (link.closest('.site-nav')) {
            closeNav();
        }

        if (prefersReducedMotion.matches) {
            return;
        }

        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }

        if ((link.target && link.target !== '_self') || link.hasAttribute('download') || link.dataset.noTransition !== undefined) {
            return;
        }

        var href = link.getAttribute('href');
        if (!href || href.charAt(0) === '#' || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0 || href.indexOf('javascript:') === 0) {
            return;
        }

        var url = new URL(link.href, window.location.href);
        if (url.origin !== window.location.origin) {
            return;
        }

        if (url.pathname === window.location.pathname && url.search === window.location.search) {
            return;
        }

        event.preventDefault();
        document.body.classList.add('is-page-leaving');

        window.setTimeout(function() {
            window.location.href = url.href;
        }, 220);
    });
})();