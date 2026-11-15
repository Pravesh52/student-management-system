import express from "express";
import rateLimit from "express-rate-limit";
import { registerAdmin, loginAdmin, getCurrentAdmin } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateAdminRegistration, validateLogin } from "../validators/authValidator.js";

const router = express.Router();
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { success: false, message: "Too many attempts. Try again after 15 minutes." }
});

router.post("/register", authLimiter, validateAdminRegistration, registerAdmin);
router.post("/login", authLimiter, validateLogin, loginAdmin);
router.get("/me", protect, getCurrentAdmin);

export default router;
