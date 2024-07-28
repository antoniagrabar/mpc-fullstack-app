import express from "express";
import {
  publicKeyController,
  encryptedMaskController,
  maskedAggregateDataController,
} from "../controllers/data.controller.js";

const router = express.Router();

router.get("/public-key", publicKeyController);
router.post("/encrypted-mask", encryptedMaskController);
router.post("/masked-aggregate-data", maskedAggregateDataController);

export default router;
