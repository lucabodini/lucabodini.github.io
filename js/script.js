// Menu toggle per mobile
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Animazioni al scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

// Osserva tutti gli elementi con classe 'hidden'
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach(el => observer.observe(el));

// Chiudi il menu quando si clicca su un link (mobile)
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
        }
    });
});

// Header che cambia al scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '0';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    }
});

// Gestione Popup Passioni
const popup = document.getElementById('popup-passione');
const closePopup = document.querySelector('.close-popup');
const popupBody = document.querySelector('.popup-body');
const passionCards = document.querySelectorAll('.passione-card');

// Dati per i popup delle passioni
const passionData = {
    basket: {
        title: "La Mia Passione per il Basket",
        image: "immagini/BasketLuca.jpg",
        description: "Il basket non è solo uno sport per me, è una vera e propria passione che coltivo da anni. Mi piace sia giocare che seguire le partite, soprattutto della NBA.",
        details: [
            {
                icon: "fas fa-basketball-ball",
                text: "Gioco a basket dal 2008"
            },
            {
                icon: "fas fa-trophy",
                text: "Seguo regolarmente la NBA"
            },
            {
                icon: "fas fa-users",
                text: "Amo lo spirito di squadra"
            }
        ],
        extra: "Quando gioco a basket, mi piace soprattutto la dinamicità del gioco e l'importanza del lavoro di squadra. È uno sport che insegna disciplina, concentrazione e collaborazione."
    },
    informatica: {
        title: "Informatica e Tecnologia",
        image: "immagini/Informatica.jpg",
        description: "L'informatica è la mia grande passione e il campo in cui voglio costruire la mia carriera. Sto studiando per diventare sistemista e mi affascina tutto ciò che riguarda la tecnologia.",
        details: [
            {
                icon: "fas fa-server",
                text: "Studio per diventare sistemista"
            },
            {
                icon: "fas fa-code",
                text: "Mi interessa lo sviluppo web"
            },
            {
                icon: "fas fa-network-wired",
                text: "Passionato di networking"
            }
        ],
        extra: "Oltre allo studio accademico, mi tengo costantemente aggiornato sulle nuove tecnologie e trend del settore. Credo che l'apprendimento continuo sia fondamentale in questo campo in continua evoluzione."
    },
    motori: {
        title: "La Passione per i Motori",
        image: "immagini/MotoLuca.jpg",
        description: "I motori sono sempre stati nel mio sangue. Dalle auto sportive alle moto, tutto ciò che ha un motore e va veloce mi affascina profondamente.",
        details: [
            {
                icon: "fas fa-flag-checkered",
                text: "Seguo Formula 1 e MotoGP"
            },
            {
                icon: "fas fa-tachometer-alt",
                text: "Appassionato di meccanica"
            },
            {
                icon: "fas fa-car",
                text: "Interessato alle auto elettriche"
            }
        ],
        extra: "Oltre a seguire le competizioni, mi interesso anche all'aspetto tecnico e ingegneristico dei veicoli. La tecnologia applicata ai motori è un campo che trovo estremamente affascinante."
    }
};

// Apri popup quando si clicca su una card passione
passionCards.forEach(card => {
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('btn-more')) {
            const passionType = card.getAttribute('data-passione');
            openPassionPopup(passionType);
        }
    });
    
    const btnMore = card.querySelector('.btn-more');
    if (btnMore) {
        btnMore.addEventListener('click', (e) => {
            e.stopPropagation();
            const passionType = card.getAttribute('data-passione');
            openPassionPopup(passionType);
        });
    }
});

// Funzione per aprire il popup con animazione
function openPassionPopup(passionType) {
    const data = passionData[passionType];
    
    let imageHtml = '';
    if (data.image) {
        imageHtml = `<img src="${data.image}" alt="${data.title}">`;
    }
    
    const detailsHtml = data.details.map(detail => `
        <div>
            <i class="${detail.icon}"></i>
            <p>${detail.text}</p>
        </div>
    `).join('');
    
    popupBody.innerHTML = `
        ${imageHtml}
        <h2>${data.title}</h2>
        <p>${data.description}</p>
        <div class="popup-details">
            ${detailsHtml}
        </div>
        <p>${data.extra}</p>
    `;
    
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Reset dell'animazione
    popup.classList.remove('closing');
}

