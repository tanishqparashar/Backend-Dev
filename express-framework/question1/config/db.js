import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/userFilterDB");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;