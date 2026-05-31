import Project from "../model/project.model.js";

const createProjects = async (req, res) => {
  try {
    const { title, createdBy } = req.body;
    if (!title || !createdBy) {
      return res.status(401).json({ message: "Required fields are missing!" });
    }
    const lowTitle = title.toLowerCase();

    // Check if same name exists
    const sameTitle = await Project.findOne({ lowTitle });
    console.log('Same title:',sameTitle)
    if (sameTitle) {
      return res
        .status(400)
        .json({ message: "Same project name exists, try with different name" });
    }

    // If all above cases passed then create one Project
    const createProject = await Project.create({
      title: lowTitle,
      createdBy,
    });

    res
      .status(201)
      .json({
        success: true,
        message: "Project created successfully",
        createProject,
      });
  } catch (err) {
    console.error("Project creation failed", err);
    return res.status(500).json({ message: "Server error at project create" });
  }
};

export { createProjects };
