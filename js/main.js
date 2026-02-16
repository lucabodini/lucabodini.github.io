// ============================================
// MAIN JAVASCRIPT - VERSIONE COMPLETA
// ============================================

const STARTUP_LOADER_KEY = 'lb_startup_loader_seen_v4';

initStartupLoader();

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

    // Aggiungi questa funzione dopo le altre inizializzazioni
    initVideoScrollEffect();
});

function initStartupLoader() {
    const body = document.body;
    if (!body) return;

    const hasSeenLoader = (() => {
        try {
            return sessionStorage.getItem(STARTUP_LOADER_KEY) === '1';
        } catch (error) {
            return false;
        }
    })();

    let loader = document.querySelector('.startup-loader');

    if (hasSeenLoader) {
        body.classList.remove('loader-active');
        body.classList.add('loader-done');
        if (loader) loader.remove();
        return;
    }

    body.classList.remove('loader-done');
    body.classList.add('loader-active');

    if (!loader) {
        loader = document.createElement('div');
        loader.className = 'startup-loader';
        loader.setAttribute('aria-hidden', 'true');
        loader.innerHTML = `
            <div class="startup-loader__inner">
                <div class="lb-loader" role="img" aria-label="LB loader">
                    <img src="assets/images/lb.png" alt="LB logo" class="lb-loader__logo lb-loader__logo--base">
                    <img src="assets/images/lb.png" alt="" aria-hidden="true" class="lb-loader__logo lb-loader__logo--sweep">
                    <span class="lb-loader__scan" aria-hidden="true"></span>
                </div>
            </div>
        `;
        body.prepend(loader);
    }

    try {
        sessionStorage.setItem(STARTUP_LOADER_KEY, '1');
    } catch (error) {
        // Ignore storage access errors.
    }

    let finished = false;
    const startTime = performance.now();
    const minDuration = 2000;

    const pinNavbarLogo = () => {
        const logoLink = document.querySelector('.logo a');
        if (!logoLink || logoLink.querySelector('.logo-image--pinned')) return;

        const pinnedLogo = document.createElement('img');
        pinnedLogo.src = 'assets/images/lb.png';
        pinnedLogo.alt = 'Luca Bodini Logo';
        pinnedLogo.className = 'logo-image logo-image--pinned';
        logoLink.appendChild(pinnedLogo);
        body.classList.add('loader-logo-pinned');
    };

    const finalizeLoader = () => {
        pinNavbarLogo();
        body.classList.add('loader-done');
        body.classList.remove('loader-active');
        body.classList.remove('loader-exiting');

        setTimeout(() => {
            loader.remove();
        }, 220);
    };

    const runLoaderExitAnimation = () => {
        const movingLogo = loader.querySelector('.lb-loader');
        const targetLogo = document.querySelector('.logo-image');

        if (!movingLogo || !targetLogo) {
            finalizeLoader();
            return;
        }

        const from = movingLogo.getBoundingClientRect();
        const to = targetLogo.getBoundingClientRect();

        const deltaX = (to.left + (to.width / 2)) - (from.left + (from.width / 2));
        const deltaY = (to.top + (to.height / 2)) - (from.top + (from.height / 2));
        const scale = Math.max(0.16, Math.min(0.36, to.width / from.width));

        loader.style.setProperty('--loader-exit-x', `${deltaX}px`);
        loader.style.setProperty('--loader-exit-y', `${deltaY}px`);
        loader.style.setProperty('--loader-exit-scale', `${scale}`);

        body.classList.add('loader-exiting');
        loader.classList.add('startup-loader--to-corner');

        setTimeout(finalizeLoader, 900);
    };

    const finishLoader = () => {
        if (finished) return;
        finished = true;
        runLoaderExitAnimation();
    };

    const completeWithMinDuration = () => {
        const elapsed = performance.now() - startTime;
        const waitTime = Math.max(0, minDuration - elapsed);
        setTimeout(finishLoader, waitTime);
    };

    if (document.readyState === 'complete') {
        completeWithMinDuration();
    } else {
        window.addEventListener('load', completeWithMinDuration, { once: true });
    }

    setTimeout(finishLoader, 5000);
}

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

function initVideoScrollEffect() {
    const videoBg = document.querySelector('.video-background');
    
    if (!videoBg) {
        console.log('Video background non trovato');
        return;
    }
    
    console.log('Video background trovato, inizializzo effetto scroll...');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Calcola opacità: 1 (100%) in alto, 0.3 (30%) dopo aver scrollato una viewport
        let opacity = 1 - (scrollY / windowHeight);
        
        // Limita tra 0.3 e 1
        opacity = Math.max(0.3, Math.min(1, opacity));
        
        // Applica al video background
        videoBg.style.opacity = opacity;
    });
    
    // Trigger iniziale
    window.dispatchEvent(new Event('scroll'));
}
