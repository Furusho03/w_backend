import jwt from "jsonwebtoken";

// ユーザーがログインしていることを確認する - Authentication
const loginRequired = (req, res, next) => {
  try {
    // Bearer ....
    if (req.headers.authorization === undefined) {
      return next({
        status: 401,
        message: "ログインしてください",
      });
    }

    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
      if (decoded) {
        req.user = decoded
        return next();
      } else {
        return next({
          status: 401,
          message: "ログインしてください",
        });
      }
    });
  } catch (error) {
    console.error(error);
    return next({
      status: 401,
      message: "ログインしてください",
    });
  }
};

// 正しいユーザーであることを確認する - Authentication
const ensureCorrectUser = (req, res, next) => {
  try {
    if (req.headers.authorization === undefined) {
      return next({
        status: 401,
        message: "ユーザーが正しくありません",
      });
    }

    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
      if (decoded && decoded.id === req.params.id) {
        req.user = decoded
        return next();
      } else {
        return next({
          status: 401,
          message: "ユーザーが正しくありません",
        });
      }
    });
  } catch (error) {
    console.error(error)
    return next({
      status: 401,
      message: "ログインできませんでした c",
    });
  }
};

export { loginRequired, ensureCorrectUser };
