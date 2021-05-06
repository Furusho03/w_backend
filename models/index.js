import mongoose from "mongoose";
mongoose.set("debug", true);

const connectDB = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      keepAlive: true,
      useNewUrlParser: true ,
      useUnifiedTopology: true,
      useCreateIndex:  true
    });
    console.log(`Mongodbに接続しました　ホストネーム${conn.connection.host}`)
  }catch(error) {
    console.error('MongoDB接続エラー')
    process.exit(1)
  }
}

export default connectDB;
