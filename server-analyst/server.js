import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/data.route.js";
import crypto from "crypto";
import fs from "fs";

dotenv.config();

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());

const allowedOrigins = ["http://localhost:3000", "http://localhost:5000"];

app.use(
  cors({
    origin: allowedOrigins,
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

app.use("/api", router);

app.listen(PORT);
