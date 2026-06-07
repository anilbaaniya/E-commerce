import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
} from "../controllers/orderController.js";
import { protect } from "../controllers/authController.js";

export const orderRoute = express.Router();

orderRoute.route("/").post(protect, createOrder).get(protect, getAllOrders);
orderRoute.route("/:id").get(protect, getOrder).delete(protect, deleteOrder);
