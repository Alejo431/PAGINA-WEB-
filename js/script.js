// ========== js/script.js ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== IDIOMA =====
    const langBtn = document.getElementById('langToggle');
    let isSpanish = true;
    
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            isSpanish = !isSpanish;
            const h1Span = document.querySelector('.hero-highlight');
            const heroSub = document.querySelector('.hero-sub');
            const cotizarBtn = document.getElementById('cotizarBtn');
            
            if (isSpanish) {
                h1Span.innerText = '"Creamos páginas web que venden"';
                heroSub.innerText = '"Automatizamos tu negocio con tecnología"';
                cotizarBtn.innerText = '🔥 QUIERO MI PÁGINA WEB';
                langBtn.innerText = 'ES / EN';
            } else {
                h1Span.innerText = '"We build websites that sell"';
                heroSub.innerText = '"Automate your business with tech"';
                cotizarBtn.innerText = '🔥 I WANT MY WEBSITE';
                langBtn.innerText = 'EN / ES';
            }
        });
    }
    
    // ===== FORMULARIO =====
    const form = document.getElementById('contactForm');
    const thankYouDiv = document.getElementById('thankyouMessage');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    form.style.display = 'none';
                    thankYouDiv.style.display = 'block';
                    
                    setTimeout(() => {
                        form.style.display = 'block';
                        thankYouDiv.style.display = 'none';
                        form.reset();
                    }, 7000);
                } else {
                    alert('Error al enviar el mensaje. Intenta de nuevo.');
                }
            } catch (error) {
                alert('Error de conexión: ' + error.message);
            }
        });
    }
    
    // ===== SCROLL REVEAL =====
    const reveals = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        for (let el of reveals) {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;
            
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        }
    }
    
    window.addEventListener('scroll', checkReveal);
    window.addEventListener('resize', checkReveal);
    checkReveal();
    
    // ===== BOTÓN COTIZAR =====
    const cotizarBtn = document.getElementById('cotizarBtn');
    if (cotizarBtn) {
        cotizarBtn.addEventListener('click', () => {
            const contactoSection = document.getElementById('contacto');
            if (contactoSection) {
                contactoSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // ===== MENÚ SUAVE =====
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});