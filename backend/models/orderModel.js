import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        // price: {
        //   type: Number,
        //   required: true,
        // },
      },
    ],
    shippingInfo: {
      fullName: { type: String, required: true },
      email: { type: String },
      phone: { type: String, required: true },
      city: { type: String, required: true },
      streetName: { type: String, required: true },
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", orderSchema);
