// ============================================
// PAGE TRANSITIONS - FADE SEMPLICE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Crea l'overlay per le transizioni se non esiste
    let overlay = document.querySelector('.page-transition-overlay');

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        document.body.appendChild(overlay);
    }

    function resetOverlay() {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
    }

    // Fade in quando la pagina e' caricata
    window.addEventListener('load', function() {
        setTimeout(() => {
            resetOverlay();
        }, 100);
    });

    // Fix back/forward cache: quando si torna indietro, nascondi sempre l'overlay
    window.addEventListener('pageshow', function() {
        resetOverlay();
    });

    // Safety net per alcuni browser durante popstate
    window.addEventListener('popstate', function() {
        resetOverlay();
    });

    // Gestisci click sui link interni
    const internalLinks = document.querySelectorAll('a');

    internalLinks.forEach(link => {
        // Salta link speciali
        if (
            link.target === '_blank' ||
            link.href.startsWith('javascript:') ||
            link.href.startsWith('mailto:') ||
            link.href.startsWith('tel:') ||
            link.href.includes('#')
        ) {
            return;
        }

        // Controlla se e' un link interno
        const linkUrl = new URL(link.href, window.location.origin);
        const currentUrl = new URL(window.location.href);

        if (linkUrl.hostname === currentUrl.hostname && linkUrl.pathname !== currentUrl.pathname) {
            link.addEventListener('click', function(e) {
                // Non intercettare se si usano tasti modificatori
                if (e.metaKey || e.ctrlKey || e.shiftKey) {
                    return;
                }

                e.preventDefault();

                // Fade out
                overlay.style.opacity = '1';
                overlay.style.pointerEvents = 'all';

                // Vai alla nuova pagina dopo il fade
                setTimeout(() => {
                    window.location.href = link.href;
                }, 300);
            });
        }
    });

    // Se il DOM e' gia' caricato, fai subito il fade in
    if (document.readyState === 'complete') {
        resetOverlay();
    }
});