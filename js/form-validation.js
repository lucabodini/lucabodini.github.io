// ============================================
// CONTACT FORM VALIDATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    // Inizializza il form
    initContactForm();
});

function initContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    // Validazione in tempo reale
    addRealTimeValidation();
}

function validateForm() {
    let isValid = true;
    
    // Reset errori precedenti
    resetErrors();
    
    // Valida nome
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    if (!nameInput.value.trim()) {
        showError(nameError, 'Il nome è obbligatorio');
        isValid = false;
    } else if (nameInput.value.trim().length < 2) {
        showError(nameError, 'Il nome deve contenere almeno 2 caratteri');
        isValid = false;
    }
    
    // Valida email
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    if (!emailInput.value.trim()) {
        showError(emailError, 'L\'email è obbligatoria');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        showError(emailError, 'Inserisci un indirizzo email valido');
        isValid = false;
    }
    
    // Valida messaggio
    const messageInput = document.getElementById('message');
    const messageError = document.getElementById('message-error');
    if (!messageInput.value.trim()) {
        showError(messageError, 'Il messaggio è obbligatorio');
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        showError(messageError, 'Il messaggio deve contenere almeno 10 caratteri');
        isValid = false;
    }
    
    // Valida checkbox privacy
    const privacyCheckbox = document.getElementById('privacy');
    const privacyError = document.getElementById('privacy-error');
    if (!privacyCheckbox.checked) {
        showError(privacyError, 'Devi accettare la privacy policy');
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(errorElement, message) {
    if (!errorElement) return;
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Aggiungi classe di errore all'input
    const inputId = errorElement.id.replace('-error', '');
    const input = document.getElementById(inputId);
    if (input) {
        input.classList.add('error');
    }
}

function resetErrors() {
    // Reset tutti gli errori
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
    
    // Reset classi errori sugli input
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    inputs.forEach(input => {
        input.classList.remove('error');
    });
    
    // Nascondi messaggi di successo/errore
    const successMsg = document.getElementById('form-success');
    const errorMsg = document.getElementById('form-error');
    if (successMsg) successMsg.style.display = 'none';
    if (errorMsg) errorMsg.style.display = 'none';
}

function addRealTimeValidation() {
    // Valida al blur (quando l'utente esce dal campo)
    const inputs = document.querySelectorAll('#name, #email, #message');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    // Valida checkbox al change
    const privacyCheckbox = document.getElementById('privacy');
    if (privacyCheckbox) {
        privacyCheckbox.addEventListener('change', function() {
            const errorElement = document.getElementById('privacy-error');
            if (this.checked && errorElement) {
                errorElement.style.display = 'none';
                this.classList.remove('error');
            }
        });
    }
}

function validateField(input) {
    const errorElement = document.getElementById(`${input.id}-error`);
    if (!errorElement) return;
    
    // Clear errori precedenti
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    input.classList.remove('error');
    
    // Non mostrare errori su campi vuoti fino al submit
    if (!input.value.trim()) return;
    
    // Validazioni specifiche
    if (input.id === 'name' && input.value.trim().length < 2) {
        showError(errorElement, 'Il nome deve avere almeno 2 caratteri');
    }
    
    if (input.id === 'email' && !isValidEmail(input.value)) {
        showError(errorElement, 'Email non valida');
    }
    
    if (input.id === 'message' && input.value.trim().length < 10) {
        showError(errorElement, 'Il messaggio è troppo breve (min. 10 caratteri)');
    }
}

async function submitForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    try {
        // Mostra stato di caricamento
        submitBtn.innerHTML = 'Invio in corso...';
        submitBtn.disabled = true;
        
        // Simula ritardo di rete
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mostra messaggio di successo
        showSuccess();
        
        // Reset form
        form.reset();
        
    } catch (error) {
        // Mostra messaggio di errore
        showErrorMsg();
    } finally {
        // Ripristina bottone
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

function showSuccess() {
    const successMsg = document.getElementById('form-success');
    if (!successMsg) return;
    
    successMsg.style.display = 'flex';
    
    // Scroll al messaggio
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Nascondi dopo 5 secondi
    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 5000);
}

function showErrorMsg() {
    const errorMsg = document.getElementById('form-error');
    if (!errorMsg) return;
    
    errorMsg.style.display = 'flex';
    
    // Scroll al messaggio
    errorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Nascondi dopo 5 secondi
    setTimeout(() => {
        errorMsg.style.display = 'none';
    }, 5000);
}