/**
 * Matrix code rain effect
 * Creates a falling code animation in the background
 */
class MatrixEffect {
    constructor() {
        this.canvas = document.getElementById('matrixCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
        this.fontSize = 14;
        this.drops = [];
        
        // Set initial canvas size
        this.resizeCanvas();
        
        // Initialize the drops array
        this.initDrops();
        
        // Set up event listeners
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Start the animation loop
        this.animate();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        
        // Reset drops when resize happens
        this.initDrops();
    }
    
    initDrops() {
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.floor(Math.random() * -100); // Random starting positions above the canvas
        }
    }
    
    draw() {
        // Semi-transparent black background to create trail effect
        this.ctx.fillStyle = 'rgba(10, 25, 41, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Set text color and font
        this.ctx.fillStyle = '#39ff14'; // Neon green
        this.ctx.font = `${this.fontSize}px monospace`;
        
        // Draw characters
        for (let i = 0; i < this.drops.length; i++) {
            // Random character
            const char = this.characters[Math.floor(Math.random() * this.characters.length)];
            
            // Draw the character
            this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);
            
            // Move the drop down
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            this.drops[i]++;
        }
    }
    
    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize matrix effect when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new MatrixEffect();
});