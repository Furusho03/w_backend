import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    // posts: [
    //   {
    //     post: {
    //       type: Schema.Types.ObjectId,
    //       ref: "Post",
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

const Book = mongoose.model("Books", bookSchema);

export default Book;
