import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Books",
    },
    text: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
    icon: {
      type: String,
    },
    feelings: {
      type: Number,
      min: -10,
      max: 10,
    },
    state: {
      type: String,
      default: "public",
    },
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
