// Função para aplicar o tema salvo no localStorage
function applyTheme() {
    const darkMode = localStorage.getItem('darkMode') === 'dark';
    if (darkMode) {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
    }
    // Atualizar checkbox se existir
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.checked = darkMode;
    }
}

// Função para alternar o tema
function toggleTheme(isDark) {
    localStorage.setItem('darkMode', isDark ? 'dark' : 'light');
    applyTheme();
}

// Aplicar tema ao carregar a página
document.addEventListener('DOMContentLoaded', applyTheme);

// Exportar funções para uso global
window.themeManager = {
    applyTheme,
    toggleTheme
};