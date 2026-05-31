import mongoose from "mongoose";
import User from "./user.model.js";
import Project from "./project.model.js";

const taskSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
    },
    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE", "BLOCKED"],
      default: "TODO",
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Project,
      required: true,
    },
    dueDate: Date,
    // createdBy: {
    //   name: { type: String, required: true },
    //   email: { type: String, required: true },
    //   role: {
    //     type: String,
    //     enum: ["admin", "manager"],
    //     default: "manager",
    //     required: true,
    //   },
    // },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    // isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
