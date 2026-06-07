import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getBestSellerProduct,
  getFeaturedProducts,
  getProduct,
  getTrendingProduct,
  updateProduct,
} from "../controllers/productController.js";
import { protect } from "../controllers/authController.js";

export const productRoute = express.Router();

productRoute.get("/featured-products", getFeaturedProducts);
productRoute.get("/trending-products", getTrendingProduct);
productRoute.get("/bestSeller-products", getBestSellerProduct);

productRoute.route("/").post(protect, createProduct).get(getAllProducts);
productRoute
  .route("/:id")
  .get(getProduct)
  .patch(protect, updateProduct)
  .delete(protect, deleteProduct);
