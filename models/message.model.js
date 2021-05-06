import mongoose from "mongoose";
import User from "./user.model.js";

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      maxLength: 160,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.pre("remove", async function (next) {
  try {
    // find a user
    let user = await User.findById(this.user);
    // remove the id of the message from their message list
    user.messages.remove(this.id);
    // save that user
    await user.save();
    // return next
    return next();
  } catch (error) {
    console.log("model ",error)
    return next(error)
  }
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
