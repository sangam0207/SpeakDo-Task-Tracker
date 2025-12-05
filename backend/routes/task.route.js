import express from "express";
import {
  createTask,
  getTasks,
  getGroupedTasks,
  getSingleTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/create", createTask);
router.get("/get", getTasks);
router.get("/grouped", getGroupedTasks);
router.get("/get/:id", getSingleTask);
router.patch("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);

export default router;
