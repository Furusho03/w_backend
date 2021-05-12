import express from "express";
const router = express.Router();
/* controller */
import {
  getAllUsers,
  getFollowUser,
  userFollow,
  userUnFollow
} from "../controllers/user.controller.js";
// middleware
import {
  loginRequired,
  ensureCorrectUser,
} from "../middleware/auth.middleware.js";

// すべてのユーザー
/* /api/v1/users*/
router.get("/", getAllUsers);

// フォローしたユーザー
/* /api/v1/users/:id/follow/ */
router.get("/:id/follow", loginRequired, ensureCorrectUser, getFollowUser);

// フォローする
/* /api/v1/users/followers/:id */
router.put("/follow/:id", loginRequired, userFollow);

// フォローを外す
/* /api/v1/users/followers/:id */
router.put("/unfollow/:id", loginRequired, userUnFollow);

export default router;
