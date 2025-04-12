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

// Sample tasks (would normally come from a database)
let tasks = [
    {
        id: 1,
        title: "Projeto Kanban",
        description: "Criar um sistema de gerenciamento de tarefas estilo Kanban",
        priority: "high",
        status: "todo",
        timer: {
            enabled: true,
            hours: 0,
            minutes: 30,
            seconds: 0,
            remaining: 1800 // 30 minutes in seconds
        }
    },
    {
        id: 2,
        title: "Reunião de equipe",
        description: "Discutir progresso do projeto atual",
        priority: "medium",
        status: "progress",
        timer: {
            enabled: false
        }
    },
    {
        id: 3,
        title: "Documentação",
        description: "Escrever documentação do sistema",
        priority: "low",
        status: "done",
        timer: {
            enabled: false
        }
    }
];

// Initialize the board
function initBoard() {
    renderTasks();
    updateCounts();
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

// Update task counts
function updateCounts() {
    const todo = tasks.filter(task => task.status === 'todo').length;
    const progress = tasks.filter(task => task.status === 'progress').length;
    const done = tasks.filter(task => task.status === 'done').length;
    
    todoCount.textContent = todo;
    progressCount.textContent = progress;
    doneCount.textContent = done;
}

// Open create task modal
createTaskBtn.addEventListener('click', () => {
    taskModal.classList.remove('hidden');
});

// Close modals
function closeModals() {
    taskModal.classList.add('hidden');
    taskDetailModal.classList.add('hidden');
    taskForm.reset();
    timerSection.classList.add('hidden');
    enableTimer.checked = false;
}

// Close modal buttons
closeModalBtn.addEventListener('click', closeModals);
cancelTaskBtn.addEventListener('click', closeModals);
closeDetailModalBtn.addEventListener('click', closeModals);

// Toggle timer section
enableTimer.addEventListener('change', () => {
    if (enableTimer.checked) {
        timerSection.classList.remove('hidden');
    } else {
        timerSection.classList.add('hidden');
    }
});

// Handle form submission
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
    }
    
    tasks.push(newTask);
    renderTasks();
    updateCounts();
    closeModals();
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