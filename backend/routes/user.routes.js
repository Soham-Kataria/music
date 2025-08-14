// backend/routes/user.routes.js
import express from "express";
import { updateUser, deleteUser } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Update user details (except password)
router.put("/:id", protect, updateUser);

// Delete user
router.delete("/:id", protect, deleteUser);

export default router;
