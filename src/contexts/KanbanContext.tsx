'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: 'todo' | 'progress' | 'done';
  timer?: {
    enabled: boolean;
    hours?: number;
    minutes?: number;
    seconds?: number;
    remaining?: number;
  };
}

interface KanbanContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  moveTask: (id: number, newStatus: 'todo' | 'progress' | 'done') => void;
}

const KanbanContext = createContext<KanbanContextType | undefined>(undefined);

export function KanbanProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('kanbanTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const saveTasks = (newTasks: Task[]) => {
    localStorage.setItem('kanbanTasks', JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  const addTask = (taskData: Omit<Task, 'id'>) => {
    const newTask = {
      ...taskData,
      id: Date.now()
    };
    saveTasks([...tasks, newTask]);
    toast.success('Tarefa criada com sucesso!', {
      icon: '✅',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const updateTask = (updatedTask: Task) => {
    const newTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    saveTasks(newTasks);
    toast.success('Tarefa atualizada com sucesso!', {
      icon: '📝',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const deleteTask = (id: number) => {
    const newTasks = tasks.filter(task => task.id !== id);
    saveTasks(newTasks);
    toast.success('Tarefa removida com sucesso!', {
      icon: '🗑️',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const moveTask = (id: number, newStatus: 'todo' | 'progress' | 'done') => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const statusMessages = {
      todo: 'Para Fazer',
      progress: 'Em Progresso',
      done: 'Concluído'
    };

    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    saveTasks(newTasks);
    
    toast.success(`Tarefa movida para ${statusMessages[newStatus]}`, {
      icon: '🔄',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask
  };

  return (
    <KanbanContext.Provider value={value}>
      {children}
    </KanbanContext.Provider>
  );
}

export function useKanban() {
  const context = useContext(KanbanContext);
  if (context === undefined) {
    throw new Error('useKanban must be used within a KanbanProvider');
  }
  return context;
}