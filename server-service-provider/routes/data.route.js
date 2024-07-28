import express from "express";
import { maskedDataController } from "../controllers/data.controller.js";

const dataRouter = express.Router();

dataRouter.post("/masked-data", maskedDataController);

export default dataRouter;
