import express from "express";
import { protect, admin } from "../middleware/auth.js";
import { deleteUser, getUsers, updateProfile, updateUser } from "../controllers/userController.js";
const router = express.Router();
router.put("/profile", protect, updateProfile);
router.get("/", protect, admin, getUsers);
router.put("/:id", protect, admin, updateUser);
router.delete("/:id", protect, admin, deleteUser);
export default router;
