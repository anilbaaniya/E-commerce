import { Order } from "../models/orderModel.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const createOrder = catchAsync(async (req, res, next) => {
  const order = await Order.create({
    user: req.user._id,
    products: req.body.products,
    quantity: req.body.quantity,
    totalPrice: req.body.totalPrice,
  });

  if (!order) {
    return next(new AppError("New order cannot be created!", 500));
  }

  res.status(201).json({
    status: "success",
    data: order,
  });
});

export const getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("products.productId", "name price");
  if (!orders || orders.length === 0) {
    return next(new AppError("No order found!", 404));
  }

  res.status(200).json({
    status: "success",
    result: orders.length,
    data: orders,
  });
});

export const getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate("products.productId", "name price");
  if (!order) {
    return next(new AppError("Order not found with this id!", 404));
  }

  res.status(200).json({
    status: "success",
    data: order,
  });
});
export const deleteOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(new AppError("Order not found with this id!", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const updateOrder = catchAsync(async (req, res, next) => {});
