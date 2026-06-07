import express from "express";
import {
  addToCart,
  deleteCartItem,
  getCart,
  updateCartItem,
} from "../controllers/cartController.js";
import { protect } from "../controllers/authController.js";

export const cartRoute = express.Router();

cartRoute.route("/").get(protect, getCart).post(protect, addToCart);
cartRoute
  .route("/:productId")
  .patch(protect, updateCartItem)
  .delete(protect, deleteCartItem);
