import User from "../model/user.model.js";

const getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.status(201).json({
    success: true,
    users,
  });
};

export { getAllUsers };
