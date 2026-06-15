import { User } from "../models/userModel.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getCart = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("cart.product");

  if (!user) {
    return next(new AppError("Server error!"));
  }

  res.status(200).json({
    status: "success",
    result: user.cart.length,
    data: user.cart,
  });
});

export const addToCart = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;

  const user = await User.findById(req.user._id);

  const existingProduct = user.cart.find(
    (item) => item.product.toString() === productId,
  );

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    user.cart.push({ product: productId, quantity });
  }

  await user.save({ validateBeforeSave: false });
  await user.populate("cart.product");

  res.status(201).json({
    status: "success",
    data: user.cart,
  });
});

export const updateCartItem = catchAsync(async (req, res, next) => {
  const { quantity } = req.body;
  console.log(quantity);

  const user = await User.findById(req.user._id);

  const product = user.cart.find(
    (item) => item.product.toString() === req.params.productId,
  );

  if (!product) {
    return next(new AppError("No product found with this id!", 404));
  }

  // if requested quantity is less than or equal to 0, remove the item
  if (Number(quantity) <= 0) {
    user.cart = user.cart.filter(
      (item) => item.product.toString() !== req.params.productId,
    );
  } else {
    product.quantity = Number(quantity);
  }

  await user.save({ validateBeforeSave: false });
  await user.populate("cart.product");

  res.status(200).json({
    status: "success",
    data: user.cart,
  });
});

export const deleteCartItem = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  user.cart = user.cart.filter(
    (item) => item.product.toString() !== req.params.productId,
  );
  await user.save({ validateBeforeSave: false });
  await user.populate("cart.product");

  res.status(204).json({
    status: "success",
    data: null,
  });
});
