import express from "express";
const router = express.Router();

import { login, signup } from "../controllers/auth.controllers.js";
import refreshAccessToken from "../utils/refreshAccessToken.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { getAllUsers, updateRole } from "../controllers/admin.controller.js";
import {
  createProjects,
  getAllProjects,
} from "../controllers/project.controller.js";

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);

// Admin routes
router.get("/all-users", authenticate, authorize("admin"), getAllUsers);
router.patch("/users/:id/role", authenticate, authorize("admin"), updateRole);

// Project routes
router.post(
  "/projects/create-project",
  authenticate,
  authorize("admin", "manager"),
  createProjects,
);
router.get(
  "/projects/all-projects",
  authenticate,
  authorize("admin", "manager"),
  getAllProjects,
);
export default router;
