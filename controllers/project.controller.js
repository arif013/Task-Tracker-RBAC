import Project from "../model/project.model.js";

const createProjects = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(401).json({ message: "Required fields are missing!" });
    }

    const projectController = req.user;
    const lowTitle = title.toLowerCase();

    // Check if same name exists
    const sameTitle = await Project.findOne({ title: lowTitle });
    // console.log('Same title:',sameTitle)
    if (sameTitle) {
      return res
        .status(400)
        .json({ message: "Same project name exists, try with different name" });
    }

    // If all above cases passed then create one Project
    const createProject = await Project.create({
      title: lowTitle,
      createdBy: {
        name: projectController.name,
        email: projectController.email,
        role: projectController.role,
      },
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      createProject,
    });
  } catch (err) {
    console.error("Project creation failed", err);
    return res.status(500).json({ message: "Server error at project create" });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await Project.find();
    if(!allProjects){
        return res.status(401).json({ message: "Error occured while fetching project"})
    }
    res.status(200).json({
        success: true,
        message: "All projects fetched successfully",
        allProjects
    })
  } catch (err) {
    console.error("Cound not fetch project ", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export { createProjects, getAllProjects };
