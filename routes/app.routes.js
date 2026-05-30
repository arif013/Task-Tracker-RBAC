import express from "express";
const router = express.Router();

import { login, signup } from "../controllers/auth.controllers.js";
import refreshAccessToken from "../utils/refreshAccessToken.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { getAllUsers } from "../controllers/admin.controller.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);

router.get("/all-users", authenticate, authorize("admin"), getAllUsers);

export default router;
