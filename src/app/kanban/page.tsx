'use client';

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AppLayout from '@/components/AppLayout';
import TaskCard from '@/components/TaskCard';
import TaskModal from '@/components/TaskModal';
import { useKanban } from '@/contexts/KanbanContext';

const columns = [
  { id: 'todo', title: 'A Fazer', color: 'gray' },
  { id: 'progress', title: 'Em Progresso', color: 'blue' },
  { id: 'done', title: 'Concluído', color: 'green' }
];

export default function Kanban() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const { tasks, moveTask } = useKanban();

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination || (destination.droppableId === source.droppableId)) {
      return;
    }

    const taskId = parseInt(draggableId);
    moveTask(taskId, destination.droppableId as 'todo' | 'progress' | 'done');
  };

  return (
    <AppLayout>
      {/* Kanban Board */}
      <div className="container mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Quadro Kanban</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-lilac-600 hover:bg-lilac-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <i className="fas fa-plus mr-2"></i> Criar Tarefa
          </button>
        </header>

        {/* Kanban Board */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map(column => (
              <div key={column.id} className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 column">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{column.title}</h2>
                  <span className={`bg-${column.color}-300 dark:bg-${column.color}-900 text-${column.color}-700 dark:text-${column.color}-300 px-2 py-1 rounded-full text-xs font-medium`}>
                    {getTasksByStatus(column.id).length}
                  </span>
                </div>
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="space-y-3 min-h-[200px]"
                    >
                      {getTasksByStatus(column.id).map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={snapshot.isDragging ? 'task-card dragging' : ''}
                            >
                              <TaskCard
                                task={task}
                                onClick={() => handleTaskClick(task)}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialTask={selectedTask}
      />
    </AppLayout>
  );
}