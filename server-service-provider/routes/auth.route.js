import express from "express";
import { signUpController } from "../controllers/signUp.controller.js";
import { signInController } from "../controllers/signIn.controller.js";
import { authController } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUpController);
router.post("/signin", signInController);
router.post("/auth", authController);

export default router;
