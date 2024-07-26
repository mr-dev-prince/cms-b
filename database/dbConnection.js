import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "easydata" });
    console.log("Database connected !");
  } catch (error) {
    console.log("Db connection error :", error?.message);
    process.exit();
  }
};
