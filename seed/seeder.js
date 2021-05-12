import connectDB from '../models/index.js'
import Book from '../models/book.model.js'
import Post from '../models/post.model.js'
import User from '../models/user.model.js'
import dotenv from "dotenv"
import books from './books.js'

dotenv.config()

connectDB()

const seeder = async () => {
  try {

    await Book.deleteMany();
    await Post.deleteMany()
    
    await Book.insertMany(books)

    console.log("データを挿入しました");
    process.exit();
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Book.deleteMany();
    await Post.deleteMany();
    await User.deleteMany();

    console.log("データを消去しました");
    process.exit();
  } catch (err) {
    console.error(`デリートエラー ${err}`);
    process.exit(1);
  }
}

if(process.argv[2] === '-d') {
  destroyData()
} else {
  seeder()
}