// ========== script.js ==========
// TODAS LAS FUNCIONALIDADES EN UN SOLO ARCHIVO

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== 1. SISTEMA DE IDIOMA (ES/EN) =====
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
    
    // ===== 2. FORMULARIO FORMSPREE + MENSAJE ANIMADO =====
    const form = document.getElementById('contactForm');
    const thankYouDiv = document.getElementById('thankyouMessage');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evita la recarga de la página
            
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
                    // Ocultar formulario y mostrar mensaje de éxito
                    form.style.display = 'none';
                    thankYouDiv.style.display = 'block';
                    
                    // Después de 7 segundos, restaurar formulario
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
    
    // ===== 3. SCROLL REVEAL (animación al hacer scroll) =====
    const reveals = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        for (let el of reveals) {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100; // Píxeles antes de activar
            
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        }
    }
    
    // Ejecutar al cargar y al hacer scroll
    window.addEventListener('scroll', checkReveal);
    window.addEventListener('resize', checkReveal);
    checkReveal(); // Ejecutar inmediatamente
    
    // ===== 4. BOTÓN COTIZAR (scroll suave a contacto) =====
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
    
    // ===== 5. ANIMACIÓN EXTRA PARA MENÚ (click suave) =====
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
    
    // ===== 6. EFECTO DE PARTÍCULAS DINÁMICAS (opcional - más movimiento) =====
    // Pequeño efecto para que las cards tengan movimiento adicional con el mouse
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    console.log('🚀 Página cargada con todas las animaciones!');
});
// ===== CHATBOT FUNCIONAL =====
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del chatbot
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');

    // Base de conocimientos del bot
    const botKnowledge = {
        'hola': '¡Hola! Soy AlejoBot 🤖 ¿En qué puedo ayudarte?',
        'buenas': '¡Buenas! ¿Cómo estás? Cuéntame qué necesitas',
        'precio': 'Nuestros precios son:\n💰 Básico: $100K COP\n💎 Pro: $250K COP\n🚀 Empresa: $450K COP\n¿Cuál te interesa?',
        'precios': 'Nuestros precios son:\n💰 Básico: $100K COP\n💎 Pro: $250K COP\n🚀 Empresa: $450K COP\n¿Cuál te interesa?',
        'costo': 'Los precios inician desde $100.000 COP. Dime qué tipo de página necesitas y te doy un precio exacto',
        'servicio': 'Ofrecemos:\n• Páginas web económicas\n• Automatización de negocios\n• Formularios profesionales\n• Landing pages\n• Portafolios',
        'servicios': 'Ofrecemos:\n• Páginas web económicas\n• Automatización de negocios\n• Formularios profesionales\n• Landing pages\n• Portafolios',
        'pagina': 'Creamos páginas web profesionales y 100% responsive. ¿Para qué tipo de negocio es? (barbería, emprendimiento, local, etc)',
        'web': 'Creamos páginas web profesionales y 100% responsive. ¿Para qué tipo de negocio es?',
        'automatizacion': 'Automatizamos procesos de tu negocio: reservas, facturación, emails automáticos, chatbots y más. ¿Qué necesitas automatizar?',
        'contacto': 'Puedes contactar a Alejandro:\n📱 WhatsApp: 3001562405\n📸 IG: @alejandromonsalve_g\n💻 GitHub: Alejo431\n✉️ O usa el formulario de contacto',
        'whatsapp': 'Aquí tienes el link directo a WhatsApp: https://wa.me/573001562405',
        'gracias': '¡A ti por contactarnos! 🚀 ¿Necesitas algo más?',
        'adios': '¡Hasta luego! Que tengas un excelente día. Si necesitas algo más, aquí estoy 🤖',
        'chao': '¡Chao! Vuelve pronto ⚡',
        'barberia': '¡Perfecto para barberías! Podemos incluir sistema de reservas, catálogo de servicios y galería de cortes. Precio especial desde $120K',
        'restaurante': 'Para restaurantes tenemos menú digital, sistema de pedidos online y reservas. ¿Te interesa?',
        'tienda': 'Tienda online con carrito de compras, pasarela de pagos y catálogo de productos. Desde $250K',
        'default': 'No entendí bien. Puedes preguntarme sobre:\n💰 Precios\n🛠️ Servicios\n📞 Contacto\n🤖 Automatización\nO escribe "hola" para empezar'
    };

    // Abrir chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.add('active');
        // Ocultar notificación
        document.querySelector('.chatbot-notification').style.display = 'none';
    });

    // Cerrar chatbot
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });

    // Enviar mensaje
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message === '') return;

        // Mostrar mensaje del usuario
        addMessage(message, true);
        chatbotInput.value = '';

        // Mostrar "escribiendo..."
        showTypingIndicator();

        // Respuesta del bot después de 1 segundo
        setTimeout(() => {
            removeTypingIndicator();
            const response = getBotResponse(message);
            addMessage(response, false);
        }, 1000);
    }

    // Agregar mensaje al chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        
        if (!isUser) {
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'message-avatar';
            avatarDiv.innerHTML = '<i class="fas fa-robot"></i>';
            messageDiv.appendChild(avatarDiv);
        }
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        // Formatear texto con saltos de línea
        const formattedText = text.replace(/\n/g, '<br>');
        contentDiv.innerHTML = formattedText;
        
        messageDiv.appendChild(contentDiv);
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll al último mensaje
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Mostrar indicador de escribiendo
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing-indicator';
        typingDiv.id = 'typingIndicator';
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = '<i class="fas fa-robot"></i>';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
        
        typingDiv.appendChild(avatarDiv);
        typingDiv.appendChild(contentDiv);
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Quitar indicador de escribiendo
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Obtener respuesta del bot
    function getBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Buscar coincidencias en el conocimiento del bot
        for (let key in botKnowledge) {
            if (message.includes(key)) {
                return botKnowledge[key];
            }
        }
        
        // Respuesta por defecto
        return botKnowledge['default'];
    }

    // Event listeners
    chatbotSend.addEventListener('click', sendMessage);
    
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Sugerencias de preguntas
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const suggestion = btn.textContent;
            chatbotInput.value = suggestion;
            sendMessage();
        });
    });

    // Cerrar al hacer clic fuera (opcional)
    document.addEventListener('click', (e) => {
        if (!chatbotContainer.contains(e.target) && chatbotWindow.classList.contains('active')) {
            chatbotWindow.classList.remove('active');
        }
    });

    // Mensaje de bienvenida después de 10 segundos
    setTimeout(() => {
        if (!chatbotWindow.classList.contains('active')) {
            // Mostrar notificación
            const notification = document.querySelector('.chatbot-notification');
            if (notification) {
                notification.style.display = 'flex';
            }
        }
    }, 10000);
});