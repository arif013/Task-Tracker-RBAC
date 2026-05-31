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

export { createTask };
