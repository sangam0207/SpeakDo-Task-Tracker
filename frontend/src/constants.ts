import type { Priority, Status } from '@/types/task.types';

export const priorityColors: Record<Priority, string> = {
  low: 'bg-blue-100 text-blue-800 border-blue-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
};

export const statusLabels: Record<Status, string> = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
};

export const statusColumns: Status[] = ['todo', 'in-progress', 'done'];