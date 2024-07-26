import express from "express";
import {
  checkAuthController,
  loginController,
  registerController,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/checkAuth", checkAuthController);

export default router;
