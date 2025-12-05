import Task from "../models/task.model.js";
import ErrorResponse from "../lib/error.res.js";
import mongoose from "mongoose";
class TaskService {

  // Create Task
  async createTask(req, next) {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title || !priority || !status || !dueDate) {
      return next(ErrorResponse.badRequest("All fields are required"));
    }

    const task = new Task({
      title,
      description: description || "",
      status,
      priority,
      dueDate,
    });

    await task.save();

    const resSend = {
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
    };

    return {
      message: "Task created successfully",
      data: resSend,
    };
  }

  async getTasks(req, next) {
    const { status, priority, search } = req.query;
  
    const filters = {};
    if (status) filters.status = status;
    if (priority) filters.priority = priority;
    if (search) {
      filters.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
  
    const tasks = await Task.find(filters).sort({ createdAt: -1 });
  
    const formattedTasks = tasks.map((task) => ({
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }));
  
    return {
      message: "Tasks fetched successfully",
      data: formattedTasks,
    };
  }
  

  async getGroupedTasks(req, next) {
    const tasks = await Task.find().sort({ createdAt: -1 });
  
    const formatTask = (task) => ({
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    });
  

    const grouped = {
      todo: tasks
        .filter((t) => t.status === "todo")
        .map(formatTask),
      inProgress: tasks
        .filter((t) => t.status === "inProgress")
        .map(formatTask),
      done: tasks
        .filter((t) => t.status === "done")
        .map(formatTask),
    };
  
    return {
      message: "Grouped tasks fetched successfully",
      data: grouped,
    };
  }
  

  // Get single task by ID
  async getTaskById(req, next) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(ErrorResponse.badRequest("Invalid Task ID"));
      }
    
    const task = await Task.findById(id);
    if (!task) return next(ErrorResponse.badRequest("Task not found"));
  
    // Format the task
    const formattedTask = {
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  
    return {
      message: "Task fetched successfully",
      data: formattedTask,
    };
  }
  

  async updateTask(req, next) {
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;
  
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(ErrorResponse.badRequest("Invalid task ID"));
    }
  
    
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (priority !== undefined) updateData.priority = priority;
    if (dueDate !== undefined) updateData.dueDate = dueDate;
  
    if (Object.keys(updateData).length === 0) {
      return next(ErrorResponse.badRequest("At least one field is required"));
    }
  
    const task = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  
    if (!task) {
      return next(ErrorResponse.badRequest("Task not found"));
    }
  
    // Format the response
    const formattedTask = {
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  
    return {
      message: "Task updated successfully",
      data: formattedTask,
    };
  }
  
  // Delete task
  async deleteTask(req, next) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(ErrorResponse.badRequest("Invalid task ID"));
      }

    const task = await Task.findByIdAndDelete(id);
    if (!task) return next(ErrorResponse.badRequest("Task not found"));

    return {
      message: "Task deleted successfully",
      data: null,
    };
  }
}

export default new TaskService();
