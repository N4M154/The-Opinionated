import express from "express";
import { login, signup, protectedHome, getUserProfile } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/home", authenticateToken, protectedHome);
router.get("/profile", authenticateToken, getUserProfile);

export default router;
