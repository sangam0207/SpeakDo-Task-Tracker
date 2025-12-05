
import { Calendar, Edit2, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Task } from '@/types/task.types';
import { priorityColors, statusLabels } from '../constants';
import { formatDate } from '../utils/dateUtils';

interface ListViewProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

export default function ListView({ tasks, onEditTask, onDeleteTask }: ListViewProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="divide-y">
        {tasks.map(task => (
          <div key={task.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
                {task.description && (
                  <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                )}
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge className={`text-xs ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {statusLabels[task.status]}
                  </Badge>
                  {task.dueDate && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      {formatDate(task.dueDate)}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onEditTask(task)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-600"
                  onClick={() => onDeleteTask(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {tasks.length === 0 && (
          <p className="text-center text-gray-400 py-12">No tasks found</p>
        )}
      </div>
    </div>
  );
}