document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });

    // Close menu when clicking a link (optional for mobile UX)
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
            }
        });
    });

    // ============================================================
    // Telegraph diagram interaction
    // ============================================================
    const telegraphSvg = document.getElementById('telegraphSvg');
    const telegraphKey = document.getElementById('telegraphKey');

    if (telegraphSvg && telegraphKey) {
        let active = false;
        let repeatTimer = null;

        const startSignal = () => {
            active = true;
            telegraphSvg.classList.add('active');

            // Keep animation alive while pressed/held.
            // CSS handles infinite animations; we just need to toggle the state.
            if (repeatTimer) clearTimeout(repeatTimer);
        };

        const stopSignal = () => {
            active = false;
            telegraphSvg.classList.remove('active');
            if (repeatTimer) clearTimeout(repeatTimer);
            repeatTimer = null;
        };

        // Mouse/touch/keyboard support
        telegraphKey.addEventListener('mousedown', (e) => {
            e.preventDefault();
            startSignal();
        });

        window.addEventListener('mouseup', () => {
            stopSignal();
        });

        telegraphKey.addEventListener('mouseleave', () => {
            if (active) stopSignal();
        });

        telegraphKey.addEventListener('touchstart', (e) => {
            e.preventDefault();
            startSignal();
        }, { passive: false });

        telegraphKey.addEventListener('touchend', () => {
            stopSignal();
        });

        // Also allow click to trigger single press (and keep it active briefly)
        telegraphKey.addEventListener('click', (e) => {
            e.preventDefault();
            startSignal();
            // brief auto-release so click works without needing hold.
            repeatTimer = setTimeout(() => stopSignal(), 250);
        });

        telegraphKey.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                startSignal();
                repeatTimer = setTimeout(() => stopSignal(), 250);
            }
        });

        // Start/stop on pointer events (fallback)
        telegraphKey.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            startSignal();
        });
        window.addEventListener('pointerup', () => stopSignal());
    }
});

