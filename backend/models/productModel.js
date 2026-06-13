import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have name."],
    },
    originalPrice: {
      type: Number, // for showing strikethrough price
    },
    description: {
      type: String,
      required: [true, "A product must have description."],
    },
    image: {
      type: String,
      required: [true, "A product must have image."],
    },
    category: {
      type: String,
      required: true,
      index: true,
    },

    subCategory: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "unisex"],
    },
    rating: {
      type: Number,
      default: 3,
      min: 0,
      max: 5,
    },
    stock: {
      type: Boolean,
      default: true,
    },
    discountPercent: {
      type: Number,
      min: 0,
      max: 100,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
    trending: {
      type: Boolean,
      default: false,
    },
    bestSeller: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Product = mongoose.model("Product", productSchema);
