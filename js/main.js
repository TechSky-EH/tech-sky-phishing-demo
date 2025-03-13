/**
 * Main JavaScript file for Tech Sky - Ethical Hacking Lab
 * Coordinates initialization of all components
 */
class App {
    constructor() {
        this.initLogoTypingEffect();
    }
    
    initLogoTypingEffect() {
        const logoText = "Tech Sky Lab";
        const logoElement = document.getElementById('logoText');
        logoElement.textContent = '';
        
        let i = 0;
        const typing = setInterval(() => {
            if (i < logoText.length) {
                logoElement.textContent += logoText.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 100);
    }
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
    
    // Check if anime.js is available
    if (typeof anime === 'undefined') {
        console.warn('Anime.js not loaded. Some animations may not work.');
        
        // Load anime.js dynamically if not available
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
        script.onload = () => {
            console.log('Anime.js loaded dynamically');
            
            // Add subtle button animations
            anime({
                targets: '.btn',
                scale: [1, 1.02, 1],
                duration: 2000,
                easing: 'easeInOutQuad',
                loop: true
            });
        };
        document.head.appendChild(script);
    } else {
        // Add subtle button animations
        anime({
            targets: '.btn',
            scale: [1, 1.02, 1],
            duration: 2000,
            easing: 'easeInOutQuad',
            loop: true
        });
    }
});