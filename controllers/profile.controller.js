/* model */
import User from "../models/user.model.js";

const getProfile = async (req, res, next) => {
  try {
    let foundUser = await User.findById(req.params.id).select('-password').select('-messages');
    return res.status(200).json(foundUser);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "そのユーザーは存在しません" });
    }
    return next(error);
  }
};

export { getProfile };
