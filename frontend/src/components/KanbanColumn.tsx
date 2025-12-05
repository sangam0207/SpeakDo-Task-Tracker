import React from 'react';
import { Badge } from '@/components/ui/badge';
import TaskCard from './TaskCard';
import type { Task, Status } from '@/types/task.types';
import { statusLabels } from '../constants';

interface KanbanColumnProps {
  status: Status;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onDrop: (taskId: string, newStatus: Status) => void;
}

export default function KanbanColumn({
  status,
  tasks,
  onEditTask,
  onDeleteTask,
  onDrop,
}: KanbanColumnProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    onDrop(taskId, status);
  };

  return (
    <div
      className="bg-white rounded-lg p-4 shadow"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-700">{statusLabels[status]}</h2>
        <Badge variant="secondary">{tasks.length}</Badge>
      </div>
      
      <div className="space-y-3 min-h-[200px]">
        {tasks.map(task => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('taskId', task.id);
            }}
          >
            <TaskCard
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          </div>
        ))}
        
        {tasks.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">
            No tasks
          </p>
        )}
      </div>
    </div>
  );
}