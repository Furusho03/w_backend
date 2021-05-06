import Message from "../models/message.model.js";
import User from "../models/user.model.js";

// POST - /api/v1/users/:id/messages/
const createMessage = async (req, res, next) => {
  try {
    let message = await Message.create({
      text: req.body.text,
      user: req.params.id,
    });

    let foundUser = await User.findById(req.params.id);

    foundUser.messages.push(message.id);

    await foundUser.save();

    let foundMessage = await Message.findById(message._id).populate("user", {
      username: true,
      profileImageUrl: true,
    });
    return res.status(200).json(foundMessage);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// GET - /api/v1/users/:id/messages/:message_id
const getMessage = async (req, res, next) => {
  let messageId = req.params.message_id
  try {
    let message = await Message.find({messageId});
    return res.status(200).json(message);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// DELETE - /api/v1/users/:id/messages/:message_id
const deleteMessage = async (req, res, next) => {
  try {
    let foundMessage = await Message.findById(req.params.message_id);
    await foundMessage.remove();
    return res.status(200).json(foundMessage);
  } catch (error) {
    console.error("handler error",error);
    return next(error);
  }
};

export { createMessage, getMessage, deleteMessage };
