import { catchAsync } from "../utils/catchAsync.js";
import { User } from "../models/userModel.js";

export const getWishlist = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("wishlist");

  if (!user) {
    return next(new AppError("User not found!", 404));
  }

  res.status(200).json({
    status: "success",
    result: user.wishlist.length,
    data: user.wishlist,
  });
});

export const addToWishlist = catchAsync(async (req, res, next) => {
  const { productId } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError("User not found!", 404));
  }

  // FIX: wishlist stores ONLY ObjectIds
  const existingProduct = user.wishlist.find(
    (item) => item.toString() === productId,
  );

  if (existingProduct) {
    return res.status(200).json({
      status: "success",
      message: "Product already in wishlist",
      data: user.wishlist,
    });
  }

  // add product
  user.wishlist.push(productId);

  await user.save({ validateBeforeSave: false });

  await user.populate("wishlist");

  res.status(201).json({
    status: "success",
    data: user.wishlist,
  });
});

export const deleteWishlistItem = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError("User not found!", 404));
  }

  user.wishlist = user.wishlist.filter(
    (item) => item.toString() !== req.params.productId,
  );

  await user.save({ validateBeforeSave: false });

  await user.populate("wishlist");

  res.status(204).json({
    status: "success",
    data: null,
  });
});
