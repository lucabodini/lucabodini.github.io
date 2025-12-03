// ============================================
// CUSTOM CURSOR - FIX PER CURSORE BLOCCATO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Inizializzazione cursore personalizzato...');
    
    // Controlla se siamo su un dispositivo touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        console.log('Dispositivo touch - cursore personalizzato disabilitato');
        // Ripristina cursore normale per dispositivi touch
        document.querySelectorAll('html, body, *').forEach(el => {
            el.style.cursor = 'auto';
        });
        return;
    }
    
    // Assicurati che il body sia pronto
    if (!document.body) {
        console.error('Body non trovato, ritardo inizializzazione cursore');
        setTimeout(initCursor, 100);
        return;
    }
    
    initCursor();
});

function initCursor() {
    // Rimuovi eventuali cursori esistenti
    const existingCursor = document.querySelector('.cursor-dot, .cursor-ring');
    if (existingCursor) {
        existingCursor.remove();
    }
    
    // Crea gli elementi del cursore
    const cursorDot = document.createElement('div');
    const cursorRing = document.createElement('div');
    
    cursorDot.className = 'cursor-dot';
    cursorRing.className = 'cursor-ring';
    
    // Nascondi inizialmente
    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';
    
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);
    
    // Aggiungi classe al body per mostrare il cursore
    document.body.classList.add('has-custom-cursor');
    
    // Variabili per la posizione
    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;
    
    // Velocità di movimento (più basso = più smooth)
    const dotSpeed = 0.2;   // Puntino: più veloce, segue subito
    const ringSpeed = 0.07;  // Cerchio: più lento, segue con ritardo
    
    // Aggiorna la posizione del mouse
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Mostra il cursore quando il mouse si muove
        if (cursorDot.style.opacity === '0') {
            cursorDot.style.opacity = '1';
            cursorRing.style.opacity = '1';
        }
    });
    
    // Gestisci il click del mouse
    document.addEventListener('mousedown', function() {
        cursorRing.classList.add('click');
        cursorDot.classList.add('click');
    });
    
    document.addEventListener('mouseup', function() {
        cursorRing.classList.remove('click');
        cursorDot.classList.remove('click');
    });
    
    // Aggiungi effetti hover a TUTTI gli elementi interattivi
    const interactiveElements = document.querySelectorAll(
        'a, button, .cta-button, .project-card, .service-card, ' +
        'input, textarea, select, .clickable, .nav-link, .filter-btn, ' +
        '.faq-question, .project-link'
    );
    
    interactiveElements.forEach(el => {
        // Forza il cursore a none su questi elementi
        el.style.cursor = 'none';
        
        el.addEventListener('mouseenter', function() {
            cursorRing.classList.add('hover');
            cursorDot.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', function() {
            cursorRing.classList.remove('hover');
            cursorDot.classList.remove('hover');
        });
    });
    
    // Previeni qualsiasi cursore di default
    document.addEventListener('mouseover', function(e) {
        if (e.target.style) {
            e.target.style.cursor = 'none';
        }
    });
    
    // Funzione di animazione
    function animateCursor() {
        // Calcola la posizione per il PUNTINO (segue immediatamente)
        dotX += (mouseX - dotX) * dotSpeed;
        dotY += (mouseY - dotY) * dotSpeed;
        
        // Calcola la posizione per il CERCHIO (segue con ritardo)
        ringX += (mouseX - ringX) * ringSpeed;
        ringY += (mouseY - ringY) * ringSpeed;
        
        // Applica la posizione al PUNTINO
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        
        // Applica la posizione al CERCHIO
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        
        // Continua l'animazione
        requestAnimationFrame(animateCursor);
    }
    
    // Imposta la posizione iniziale fuori dallo schermo (risolve il problema del cursore bloccato)
    mouseX = -100;
    mouseY = -100;
    dotX = ringX = mouseX;
    dotY = ringY = mouseY;
    
    // Aspetta che la pagina sia completamente caricata prima di iniziare
    window.addEventListener('load', function() {
        // Piccolo ritardo per assicurarsi che tutto sia pronto
        setTimeout(() => {
            // Avvia l'animazione
            animateCursor();
            console.log('Cursore personalizzato inizializzato con successo');
        }, 500);
    });
    
    // Fallback se load event è già passato
    if (document.readyState === 'complete') {
        setTimeout(() => {
            animateCursor();
            console.log('Cursore personalizzato inizializzato con successo (fallback)');
        }, 500);
    }
}