import express from "express";
import { login, signup, protectedHome } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/home", authenticateToken, protectedHome);

export default router;
