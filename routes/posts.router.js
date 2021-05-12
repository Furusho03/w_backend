import express from "express";
const router = express.Router();
import { check } from "express-validator";
import { createPost, getAllPost, getPostType, getPost } from "../controllers/posts.controller.js";
// middleware
import {
  loginRequired,
  ensureCorrectUser,
} from "../middleware/auth.middleware.js";

/* POST - /api/v1/posts/:id/new - 投稿 */
router.post(
  "/:id/new",
  [
    loginRequired,
    [
      check("text", "メッセージを投稿してください").not().isEmpty(),
      check("comment", "コメントを入力してください").not().isEmpty(),
      check("icon", "アイコンをを選択してください").not().isEmpty(),
    ],
  ],
  createPost
);

/* GET - /api/v1/posts/ - 全ての投稿 */
router.get('/', getAllPost)

/* GET - /api/v1/posts/:id/lists - 種類ごとの投稿*/
router.get('/:id/lists', getPostType)

/* GET - /api/v1/posts/:id/list - 一つのの投稿*/
router.get('/:id/list', getPost)


export default router;
