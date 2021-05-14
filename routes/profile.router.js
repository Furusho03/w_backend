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
import { getProfile, changeProfile, changePassword } from "../controllers/profile.controller.js";

/* GET - /api/v1/profile/:id*/
router.get("/:id", loginRequired, ensureCorrectUser, getProfile);

/* post - /api/v1/profile/:id/change*/
router.put("/:id/update", loginRequired, ensureCorrectUser, changeProfile);

router.put("/:id/changep", loginRequired, ensureCorrectUser, changePassword);

export default router;
