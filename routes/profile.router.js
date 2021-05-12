import express from "express";
const router = express.Router();
import { check } from "express-validator";
import { createPost } from "../controllers/posts.controller.js";
// middleware
import {
  loginRequired,
  ensureCorrectUser,
} from "../middleware/auth.middleware.js";
/* controller */
import { getProfile } from "../controllers/profile.controller.js";

/* /api/v1/profile/:id*/
router.get("/:id", loginRequired, getProfile);

export default router;
