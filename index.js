import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./models/index.js";
// ハンドラー
import errorHandler from "./handlers/error.handler.js";
// ルート
import auth from "./routes/auth.route.js";
import message from "./routes/message.route.js";
// middleware
import {
  loginRequired,
  ensureCorrectUser,
} from "./middleware/auth.middleware.js";
// models
import Message from './models/message.model.js'

connectDB();

app.use(cors());
app.use(express.json());

app.get("/api/v1/messages", loginRequired, async (req, res, next) => {
  try {
    let message = await Message.find().sort({ createdAt: 'desc'}).populate('user', {
      username: true,
      profileImageUrl: true
    })
    return res.status(200).json(message)
  } catch (error) {
    return next(error)
  }
});

app.use("/api/v1/auth", auth);
app.use(
  "/api/v1/users/:id/messages",
  loginRequired,
  ensureCorrectUser,
  message
);

app.use((req, res, next) => {
  let err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`ポート ${PORT} で動いています`));
