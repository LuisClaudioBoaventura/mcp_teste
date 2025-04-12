// Toggle password visibility
const passwordInput = document.getElementById('password');
const togglePassword = document.querySelector('[type="button"]');

togglePassword.addEventListener('click', function() {
    const icon = this.querySelector('i');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    } else {
        passwordInput.type = 'password';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    }
});

// Form submission with validation
const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === 'luizinboaventura@gmail.com' && password === 'admin') {
        // Save login state
        localStorage.setItem('isLoggedIn', 'true');
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert('Email ou senha incorretos!');
    }
}); 