// ============================================
// CUSTOM CURSOR - VERSIONE OTTIMIZZATA CON FIX POSIZIONE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Controlla se è un dispositivo touch - se sì, disabilita il cursore personalizzato
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        console.log('Dispositivo touch rilevato - cursore personalizzato disabilitato');
        
        // Aggiungi classe per CSS fallback
        document.documentElement.classList.add('touch-device');
        document.documentElement.classList.add('cursor-fallback');
        
        return;
    }
    
    console.log('Inizializzazione cursore personalizzato...');
    
    // Crea gli elementi del cursore
    const cursorDot = document.createElement('div');
    const cursorRing = document.createElement('div');
    
    cursorDot.className = 'cursor-dot';
    cursorRing.className = 'cursor-ring';
    
    // Nascondi inizialmente per evitare flash
    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';
    
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);
    
    // Coordinate del mouse - inizializza con posizione centrale
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX; // INIZIALIZZA ALLA STESSA POSIZIONE
    let ringY = mouseY; // INIZIALIZZA ALLA STESSA POSIZIONE
    
    // Stato del cursore
    let isPointer = false;
    let isHidden = true; // Inizia nascosto
    
    // Velocità di interpolazione
    const ringSpeed = 0.15;
    
    // Inizializza subito le posizioni
    function initializeCursorPosition() {
        // Centra il puntino
        cursorDot.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
        
        // Centra l'anello - PARTE GIÀ NELLA POSIZIONE CORRETTA
        cursorRing.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0) scale(1)`;
        
        // Mostra gradualmente
        setTimeout(() => {
            cursorDot.style.opacity = '1';
            cursorRing.style.opacity = '1';
            isHidden = false;
        }, 50);
    }
    
    // Aggiorna la posizione del puntino
    function updateDotPosition(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Centra il puntino (6px / 2 = 3px)
        cursorDot.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
        
        // Se era nascosto, mostra
        if (isHidden) {
            cursorDot.style.opacity = '1';
            cursorRing.style.opacity = '1';
            isHidden = false;
        }
    }
    
    // Animazione fluida per l'anello
    function animateRing() {
        // Solo se non è nascosto
        if (!isHidden) {
            // Interpolazione per movimento fluido dell'anello
            ringX += (mouseX - ringX) * ringSpeed;
            ringY += (mouseY - ringY) * ringSpeed;
            
            // Centra l'anello (36px / 2 = 18px)
            cursorRing.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0) scale(${isPointer ? 1.5 : 1})`;
        }
        
        // Richiama la prossima frame
        requestAnimationFrame(animateRing);
    }
    
    // Gestisci il movimento del mouse
    function handleMouseMove(e) {
        updateDotPosition(e);
    }
    
    // Nascondi il cursore quando il mouse esce dalla finestra
    function handleMouseLeave() {
        cursorDot.style.opacity = '0';
        cursorRing.style.opacity = '0';
        isHidden = true;
    }
    
    // Mostra il cursore quando il mouse rientra
    function handleMouseEnter(e) {
        // Aggiorna la posizione prima di mostrare
        mouseX = e.clientX;
        mouseY = e.clientY;
        ringX = mouseX; // Sincronizza subito l'anello
        ringY = mouseY;
        
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
        isHidden = false;
        
        // Aggiorna immediatamente la posizione
        cursorDot.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
        cursorRing.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0) scale(${isPointer ? 1.5 : 1})`;
    }
    
    // Rileva quando il mouse è su elementi cliccabili
    function handleMouseOver(e) {
        const target = e.target;
        const isClickable = target.matches('a, button, .cta-button, input, textarea, select, [role="button"], .nav-link, .project-link');
        
        if (isClickable) {
            isPointer = true;
        }
    }
    
    // Rileva quando il mouse esce da elementi cliccabili
    function handleMouseOut(e) {
        const target = e.target;
        const isClickable = target.matches('a, button, .cta-button, input, textarea, select, [role="button"], .nav-link, .project-link');
        
        if (isClickable) {
            isPointer = false;
        }
    }
    
    // Inizializza subito il cursore
    initializeCursorPosition();
    
    // Inizializza gli event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    
    // Track mouse position anche durante le transizioni di pagina
    document.addEventListener('mousemove', function(e) {
        // Salva l'ultima posizione in sessionStorage per le transizioni
        try {
            sessionStorage.setItem('cursorX', e.clientX);
            sessionStorage.setItem('cursorY', e.clientY);
        } catch (e) {
            // Ignora errori di storage
        }
    });
    
    // Prova a recuperare l'ultima posizione nota del cursore
    try {
        const savedX = sessionStorage.getItem('cursorX');
        const savedY = sessionStorage.getItem('cursorY');
        
        if (savedX && savedY) {
            mouseX = parseInt(savedX);
            mouseY = parseInt(savedY);
            ringX = mouseX;
            ringY = mouseY;
            
            // Aggiorna immediatamente
            cursorDot.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
            cursorRing.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0) scale(1)`;
        }
    } catch (e) {
        // Ignora errori di storage
    }
    
    // Disabilita il cursore di default
    document.addEventListener('mouseover', function(e) {
        e.target.style.cursor = 'none';
    });
    
    // Inizia l'animazione
    animateRing();
    
    // Cleanup al cambio pagina
    window.addEventListener('beforeunload', function() {
        // Salva l'ultima posizione
        try {
            sessionStorage.setItem('cursorX', mouseX);
            sessionStorage.setItem('cursorY', mouseY);
        } catch (e) {
            // Ignora errori
        }
    });
    
    console.log('Cursore personalizzato inizializzato con successo');
});