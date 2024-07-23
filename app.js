import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config.js";

const app = express();

const allowedOrigins = ["https://cms-f.vercel.app", "http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow requests with no origin, like mobile apps or curl requests
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use((req, res, next) => {
  if (req.headers["x-forwarded-proto"] !== "https") {
    return res.redirect(["https://", req.get("Host"), req.url].join(""));
  }
  next();
});

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Enable preflight requests for all routes
app.use(express.json());

const port = process.env.PORT || 4000;

// dbconnection

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "pHcms",
      serverSelectionTimeoutMS: 30000,
    });

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
    res.json({ status: 400, success: false, data: error?.message });
  }
};

app.post("/api/post", createContent);

app.get("/get", (req, res) => {
  res.json({
    data: "data to get kar pa rahe hain",
    par: "post nahi kar pa rhe!!",
  });
});

app.get("/", (req, res) => {
  res.send("checkup-4");
});

app.listen(port, () => {
  console.log(`app running at server ${port}`);
});
