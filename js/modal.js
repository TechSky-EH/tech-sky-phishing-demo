/**
 * Modal functionality for subscription prompts
 */
class ModalHandler {
    constructor() {
        this.modal = document.getElementById('subscriptionModal');
        this.closeBtn = document.getElementById('modalClose');
        this.subscribeBtn = document.getElementById('subscribeBtn');
        this.laterBtn = document.getElementById('laterBtn');
        
        this.initEventListeners();
    }
    
    initEventListeners() {
        // Listen for successful login event
        document.addEventListener('login:success', () => {
            this.showModal();
        });
        
        // Close button event
        this.closeBtn.addEventListener('click', () => {
            this.hideModal();
        });
        
        // Subscribe button event
        this.subscribeBtn.addEventListener('click', () => {
            this.handleSubscription();
        });
        
        // Later button event
        this.laterBtn.addEventListener('click', () => {
            this.hideModal();
        });
    }
    
    showModal() {
        setTimeout(() => {
            this.modal.classList.add('active');
            this.createConfetti();
        }, 1000);
    }
    
    hideModal() {
        this.modal.classList.remove('active');
    }
    
    handleSubscription() {
        // Open Tech Sky YouTube channel with subscription confirmation
        window.open('https://www.youtube.com/@TechSky-EH?sub_confirmation=1', '_blank');
        this.hideModal();
    }
    
    createConfetti() {
        // Check if anime.js is loaded
        if (typeof anime === 'undefined') {
            console.error('Anime.js is required for confetti animation');
            return;
        }
        
        const colors = ['#39ff14', '#9d00ff', '#0984e3', '#f00', '#ff0'];
        const modalContainer = document.querySelector('.modal-container');
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = (Math.random() * 20 - 20) + '%';
            confetti.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
            
            // Random shape
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            } else {
                confetti.style.width = Math.random() * 5 + 5 + 'px';
                confetti.style.height = Math.random() * 5 + 5 + 'px';
            }
            
            modalContainer.appendChild(confetti);
            
            // Animate falling
            anime({
                targets: confetti,
                top: '100%',
                left: '+=' + (Math.random() * 50 - 25) + '%',
                opacity: [0, 1, 0],
                rotate: '+=' + (Math.random() * 360) + 'deg',
                duration: Math.random() * 2000 + 1000,
                delay: Math.random() * 300,
                easing: 'easeOutQuad',
                complete: function() {
                    confetti.remove();
                }
            });
        }
    }
}

// Initialize modal handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ModalHandler();
});