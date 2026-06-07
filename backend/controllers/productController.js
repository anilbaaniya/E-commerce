import { Product } from "../models/productModel.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const createProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    data: product,
  });
});

export const getAllProducts = catchAsync(async (req, res, next) => {
  const { category, subCategory, gender, featured, trending, bestSeller } =
    req.query;

  const filter = { isActive: true };

  if (category) {
    // match category case-insensitively
    filter.category = { $regex: new RegExp(`^${category}$`, "i") };
  }

  if (subCategory) {
    // match subCategory case-insensitively
    filter.subCategory = { $regex: new RegExp(`^${subCategory}$`, "i") };
  }

  if (gender) {
    // gender values in DB may be 'male'|'female'|'unisex' - match case-insensitively
    filter.gender = { $regex: new RegExp(`^${gender}$`, "i") };
  }

  if (featured === "true") {
    filter.isFeatured = true;
  }

  if (trending === "true") {
    filter.trending = true;
  }

  if (bestSeller === "true") {
    filter.bestSeller = true;
  }

  const products = await Product.find(filter);

  res.status(200).json({
    status: "success",
    result: products.length,
    data: products,
  });
});

export const getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("No product found with this id!", 404));
  }

  res.status(200).json({
    status: "success",
    data: product,
  });
});

export const updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError("No product found with this id!", 404));
  }

  res.status(200).json({
    status: "success",
    data: product,
  });
});

export const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError("No product found with this id!", 404));
  }

  res.status(204).json({ status: "success", data: null });
});

export const getFeaturedProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({ isFeatured: true });
  if (!products) {
    return next(new AppError("No featured Products"));
  }
  res.status(200).json({
    status: "success",
    result: products.length,
    data: products,
  });
});

export const getTrendingProduct = catchAsync(async (req, res, next) => {
  const products = await Product.find({ trending: true });
  if (!products) {
    return next(new AppError("No Trending Products"));
  }
  res.status(200).json({
    status: "success",
    result: products.length,
    data: products,
  });
});

export const getBestSellerProduct = catchAsync(async (req, res, next) => {
  const products = await Product.find({ bestSeller: true });
  if (!products) {
    return next(new AppError("No Best Seller Products"));
  }
  res.status(200).json({
    status: "success",
    result: products.length,
    data: products,
  });
});
