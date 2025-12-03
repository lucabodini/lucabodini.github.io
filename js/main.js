// ============================================
// MAIN JAVASCRIPT - VERSIONE FINALE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Sito Luca Bodini - Inizializzazione...');
    
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

// Menu mobile
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Chiudi menu al click sui link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// FAQ accordion
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
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

// Filtri progetti
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

// Video background con fallback
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

// Smooth scrolling per anchor links
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