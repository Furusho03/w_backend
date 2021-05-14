/* model */
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const getProfile = async (req, res, next) => {
  try {
    let foundUser = await User.findById(req.params.id);
    return res.status(200).json(foundUser);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "そのユーザーは存在しません" });
    }
    return next(error);
  }
};

const changeProfile = async (req, res, next) => {
  try {
    let foundUser = await User.findById(req.params.id);

    if (!foundUser) {
      return res
        .status(400)
        .json({ message: "ユーザーを見つけられませんでした" });
    }

    const { username, age, email } = req.body;

    await User.findByIdAndUpdate(foundUser._id, {
      username: username,
      age: age,
      email: email,
    });
    return res.status(200).json({ message: "プロファイルを更新しました" });
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "そのユーザーは存在しません" });
    }
    return next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    let foundUser = await User.findById(req.params.id);

    if (!foundUser) {
      return res
        .status(400)
        .json({ message: "ユーザーを見つけられませんでした" });
    }

    const { password, newPassword } = req.body;

    let isMatch = await bcrypt.compare(password, foundUser.password);

    if (isMatch) {
      let newUserPassword = await bcrypt.hash(newPassword, 10);

      await User.findByIdAndUpdate(foundUser._id, {
        password: newUserPassword,
      });
      return res.status(200).json({ message: "パスワードを更新しました" });
    } else {
      return next({
        status: 400,
        message: "パスワードが正しくありません",
      });
    }
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "そのユーザーは存在しません" });
    }
    return next(error);
  }
};

export { getProfile, changeProfile, changePassword };
