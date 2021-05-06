import jwt from "jsonwebtoken";

// make sure the user is logged - Authentication
const loginRequired = (req, res, next) => {
  try {
    //Bearer ....
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
      if (decoded) {
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

// make sure we get the correct user - Authentication
const ensureCorrectUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
      if (decoded && decoded.id === req.params.id) {
        return next();
      } else {
        return next({
          status: 401,
          message: "ログインできませんでした",
        });
      }
    });
  } catch (error) {
    console.error(error)
  }
};

export { loginRequired, ensureCorrectUser };
