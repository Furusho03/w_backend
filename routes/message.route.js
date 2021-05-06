import express from "express";
const router = express.Router({ mergeParams: true });
// ハンドラー
import {
  createMessage,
  getMessage,
  deleteMessage,
} from "../handlers/messages.hander.js";

// /api/v1/users/:id/messages
router.route("/").post(createMessage);

// /api/v1/users/:id/messages/:message_id
router.route("/:message_id").get(getMessage).delete(deleteMessage);

export default router;
