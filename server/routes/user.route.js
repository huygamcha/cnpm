import express from "express";
import {
    deleteUser,
    getAllUsers,
    getUserById,
    getUserProfile,
    updatePrivateUser,
    updateUser,
} from "../controllers/user.controller.js";
import {protect, admin} from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").get(protect, admin, getAllUsers);
router
    .route("/:id")
    .delete(protect, admin, deleteUser)
    .get(protect, getUserById)
    .put(protect, admin, updatePrivateUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUser);

export default router;
