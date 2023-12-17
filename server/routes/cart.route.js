import express from "express";
import {
  addCartItem,
  getUserCart,
  deleteCartItem,
} from "../controllers/cart.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .route("/:id")
  .get(protect, getUserCart)
  .delete(protect, deleteCartItem)
  .post(protect, addCartItem);

export default router;
