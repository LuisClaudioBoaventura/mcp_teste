export function initSidebar() {
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.sidebar');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      
      // Salvar o estado do sidebar no localStorage
      const isCollapsed = sidebar.classList.contains('collapsed');
      localStorage.setItem('sidebarCollapsed', isCollapsed);
    });
    
    // Restaurar o estado do sidebar ao carregar a página
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState === 'true') {
      sidebar.classList.add('collapsed');
    } else if (savedState === 'false') {
      sidebar.classList.remove('collapsed');
    }
  }

}export function initSidebar() {
  const sidebarToggle = document.getElementById('sidebarToggle')
  const sidebar = document.querySelector('.sidebar')

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed')
      
      // Salvar o estado do sidebar no localStorage
      const isCollapsed = sidebar.classList.contains('collapsed')
      localStorage.setItem('sidebarCollapsed', isCollapsed)
    })
    
    // Restaurar o estado do sidebar ao carregar a página
    const savedState = localStorage.getItem('sidebarCollapsed')
    if (savedState === 'true') {
      sidebar.classList.add('collapsed')
    } else if (savedState === 'false') {
      sidebar.classList.remove('collapsed')
    }
  }
}





  const sidebarStyles = {
    width: '250px',
    transition: 'width 0.3s ease'
  };



  const sidebarCollapsedStyles = {
    width: '60px'
  }
  /* Ajuste para o conteúdo principal quando o sidebar colapsa */

  const mainContentStyles = {
    marginLeft: '250px',
    transition: 'margin-left 0.3s ease'
  }

  // Ensure the CSS for '.sidebar.collapsed + .main-content' is moved to a CSS file.
import { initSidebar } from './sidebar.js'

// Resto do código da página
document.addEventListener('DOMContentLoaded', () => {
  initSidebar()
  // Outras inicializações

})

// Exemplo de estrutura HTML que deve estar presente em ambas as páginas
const sidebarToggleButton = `
<button id="sidebarToggle" class="sidebar-toggle">
  <i class="fas fa-bars"></i>
</button>
`

const sidebarStructure = `
<div class="sidebar">
  <!-- Conteúdo do sidebar -->
</div>
`

// Inserir a estrutura HTML no documento
document.body.insertAdjacentHTML('afterbegin', sidebarToggleButton + sidebarStructure)