import express from "express";
const router = express.Router();
import { check } from "express-validator";
import {
  getAllBooks,
  getBook,
  createPost,
} from "../controllers/book.controller.js";
// middleware
import {
  loginRequired,
  ensureCorrectUser,
} from "../middleware/auth.middleware.js";

router.get("/", getAllBooks);

router.get("/:id", getBook);

//  /api/v1/books/:id/new/
router.post("/:id/new", loginRequired, [
  loginRequired,
  [
    check("text", "メッセージを投稿してください").not().isEmpty(),
    check("comment", "コメントを入力してください").not().isEmpty(),
    check("icon", "アイコンをを選択してください").not().isEmpty(),
  ],
  createPost,
]);

export default router;
