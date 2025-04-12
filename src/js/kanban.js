// DOM Elements
const createTaskBtn = document.getElementById('createTaskBtn');
const taskModal = document.getElementById('taskModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelTaskBtn = document.getElementById('cancelTaskBtn');
const taskForm = document.getElementById('taskForm');
const enableTimer = document.getElementById('enableTimer');
const timerSection = document.getElementById('timerSection');
const taskDetailModal = document.getElementById('taskDetailModal');
const closeDetailModalBtn = document.getElementById('closeDetailModalBtn');

// Task columns
const todoTasks = document.getElementById('todo-tasks');
const progressTasks = document.getElementById('progress-tasks');
const doneTasks = document.getElementById('done-tasks');

// Count elements
const todoCount = document.getElementById('todo-count');
const progressCount = document.getElementById('progress-count');
const doneCount = document.getElementById('done-count');

// Timer variables
let timerInterval;
let currentTaskId = null;
let timerRunning = false;
let remainingTime = 0;

// Initialize tasks array
let tasks = [];

// Load tasks from localStorage
function loadTasksFromStorage() {
    const savedTasks = localStorage.getItem('kanbanTasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    renderTasks();
    updateCounts();
}

// Save tasks to localStorage
function saveTasksToStorage() {
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
}

// Initialize the board
function initBoard() {
    loadTasksFromStorage();
}

// Render all tasks
function renderTasks() {
    // Clear all columns
    todoTasks.innerHTML = '';
    progressTasks.innerHTML = '';
    doneTasks.innerHTML = '';
    
    // Render each task in the appropriate column
    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        
        switch(task.status) {
            case 'todo':
                todoTasks.appendChild(taskElement);
                break;
            case 'progress':
                progressTasks.appendChild(taskElement);
                break;
            case 'done':
                doneTasks.appendChild(taskElement);
                break;
        }
    });
}

// Create a task card element
function createTaskElement(task) {
    const priorityClasses = {
        low: 'bg-green-100 text-green-800',
        medium: 'bg-yellow-100 text-yellow-800',
        high: 'bg-red-100 text-red-800'
    };
    
    const taskElement = document.createElement('div');
    taskElement.className = 'task-card bg-white p-4 rounded-lg shadow cursor-pointer';
    taskElement.dataset.id = task.id;
    
    taskElement.innerHTML = `
        <div class="flex justify-between items-start">
            <h3 class="font-medium text-gray-800">${task.title}</h3>
            <span class="text-xs px-2 py-1 rounded-full ${priorityClasses[task.priority]}">${getPriorityText(task.priority)}</span>
        </div>
        ${task.description ? `<p class="text-sm text-gray-600 mt-2">${task.description.substring(0, 60)}${task.description.length > 60 ? '...' : ''}</p>` : ''}
        ${task.timer.enabled ? `<div class="mt-3 flex items-center text-xs text-gray-500">
            <i class="fas fa-clock mr-1"></i>
            <span>${formatTime(task.timer.hours)}:${formatTime(task.timer.minutes)}:${formatTime(task.timer.seconds)}</span>
        </div>` : ''}
    `;
    
    taskElement.addEventListener('click', () => openTaskDetail(task.id));
    
    return taskElement;
}

// Format time to two digits
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Get priority text
function getPriorityText(priority) {
    const priorityText = {
        low: 'Baixa',
        medium: 'Média',
        high: 'Alta'
    };
    return priorityText[priority];
}

// Função para obter a classe CSS correspondente à prioridade
function getPriorityClass(priority) {
    const priorityClasses = {
        low: 'bg-green-100 text-green-800',
        medium: 'bg-yellow-100 text-yellow-800',
        high: 'bg-red-100 text-red-800'
    };
    return priorityClasses[priority] || '';
}

// Função para abrir os detalhes de uma tarefa
function openTaskDetail(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    // Preencher os detalhes da tarefa no modal
    document.getElementById('detailTitle').textContent = task.title;
    document.getElementById('detailDescription').textContent = task.description || 'Sem descrição';
    const priorityElement = document.getElementById('detailPriority');
    priorityElement.textContent = getPriorityText(task.priority);
    priorityElement.className = `inline-block px-2 py-1 text-xs font-medium rounded-full ${getPriorityClass(task.priority)}`;

    // Exibir o modal de detalhes
    document.getElementById('taskDetailModal').classList.remove('hidden');
}

// Update task counts
function updateCounts() {
    const todo = tasks.filter(task => task.status === 'todo').length;
    const progress = tasks.filter(task => task.status === 'progress').length;
    const done = tasks.filter(task => task.status === 'done').length;
    
    todoCount.textContent = todo;
    progressCount.textContent = progress;
    doneCount.textContent = done;
}

// Consolidar funções de manipulação de modal
function toggleModal(modal, show) {
    if (show) {
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
    } else {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
    }
}

// Substituir chamadas repetitivas por toggleModal
createTaskBtn.addEventListener('click', () => {
    toggleModal(taskModal, true);
});

closeModalBtn.addEventListener('click', () => {
    toggleModal(taskModal, false);
});

cancelTaskBtn.addEventListener('click', () => {
    toggleModal(taskModal, false);
});

closeDetailModalBtn.addEventListener('click', () => {
    toggleModal(taskDetailModal, false);
});

