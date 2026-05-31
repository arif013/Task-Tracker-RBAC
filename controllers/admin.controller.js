import User from "../model/user.model.js";

const getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.status(201).json({
    success: true,
    users,
  });
};

const updateRole = async (req, res) => {
  const { role } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true },
  );

  res.status(201).json({user});
};

export { getAllUsers, updateRole };
