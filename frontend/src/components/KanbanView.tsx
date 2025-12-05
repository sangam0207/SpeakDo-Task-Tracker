
import KanbanColumn from './KanbanColumn';
import type { Task, Status } from '@/types/task.types';
import { statusColumns } from '../constants';

interface KanbanViewProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onStatusChange: (taskId: string, newStatus: Status) => void;
}

export default function KanbanView({
  tasks,
  onEditTask,
  onDeleteTask,
  onStatusChange,
}: KanbanViewProps) {
  const tasksByStatus = statusColumns.reduce((acc, status) => {
    acc[status] = tasks.filter(task => task.status === status);
    return acc;
  }, {} as Record<Status, Task[]>);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statusColumns.map(status => (
        <KanbanColumn
          key={status}
          status={status}
          tasks={tasksByStatus[status]}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          onDrop={onStatusChange}
        />
      ))}
    </div>
  );
}