// Close modals
function closeModals() {
    taskModal.classList.add('hidden');
    taskDetailModal.classList.add('hidden');
    taskForm.reset();
    timerSection.classList.add('hidden');
    enableTimer.checked = false;
}

// Adicionando logs para verificar se os eventos dos botões do modal estão sendo atribuídos corretamente
closeModalBtn.addEventListener('click', () => {
    console.log('Botão de fechar modal clicado');
    closeModals();
});

cancelTaskBtn.addEventListener('click', () => {
    console.log('Botão de cancelar tarefa clicado');
    closeModals();
});

closeDetailModalBtn.addEventListener('click', () => {
    console.log('Botão de fechar detalhes do modal clicado');
    closeModals();
});

// Forçar a exibição do timerSection ao remover a classe 'hidden'
enableTimer.addEventListener('change', () => {
    console.log('Checkbox enableTimer mudou:', enableTimer.checked);
    if (enableTimer.checked) {
        timerSection.classList.remove('hidden');
        timerSection.style.display = 'block'; // Força a exibição
        console.log('Classe hidden removida de timerSection:', !timerSection.classList.contains('hidden'));
    } else {
        timerSection.classList.add('hidden');
        timerSection.style.display = 'none'; // Força a ocultação
        console.log('Classe hidden adicionada a timerSection:', timerSection.classList.contains('hidden'));
    }
});

// Adicionando logs para verificar os dados do timer ao criar uma tarefa
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const priority = document.getElementById('taskPriority').value;
    const timerEnabled = enableTimer.checked;

    const newTask = {
        id: Date.now(),
        title,
        description,
        priority,
        status: 'todo',
        timer: {
            enabled: timerEnabled
        }
    };

    if (timerEnabled) {
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;

        newTask.timer.hours = hours;
        newTask.timer.minutes = minutes;
        newTask.timer.seconds = seconds;
        newTask.timer.remaining = (hours * 3600) + (minutes * 60) + seconds;

        console.log('Timer configurado para a nova tarefa:', newTask.timer);
    } else {
        console.log('Timer não habilitado para a nova tarefa.');
    }

    tasks.push(newTask);
    saveTasksToStorage(); // Salva após adicionar nova tarefa
    renderTasks();
    updateCounts();
    closeModals();
});

// Task movement buttons
function moveTaskToStatus(status) {
    const taskIndex = tasks.findIndex(t => t.id == currentTaskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].status = status;
        saveTasksToStorage(); // Salva após mover a tarefa
        renderTasks();
        updateCounts();
        closeModals();
    }
}

// Delete task
document.getElementById('deleteTaskBtn').addEventListener('click', () => {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        tasks = tasks.filter(t => t.id != currentTaskId);
        saveTasksToStorage(); // Salva após deletar a tarefa
        renderTasks();
        updateCounts();
        closeModals();
    }
});

// Adicionando eventos para os botões do modal de detalhes da tarefa
const moveToTodoBtn = document.getElementById('moveToTodoBtn');
const moveToProgressBtn = document.getElementById('moveToProgressBtn');
const moveToDoneBtn = document.getElementById('moveToDoneBtn');
const deleteTaskBtn = document.getElementById('deleteTaskBtn');

moveToTodoBtn.addEventListener('click', () => {
    console.log('Botão "A Fazer" clicado');
    moveTaskToStatus('todo');
});

moveToProgressBtn.addEventListener('click', () => {
    console.log('Botão "Em Progresso" clicado');
    moveTaskToStatus('progress');
});

moveToDoneBtn.addEventListener('click', () => {
    console.log('Botão "Concluir" clicado');
    moveTaskToStatus('done');
});

deleteTaskBtn.addEventListener('click', () => {
    console.log('Botão "Excluir" clicado');
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        tasks = tasks.filter(t => t.id != currentTaskId);
        saveTasksToStorage(); // Salva após deletar a tarefa
        renderTasks();
        updateCounts();
        closeModals();
    }
});

// Atualizando a lógica para iniciar o timer e mover o card para "Em Progresso"
const startTimerBtn = document.getElementById('startTimerBtn');
startTimerBtn.addEventListener('click', () => {
    console.log('Botão "Iniciar Timer" clicado');
    moveTaskToStatus('progress');
    // Aqui você pode adicionar a lógica para iniciar o timer
});

// Adicionar eventos para fechar o modal corretamente
closeModalBtn.addEventListener('click', () => {
    toggleModal(taskModal, false);
});

cancelTaskBtn.addEventListener('click', () => {
    toggleModal(taskModal, false);
});

closeDetailModalBtn.addEventListener('click', () => {
    toggleModal(taskDetailModal, false);
});

// Garantir que o modal seja fechado ao clicar fora dele
window.addEventListener('click', (event) => {
    if (event.target === taskModal) {
        toggleModal(taskModal, false);
    }
    if (event.target === taskDetailModal) {
        toggleModal(taskDetailModal, false);
    }
});

// Initialize the board
initBoard();

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('change', () => {


      themeManager.toggleTheme(darkModeToggle.checked);
});

// Adicionar controle de sidebar
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.sidebar');

if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
    
      // Opcional: salvar o estado do sidebar no localStorage
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

// Toggle sidebar
const toggleSidebar = document.getElementById('toggleSidebar');
const content = document.querySelector('.content');

if (toggleSidebar && sidebar && content) {
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
}