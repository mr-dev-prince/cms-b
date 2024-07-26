import express from "express";
import cors from "cors";
import "dotenv/config.js";
import { connectDb } from "./database/dbConnection.js";
import { register } from "./controllers/user.controller.js";

const app = express();

const allowedOrigins = ["https://cms-f.vercel.app", "http://localhost:5173/"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
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
app.options("*", cors(corsOptions));
app.use(express.json());

// dbconnection

connectDb();

app.post("/api/post", register);

app.get("/", (req, res) => {
  res.send("Register functionality implemented !");
});

app.listen(process.env.PORT, () => {
  console.log(`app running at port ${process.env.PORT}`);
});
