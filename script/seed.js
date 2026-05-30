// scripts/createAdmin.js

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../model/user.model.js";
import dotenv from 'dotenv'
dotenv.config()

await mongoose.connect(process.env.MONGODB_URI);

const hashedPassword = await bcrypt.hash(
  "StrongAdminPassword123",
  10
);

await User.create({
  name: "Super Admin",
  email: "admin@gmail.com",
  password: hashedPassword,
  role: "admin"
});

console.log("Admin created");
process.exit();