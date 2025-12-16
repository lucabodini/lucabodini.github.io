// ============================================
// MAIN JAVASCRIPT - VERSIONE COMPLETA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Sito Luca Bodini - Inizializzazione...');
    
    // Controllo per dispositivi touch
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.documentElement.classList.add('touch-device');
        console.log('Dispositivo touch rilevato');
    }
    
    // Inizializza il menu mobile
    initMobileMenu();
    
    // Inizializza FAQ accordion
    initFAQAccordion();
    
    // Inizializza filtri progetti
    initProjectFilter();
    
    // Gestione video background
    initVideoBackground();
    
    // Smooth scrolling per anchor links
    initSmoothScrolling();
    
    // Effetto fade in al caricamento
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// MENU MOBILE CON OVERLAY
// ============================================

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;
    
    if (!hamburger || !navMenu) return;
    
    function openMenu() {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        if (menuOverlay) menuOverlay.classList.add('active');
        body.classList.add('menu-open');
    }
    
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    }
    
    function toggleMenu() {
        if (navMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Chiudi menu cliccando sui link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    // Chiudi menu cliccando sull'overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            closeMenu();
        });
    }
    
    // Chiudi menu con tasto ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

// ============================================
// FAQ ACCORDION
// ============================================

function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Chiudi altri item aperti
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Apri/chiudi item corrente
            item.classList.toggle('active');
        });
    });
}

// ============================================
// FILTRI PROGETTI
// ============================================

function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card[data-category]');
    
    if (!filterButtons.length || !projectCards.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Rimuovi active da tutti i bottoni
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Aggiungi active al bottone cliccato
            this.classList.add('active');
            
            // Ottieni categoria da filtrare
            const filterValue = this.getAttribute('data-filter');
            
            // Filtra progetti
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(',');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// VIDEO BACKGROUND
// ============================================

function initVideoBackground() {
    const video = document.getElementById('hero-video');
    if (!video) return;
    
    video.addEventListener('error', function() {
        console.log('Errore nel caricamento del video, attivo fallback...');
        const fallbackImg = this.querySelector('img');
        if (fallbackImg) {
            this.style.display = 'none';
            fallbackImg.style.display = 'block';
        }
    });
    
    // Prova a far partire il video
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Autoplay bloccato, uso il fallback:', error);
            video.poster = 'assets/images/hero-fallback.jpg';
            video.load();
        });
    }
}

// ============================================
// SMOOTH SCROLLING
// ============================================

function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}