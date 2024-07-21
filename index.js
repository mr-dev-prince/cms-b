import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config.js";

const app = express();

app.use(cors());
app.use(express.json());

// dbconnection

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "cms" });

    console.log("Database connected");
  } catch (error) {
    console.log("Database could not connect", error);
  }
};

connectDb();

const ContentSchema = mongoose.Schema(
  {
    topic: String,
    description: String,
    author: String,
  },
  { timestamps: true }
);

const Content = new mongoose.model("contents", ContentSchema);

const createContent = async (req, res) => {
  try {
    const { topic, description, author } = req.body;

    const response = await Content.create({ topic, description, author });

    res.json({ status: 200, success: true, data: response });
  } catch (error) {
    console.log("Error creating content", error);
    res.json({ status: 400, success: false, data: error });
  }
};

app.post("/api/post", createContent);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(4000, () => {
  console.log("app running at server 4000");
});
