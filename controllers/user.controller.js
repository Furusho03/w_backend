/* model */
import User from "../models/user.model.js";

const getAllUsers = async (req, res, next) => {
  try {
    let users = await User.find({}).select("-password");
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const getFollowUser = async (req, res, next) => {
  try {
    let followUser = await User.find({
      "followers.user": req.params.id,
    }).select("username");
    res.json({ followUser });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const userFollow = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);
    if (
      user.followers.filter((user) => user.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ message: "すでにフォローしています" });
    }

    user.followers.unshift({ user: req.user.id });

    await user.save();

    res.json(user);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const userUnFollow = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (
      user.followers.filter((user) => user.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ message: "フォローしていません" });
    }

    // Get remove index
    const removeIndex = user.followers
      .map((follow) => follow.user.toString())
      .indexOf(req.user.id);

    user.followers.splice(removeIndex, 1);

    await user.save();

    res.json(user);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export { getAllUsers, getFollowUser, userFollow, userUnFollow };
