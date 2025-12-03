// ============================================
// TYPING ANIMATION PER HERO SUBTITLE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Array di testi da alternare
    const texts = [
        "Designer & Creative Developer",
        "Sistem administrator",
        "Studente di Informatica", 
        "Giocatore di Basket",
        "Appassionato di motori"
        
    ];
    
    // Elemento dove mostrare il testo
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (!heroSubtitle) return;
    
    // Variabili per l'animazione
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    let typingSpeed = 100; // ms per carattere in scrittura
    let deletingSpeed = 50; // ms per carattere in cancellazione
    let pauseTime = 2000; // ms di pausa tra i testi
    
    // Salva il testo originale come primo elemento
    const originalText = heroSubtitle.textContent;
    if (originalText && !texts.includes(originalText)) {
        texts[0] = originalText;
    }
    
    // Funzione principale di animazione
    function typeAnimation() {
        const currentText = texts[currentTextIndex];
        
        if (!isDeleting && !isPaused) {
            // Modalità scrittura
            heroSubtitle.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            // Se abbiamo scritto tutto il testo
            if (currentCharIndex === currentText.length) {
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                }, pauseTime);
            }
        } else if (isDeleting && !isPaused) {
            // Modalità cancellazione
            heroSubtitle.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            // Se abbiamo cancellato tutto
            if (currentCharIndex === 0) {
                isDeleting = false;
                // Passa al prossimo testo
                currentTextIndex = (currentTextIndex + 1) % texts.length;
            }
        }
        
        // Calcola la velocità per il prossimo frame
        let speed = isDeleting ? deletingSpeed : typingSpeed;
        if (isPaused) speed = pauseTime;
        
        // Chiama il prossimo frame
        setTimeout(typeAnimation, speed);
    }
    
    // Avvia l'animazione dopo un breve ritardo
    setTimeout(typeAnimation, 1000);
});