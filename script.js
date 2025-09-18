// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Efecto de cursor personalizado con partículas
    createCursorEffect();
    
    // Efecto de paralaje sutil en la grilla
    createParallaxEffect();
    
    // Animación de entrada escalonada
    animateElements();
    
    // Efecto de glitch ocasional en el nombre
    createGlitchEffect();
    
    // Tracking de clicks en el botón de GitHub
    trackGitHubClick();
});

// Efecto de cursor con partículas sutiles
function createCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-effect';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(20, 204, 255, 0.6), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: screen;
        transition: transform 0.1s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

// Efecto de paralaje en la grilla holográfica
function createParallaxEffect() {
    const grid = document.querySelector('.holographic-grid');
    
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        grid.style.transform = `translate(${x * 0.02}px, ${y * 0.02}px)`;
    });
}

// Animación de entrada escalonada para los elementos
function animateElements() {
    const elements = [
        { selector: '.main-title', delay: 0 },
        { selector: '.tagline', delay: 300 },
        { selector: '.cta-container', delay: 600 }
    ];
    
    elements.forEach(({ selector, delay }) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, delay);
        }
    });
}

// Efecto de glitch ocasional en el nombre
function createGlitchEffect() {
    const nameElement = document.querySelector('.name');
    if (!nameElement) return;
    
    const originalText = nameElement.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    function glitch() {
        let iterations = 0;
        const maxIterations = 10;
        
        const interval = setInterval(() => {
            nameElement.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                .join('');
            
            iterations += 1;
            
            if (iterations > maxIterations) {
                clearInterval(interval);
                nameElement.textContent = originalText;
            }
        }, 50);
    }
    
    // Ejecutar glitch ocasionalmente
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% de probabilidad cada 5 segundos
            glitch();
        }
    }, 5000);
}

// Tracking de clicks en el botón de GitHub
function trackGitHubClick() {
    const githubButton = document.querySelector('.github-button');
    if (!githubButton) return;
    
    githubButton.addEventListener('click', (e) => {
        // Efecto de ondas al hacer click
        createRippleEffect(e, githubButton);
        
        // Pequeño delay para mostrar el efecto antes de navegar
        e.preventDefault();
        setTimeout(() => {
            window.open(githubButton.href, '_blank', 'noopener,noreferrer');
        }, 200);
    });
}

// Efecto de ondas al hacer click en el botón
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    // Añadir la animación CSS si no existe
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Efecto de typing en el eslogan
function createTypingEffect() {
    const tagline = document.querySelector('.tagline');
    if (!tagline) return;
    
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.opacity = '1';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        tagline.textContent += text.charAt(i);
        i++;
        
        if (i > text.length) {
            clearInterval(typeInterval);
        }
    }, 50);
}

// Optimización de rendimiento: pausar animaciones cuando la página no está visible
document.addEventListener('visibilitychange', () => {
    const grid = document.querySelector('.holographic-grid');
    if (document.hidden) {
        grid.style.animationPlayState = 'paused';
    } else {
        grid.style.animationPlayState = 'running';
    }
});

// Detectar si el usuario prefiere movimiento reducido
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Desactivar animaciones complejas para usuarios que prefieren menos movimiento
    document.documentElement.style.setProperty('--animation-duration', '0s');
}

// Efecto de carga suave
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Inicializar efectos adicionales cuando la página esté completamente cargada
window.addEventListener('load', () => {
    // Añadir clase para indicar que la página está completamente cargada
    document.body.classList.add('loaded');
    
    // Efecto de respiración sutil en el botón después de un tiempo
    setTimeout(() => {
        const button = document.querySelector('.github-button');
        if (button) {
            button.style.animation = 'breathe 3s ease-in-out infinite';
            
            // Añadir la animación de respiración
            if (!document.querySelector('#breathe-style')) {
                const style = document.createElement('style');
                style.id = 'breathe-style';
                style.textContent = `
                    @keyframes breathe {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.02); }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }, 3000);
});

