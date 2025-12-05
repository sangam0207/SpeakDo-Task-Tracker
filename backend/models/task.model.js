import mongoose from "mongoose";

const TASK_STATUS = ["todo", "in-progress", "done"];
const TASK_PRIORITY = ["low", "medium", "high"];

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [200, "Title cannot exceed 200 characters"],
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: {
        values: TASK_STATUS,
        message: "Status must be todo, inProgress, or done",
      },
      default: "todo",
    },

    priority: {
      type: String,
      enum: {
        values: TASK_PRIORITY,
        message: "Priority must be low, medium, or high",
      },
      default: "medium",
    },

    dueDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return !value || value >= new Date();
        },
        message: "Due date cannot be in the past",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);
