import express from "express";
import {
    createProduct,
    createReview,
    deleteProduct,
    getProductById,
    getProducts,
    getSale,
    getTopProducts,
    updateProduct,
} from "../controllers/product.controler.js";
import {protect, admin} from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/top").get(getTopProducts);
router.route("/sale").get(getSale);

router
    .route("/:id")
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct);

router.route("/:id/review").post(protect, createReview);

export default router;
