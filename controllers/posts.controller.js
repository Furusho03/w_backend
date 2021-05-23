import { validationResult } from "express-validator";
import Post from "../models/post.model.js";

const createPost = async (req, res, nex) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let { text, comment, icon, feelings } = req.body;
    let user = req.user.id;
    let book = req.params.id;
    const post = await Post.create({
      text,
      comment,
      icon,
      feelings,
      user,
      book,
    });

    post.save();

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
};

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: "desc" })
      .populate({
        path: "user",
        select: "username",
      })
      .populate({
        path: "book",
        select: { title: true, image: true, text: true },
      });

    if (posts.length === 0) {
      return res.status(200).json({ message: "投稿はありません" });
    }

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "server error" });
  }
};

const getPostType = async (req, res) => {
  try {
    const postsType = await Post.find({ book: req.params.id })
      .sort({ createdAt: "desc" })
      .populate({
        path: "user",
        select: "username",
      })
      .populate({
        path: "book",
        select: { title: true, image: true, text: true },
      });
    res.status(200).json({ postsType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id })
      .populate({
        path: "user",
        select: "username",
      })
      .populate({
        path: "book",
        select: { title: true, image: true, text: true },
      });
    res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
};

const getMyPost = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id })
      .sort({ createdAt: "desc" })
      .populate({
        path: "user",
        select: "username",
      })
      .populate({
        path: "book",
        select: { title: true, image: true, text: true },
      });

    if (posts.length === 0) {
      return res.status(200).json({ message: "投稿はありません" });
    }

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
};

export { createPost, getAllPost, getPostType, getPost, getMyPost };
