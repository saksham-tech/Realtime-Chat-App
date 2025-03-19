import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { uploadStatus, getStatuses, viewStatus } from "../controllers/status.controller.js";

const router = express.Router();

// Route to upload a new status
router.post("/upload", protectRoute, uploadStatus);

// Route to get all statuses
router.get("/", protectRoute, getStatuses);

// Route to view a status
router.post("/:statusId/view", protectRoute, viewStatus);

export default router;