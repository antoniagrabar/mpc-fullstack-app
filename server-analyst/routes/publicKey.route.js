import express from "express";
import { publicKeyController } from "../controllers/publicKey.controller.js";

const router = express.Router();

router.get("/publicKey", publicKeyController);

export default router;
