import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(MONGODB_URI!, {
      dbName: "bitpurl",
      bufferCommands: true,
    });
  } catch (error: any) {
    console.log(error);
    throw new Error("Error connecting to database: " + error.message);
  }
};

export default dbConnect;