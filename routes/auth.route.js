import express from "express";
const router = express.Router();
// ハンドラー
import { signup, signin } from "../handlers/auth.handler.js";

router.post("/signup", signup);

router.post("/signin", signin);

export default router;
