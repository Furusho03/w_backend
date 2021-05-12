import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
// db
import connectDB from "./models/index.js";
// ハンドラー
import errorHandler from "./handlers/error.handler.js";
// ルート
import auth from "./routes/auth.route.js";
import user from "./routes/user.route.js";
import profile from "./routes/profile.router.js";
import posts from "./routes/posts.router.js";
import books from "./routes/book.router.js";

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", auth);
app.use("/api/v1/users", user);
app.use("/api/v1/profile", profile);
app.use("/api/v1/posts", posts);
app.use("/api/v1/books", books);

app.use((req, res, next) => {
  let err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`ポート ${PORT} で動いています`));
