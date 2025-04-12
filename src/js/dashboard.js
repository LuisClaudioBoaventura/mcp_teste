// Toggle dark mode
const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;

// Check for saved user preference or use system preference
if (localStorage.getItem('darkMode') === 'true' || 
    (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
    darkModeToggle.checked = true;
}

darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
        html.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
    } else {
        html.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
    }
});

// Toggle sidebar
const toggleSidebar = document.getElementById('toggleSidebar');
const sidebar = document.querySelector('.sidebar');
const content = document.querySelector('.content');

toggleSidebar.addEventListener('click', function() {
    sidebar.classList.toggle('collapsed');
    content.classList.toggle('ml-64');
    content.classList.toggle('ml-20');
});

// Responsive behavior
function handleResize() {
    if (window.innerWidth < 768) {
        sidebar.classList.add('collapsed');
        content.classList.remove('ml-64');
        content.classList.add('ml-20');
    } else {
        sidebar.classList.remove('collapsed');
        content.classList.add('ml-64');
        content.classList.remove('ml-20');
    }
}

// Initial check
handleResize();

// Add event listener
window.addEventListener('resize', handleResize);

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
} 