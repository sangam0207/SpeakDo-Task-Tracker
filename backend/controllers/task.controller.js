import taskService from "../service/task.service.js";
import successRes from "../lib/success.res.js";

export const createTask = async (req, res, next) => {
  try {
    const data = await taskService.createTask(req, next);
    if (data) {
      successRes.ok(res, data.message, data.data);
    }
  } catch (err) {
    next(err);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const data = await taskService.getTasks(req, next);
    if (data) {
      successRes.ok(res, data.message, data.data);
    }
  } catch (err) {
    next(err);
  }
};

export const getGroupedTasks = async (req, res, next) => {
  try {
    const data = await taskService.getGroupedTasks(req, next);
    if (data) {
      successRes.ok(res, data.message, data.data);
    }
  } catch (err) {
    next(err);
  }
};

export const getSingleTask = async (req, res, next) => {
  try {
    const data = await taskService.getTaskById(req, next);
    if (data) {
      successRes.ok(res, data.message, data.data);
    }
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const data = await taskService.updateTask(req, next);
    if (data) {
      successRes.ok(res, data.message, data.data);
    }
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const data = await taskService.deleteTask(req, next);
    if (data) {
      successRes.ok(res, data.message, data.data);
    }
  } catch (err) {
    next(err);
  }
};