// Chiudi popup con animazione
function closePopupWithAnimation() {
    popup.classList.add('closing');
    setTimeout(() => {
        popup.style.display = 'none';
        popup.classList.remove('closing');
        document.body.style.overflow = 'auto';
    }, 300);
}

// Chiudi popup
if (closePopup) {
    closePopup.addEventListener('click', closePopupWithAnimation);
}

// Chiudi popup cliccando fuori dal contenuto
if (popup) {
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopupWithAnimation();
        }
    });
}

// Chiudi popup con tasto ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup && popup.style.display === 'block') {
        closePopupWithAnimation();
    }
});

// Gestione form contatti
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Grazie per il tuo messaggio! Ti risponderò al più presto.');
        this.reset();
    });
}

// FUNZIONE SCROLL DOWN ARROW - VERSIONE DEFINITIVA
function initScrollArrows() {
    const scrollArrows = document.querySelectorAll('.scroll-down-arrow');
    
    scrollArrows.forEach(arrow => {
        // Rimuovi event listener esistenti
        const newArrow = arrow.cloneNode(true);
        arrow.parentNode.replaceChild(newArrow, arrow);
    });
    
    // Riacquisisci gli elementi dopo la sostituzione
    const newScrollArrows = document.querySelectorAll('.scroll-down-arrow');
    
    newScrollArrows.forEach(arrow => {
        // Click handler
        arrow.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const currentSection = this.closest('section');
            const nextSection = currentSection.nextElementSibling;
            
            if (nextSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const nextSectionTop = nextSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: nextSectionTop,
                    behavior: 'smooth'
                });
            }
            
            // Rimuovi il focus immediatamente
            setTimeout(() => {
                if (document.activeElement) {
                    document.activeElement.blur();
                }
            }, 10);
        });
        
        // Touch handler per mobile
        arrow.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const currentSection = this.closest('section');
            const nextSection = currentSection.nextElementSibling;
            
            if (nextSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const nextSectionTop = nextSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: nextSectionTop,
                    behavior: 'smooth'
                });
            }
        });
        
        // Effetto hover
        arrow.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-50%) scale(1.2)';
        });
        
        arrow.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(-50%) scale(1)';
        });
        
        // Previeni il focus con tastiera
        arrow.setAttribute('tabindex', '-1');
        arrow.style.outline = 'none';
    });
    
    // Nascondi la freccia quando si scrolla
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroSections = document.querySelectorAll('.hero, .page-hero');
        
        heroSections.forEach(heroSection => {
            const heroHeight = heroSection.offsetHeight;
            const arrow = heroSection.querySelector('.scroll-down-arrow');
            
            if (arrow) {
                if (scrollPosition > heroHeight * 0.2) {
                    arrow.style.opacity = '0';
                    arrow.style.pointerEvents = 'none';
                } else {
                    arrow.style.opacity = '1';
                    arrow.style.pointerEvents = 'auto';
                }
            }
        });
    });
}

// Inizializza le frecce quando il DOM è pronto
document.addEventListener('DOMContentLoaded', function() {
    initScrollArrows();
    
    // Reinizializza dopo un breve delay per sicurezza
    setTimeout(initScrollArrows, 100);
});

// Dark Mode functionality - VERSIONE IMMEDIATA
function initDarkMode() {
    const themeSwitch = document.querySelector('.theme-switch');
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeSwitch && themeToggle) {
        // Il checkbox è già stato impostato dallo script nell'head
        
        // Event listener per il toggle
        themeToggle.addEventListener('change', function() {
            const newTheme = this.checked ? 'dark' : 'light';
            
            // Abilita le animazioni
            themeSwitch.classList.add('animate');
            
            // Cambia tema
            window.changeTheme(newTheme);
            
            // Disabilita le animazioni dopo il completamento
            setTimeout(() => {
                themeSwitch.classList.remove('animate');
            }, 400);
        });
    }
}

// Funzione per cambiare tema
window.changeTheme = function(newTheme) {
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    window.currentTheme = newTheme;
};

// Inizializza quando il DOM è pronto
document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();
    setActiveNav();
    // ... altro codice
    // Highlight navigazione attiva
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a:not(.dark-mode-toggle a)');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
           (currentPage === '' && linkPage === 'index.html') ||
           (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}
});
