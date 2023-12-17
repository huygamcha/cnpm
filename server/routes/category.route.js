import express from "express";
import {
    createCategory,
    deleteCategory,
    getAllCategory,
    getProductByCategory,
    updateCategory,
} from "../controllers/category.controller.js";
import {admin, protect} from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").get(getAllCategory).post(protect, admin, createCategory);

router
    .route("/:id")
    .get(getProductByCategory)
    .patch(protect, admin, updateCategory)
    .delete(protect, admin, deleteCategory);

export default router;
