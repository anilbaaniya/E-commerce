import express from "express";
import { protect } from "../controllers/authController.js";
import {
  addToWishlist,
  deleteWishlistItem,
  getWishlist,
} from "../controllers/wishListController.js";

export const wishlistRoute = express.Router();

wishlistRoute.route("/").get(protect, getWishlist).post(protect, addToWishlist);

wishlistRoute.route("/:productId").delete(protect, deleteWishlistItem);
