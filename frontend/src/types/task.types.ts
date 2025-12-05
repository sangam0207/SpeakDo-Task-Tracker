export type Priority = 'low' | 'medium' | 'high' ;
export type Status = 'todo' | 'in-progress' | 'done';
export type ViewMode = 'kanban' | 'list';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  dueDate?: string;
  createdAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: string;
}
