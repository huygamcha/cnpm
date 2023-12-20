import express from "express";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getProductByBrand,
  updateBrand,
  getBrandById,
} from "../controllers/brand.controller.js";
import { admin, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").get(getAllBrands).post(protect, admin, createBrand);
//   .get(getBrandById);
router.route("/getBrandById").get(getBrandById);

router
  .route("/:id")
  .get(getProductByBrand)
  .patch(protect, admin, updateBrand)
  .delete(protect, admin, deleteBrand);

export default router;
