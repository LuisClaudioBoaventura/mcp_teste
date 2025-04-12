'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    description: string;
    priority: string;
    timer?: {
      enabled: boolean;
      hours?: number;
      minutes?: number;
      seconds?: number;
      remaining?: number;
    };
  };
  onClick: () => void;
}

export default function TaskCard({ task, onClick }: TaskCardProps) {
  const [remainingTime, setRemainingTime] = useState(task.timer?.remaining || 0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, remainingTime]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    }
  };

  const getPriorityText = () => {
    switch (task.priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      default:
        return 'Baixa';
    }
  };

  return (
    <motion.div
      onClick={onClick}
      className="task-card bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md cursor-pointer"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        layout: { type: "spring", stiffness: 300, damping: 30 }
      }}
    >
      <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">{task.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center justify-between">
        <motion.span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor()}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {getPriorityText()}
        </motion.span>

        {task.timer?.enabled && (
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <i className="fas fa-clock mr-1"></i>
            <span className="font-mono">{formatTime(remainingTime)}</span>
            {remainingTime > 0 && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsRunning(!isRunning);
                }}
                className="ml-2 hover:text-lilac-600 dark:hover:text-lilac-400"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <>
                  <i className={`fas fa-${isRunning ? 'pause' : 'play'}`}></i>
                </>
              </motion.button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}