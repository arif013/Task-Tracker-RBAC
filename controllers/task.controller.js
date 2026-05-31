import Task from "../model/task.model.js";

const createTask = async (req, res) => {
  const { title, description, priority, assignee, project } = req.body;
  // console.log('req.user',req.user)
  // console.log('project', req.)

  const createdTask = await Task.create({
    title,
    description,
    priority,
    // status,
    assignee,
    project,
    createdBy: req.user.id,
  });
  res.status(201).json({
    success: true,
    message: "Task created successfully",
    createdTask,
  });
};

const updateTaskStatus = async (req, res) => {
  const STATUS_TRANSITIONS = {
    TODO: ["IN_PROGRESS", "BLOCKED"],

    IN_PROGRESS: ["IN_REVIEW", "BLOCKED"],

    IN_REVIEW: ["DONE", "BLOCKED"],

    DONE: [],

    BLOCKED: ["TODO", "IN_PROGRESS"],
  };

  const { status } = req.body;

  const task = await Task.findById(req.params.taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  let taskStatus = task.status;

  if (!STATUS_TRANSITIONS[taskStatus].includes(status)) {
    return res.status(400).json({
      message: `Cannot move from ${taskStatus} to ${status}`,
    });
  }
  task.status = status;
  await task.save();

  res.status(200).json({
    success: true,
    task,
  });
};

export { createTask, updateTaskStatus };
