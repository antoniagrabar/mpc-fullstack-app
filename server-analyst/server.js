import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import publicKeyRouter from "./routes/publicKey.route.js";

dotenv.config();

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const PORT = process.env.PORT || 5001;

try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("connected to mongo from analyst");
} catch (error) {
  console.log(error);
}

app.use("/api/", publicKeyRouter);

app.listen(PORT);
