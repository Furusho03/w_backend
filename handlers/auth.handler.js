import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const signin = async (req, res, next) => {
  try {
    // find a user
    let user = await User.findOne({
      email: req.body.email,
    });

    let { id, username, age } = user;

    let isMatch = await user.comparePassword(req.body.password);

    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          username,
          age,
        },
        process.env.JWT_SECRET_KEY
      );
      return res.status(200).json({
        id,
        username,
        age,
        token,
      });
    } else {
      return next({
        status: 400,
        message: "メールアドレスまたわパスワードが一致しません 1",
      });
    }
  } catch (error) {
    return next({
      status: 400,
      message: "メールアドレスまたわパスワードが一致しません 2",
    });
  }
};

const signup = async (req, res, next) => {
  try {
    let user = await User.create(req.body);
    let { id, username, age } = user;
    let token = jwt.sign(
      {
        id,
        username,
        age,
      },
      process.env.JWT_SECRET_KEY
    );
    return res.status(200).json({
      id,
      username,
      age,
      token,
    });
    // ユーザー作成
    // トークンを作成（トークンを使ったサインイン)
  } catch (error) {
    // バリデーションに失敗すると
    // ユーザー名／Eメールがすでにしようされているか
    if (error.code === 11000) {
      error.message = "そのユーザー名またはメールアドレスは使用されています";
    }
    // そうでなければ、400を送り返す
    return next({
      status: 400,
      message: error.message,
    });
  }
};

export { signin, signup };
