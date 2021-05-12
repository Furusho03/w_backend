import { validationResult } from "express-validator";
import Book from "../models/book.model.js";
import Post from "../models/post.model.js";

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({})
      .sort({ createdAt: "desc" })
      .select("title")
      .select("text")
      .select("image");
    res.json(books);
  } catch (error) {
    console.log(error);
  }
};

const getBook = async (req, res) => {
  try {
    const findBook = await Book.find({ _id: req.params.id });
    res.json(findBook);
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "そのページは存在しません" });
    }
  }
};

const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let { text, comment, icon, feelings } = req.body;
    let user = req.user.id;
    if (!user) {
      return res.status(400).json({ message: "no user" });
    }
    const post = await new Post({
      text,
      comment,
      icon,
      feelings,
      user,
    });

    const book = await Book.findById(req.params.id);
    book.posts.push({ post: post._id });

    post.save();
    book.save();

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export { getAllBooks, getBook, createPost };
