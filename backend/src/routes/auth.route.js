import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Authentication Routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Update Profile Route with Image Upload


router.put("/update-profile", protectRoute, updateProfile);

// Check User Authentication
router.get("/check", protectRoute, checkAuth);
export default router;
