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
    
    // Fade in quando la pagina è caricata
    window.addEventListener('load', function() {
        setTimeout(() => {
            overlay.style.opacity = '0';
        }, 100);
    });
    
    // Gestisci click sui link interni
    const internalLinks = document.querySelectorAll('a');
    
    internalLinks.forEach(link => {
        // Salta link speciali
        if (link.target === '_blank' || 
            link.href.startsWith('javascript:') || 
            link.href.startsWith('mailto:') || 
            link.href.startsWith('tel:') ||
            link.href.includes('#')) {
            return;
        }
        
        // Controlla se è un link interno
        const linkUrl = new URL(link.href, window.location.origin);
        const currentUrl = new URL(window.location.href);
        
        if (linkUrl.hostname === currentUrl.hostname && 
            linkUrl.pathname !== currentUrl.pathname) {
            
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
    
    // Se il DOM è già caricato, fai subito il fade in
    if (document.readyState === 'complete') {
        overlay.style.opacity = '0';
    }
});