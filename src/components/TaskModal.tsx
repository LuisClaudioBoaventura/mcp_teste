'use client';

import { useState, useEffect } from 'react';
import { useKanban } from '../contexts/KanbanContext';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTask?: any;
}

export default function TaskModal({ isOpen, onClose, initialTask }: TaskModalProps) {
  const { addTask, updateTask } = useKanban();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const [enableTimer, setEnableTimer] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setPriority(initialTask.priority);
      if (initialTask.timer?.enabled) {
        setEnableTimer(true);
        setHours(initialTask.timer.hours || 0);
        setMinutes(initialTask.timer.minutes || 30);
        setSeconds(initialTask.timer.seconds || 0);
      }
    }
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const task = {
      title,
      description,
      priority,
      status: 'todo' as const,
      timer: {
        enabled: enableTimer,
        hours: enableTimer ? hours : 0,
        minutes: enableTimer ? minutes : 0,
        seconds: enableTimer ? seconds : 0,
        remaining: enableTimer ? (hours * 3600) + (minutes * 60) + seconds : 0
      }
    };

    if (initialTask) {
      updateTask({ ...task, id: initialTask.id, status: initialTask.status });
    } else {
      addTask(task);
    }
    
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('low');
    setEnableTimer(false);
    setHours(0);
    setMinutes(30);
    setSeconds(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {initialTask ? 'Editar Tarefa' : 'Nova Tarefa'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              title="Fechar Modal"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Título
              </label>
              <input
                type="text"
                id="taskTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o título da tarefa"
                aria-label="Título da tarefa"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-lilac-500 dark:bg-gray-700 dark:text-gray-300"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Descrição
              </label>
              <textarea
                id="taskDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Digite a descrição da tarefa"
                aria-label="Descrição da tarefa"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-lilac-500 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="taskPriority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Prioridade
              </label>
              <select
                id="taskPriority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                aria-label="Prioridade da tarefa"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-lilac-500 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={enableTimer}
                  onChange={(e) => setEnableTimer(e.target.checked)}
                  className="rounded text-lilac-600 focus:ring-lilac-500 dark:bg-gray-700"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Adicionar timer
                </span>
              </label>
            </div>
            
            {enableTimer && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tempo Estimado
                </label>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Horas
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={24}
                      value={hours}
                      onChange={(e) => setHours(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-300"
                      title="Horas estimadas"
                      placeholder="Digite as horas"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Minutos
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={59}
                      value={minutes}
                      onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-300"
                      title="Minutos estimados"
                      placeholder="Digite os minutos"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Segundos
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={59}
                      value={seconds}
                      onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-300"
                      title="Segundos estimados"
                      placeholder="Digite os segundos"
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-lilac-600 hover:bg-lilac-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-lilac-500"
              >
                {initialTask ? 'Atualizar' : 'Criar'} Tarefa
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}