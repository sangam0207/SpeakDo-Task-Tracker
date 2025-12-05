import { useEffect, useState } from "react";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import KanbanView from "./components/KanbanView";
import ListView from "./components/ListView";
import CreateTaskModal from "./components/CreateTaskModal";
import VoiceInputModal from "./components/VoiceInputModal";
import EditTaskModal from "./components/EditTaskModal";
import Toast from "./components/Toast";
import DeleteConfirmationDialog from "./components/DeleteTaskModel";
import LoadingSkeletons from "./components/SkeltonLoader";
import {
  apiCreateTask,
  apiGetTasks,
  apiUpdateTask,
  apiDeleteTask,
  apiGetSingleTask,
} from "@/services/task.api";

import type { Task, Priority, Status, ViewMode } from "@/types/task.types";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [viewMode, setViewMode] = useState<ViewMode>("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<Status | "all">("all");
  const [filterPriority, setFilterPriority] =
    useState<Priority | "all">("all");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await apiGetTasks();
      setTasks(res.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (
    task: Omit<Task, "id" | "createdAt">
  ) => {
    try {
      const res = await apiCreateTask(task);
      setTasks((prev) => [...prev, res.data?.data]);
      showToast("Task created successfully!", "success");
    } catch (error) {
      console.error("Task create error:", error);
      showToast("Failed to create task", "error");
    }
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      await apiUpdateTask(updatedTask.id, updatedTask);

      setTasks((prev) =>
        prev.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
      showToast("Task updated successfully!", "success");
    } catch (error) {
      console.error("Task update error:", error);
      showToast("Failed to update task", "error");
    }
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;
    try {
      await apiDeleteTask(taskToDelete);
      setTasks((prev) => prev.filter((task) => task.id !== taskToDelete));
      setIsDeleteDialogOpen(false);
      setTaskToDelete(null);
      showToast("Task deleted successfully!", "success");
    } catch (error) {
      console.error("Delete task error:", error);
      showToast("Failed to delete task", "error");
    }
  };

  const handleEditTask = async (task: Task) => {
    try {
      const res = await apiGetSingleTask(task.id);
      setSelectedTask(res.data?.data);
      setIsEditModalOpen(true);
    } catch (error) {
      console.error("Fetch task error:", error);
    }
  };

  const handleStatusChange = async (
    taskId: string,
    newStatus: Status
  ) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      const updatedTask = { ...task, status: newStatus };
      await apiUpdateTask(taskId, updatedTask);

      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? updatedTask : t
        )
      );
    } catch (error) {
      console.log("Status update error:", error);
      showToast("Failed to update status", "error");
    }
  };

  const openDeleteDialog = (taskId: string) => {
    setTaskToDelete(taskId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    await handleDeleteTask();
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || task.status === filterStatus;

    const matchesPriority =
      filterPriority === "all" || task.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header
        onCreateTask={() => setIsCreateModalOpen(true)}
        onVoiceInput={() => setIsVoiceModalOpen(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterStatus={filterStatus}
          onStatusChange={setFilterStatus}
          filterPriority={filterPriority}
          onPriorityChange={setFilterPriority}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        
         {loading ? (
          <LoadingSkeletons viewMode={viewMode} />
        ) : viewMode === "kanban" ? (
          <KanbanView
            tasks={filteredTasks}
            onEditTask={handleEditTask}
            onDeleteTask={openDeleteDialog}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <ListView
            tasks={filteredTasks}
            onEditTask={handleEditTask}
            onDeleteTask={openDeleteDialog}
          />
        )}
      </div>

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTask={handleCreateTask}
      />

      <VoiceInputModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onCreateTask={handleCreateTask}
      />

      {selectedTask && (
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          task={selectedTask}
          onUpdateTask={handleUpdateTask}
        />
      )}

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
        />
      )}
    </div>
  );
}