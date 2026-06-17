import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { userRoute } from "./routes/userRoutes.js";
import { productRoute } from "./routes/productRoutes.js";
import { cartRoute } from "./routes/cartRoute.js";
import { orderRoute } from "./routes/orderRoute.js";
import { wishlistRoute } from "./routes/wishlistRoute.js";
import { signRouter } from "./routes/signatureRoute.js";

import { AppError } from "./utils/appError.js";
import { globalErrorHandler } from "./controllers/errorController.js";

export const app = express();

app.set("trust proxy", 1);

const allowedOrigins = [
  "http://localhost:5173",
  "https://e-commerce-seven-theta-58.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // mobile / postman

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/wishlist", wishlistRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/sign-upload", signRouter);

// 404 handler
app.use((req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server.`, 404));
});

// global error handler
app.use(globalErrorHandler);

// import express, { json } from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// import { userRoute } from "./routes/userRoutes.js";
// import { productRoute } from "./routes/productRoutes.js";
// import morgan from "morgan";
// import { AppError } from "./utils/appError.js";
// import { globalErrorHandler } from "./controllers/errorController.js";
// import { cartRoute } from "./routes/cartRoute.js";
// import { signRouter } from "./routes/signatureRoute.js";
// import { orderRoute } from "./routes/orderRoute.js";
// import { wishlistRoute } from "./routes/wishlistRoute.js";

// export const app = express();

// app.set("trust proxy", 1);

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://e-commerce-seven-theta-58.vercel.app",
// ];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//   }),
// );
// app.use(express.json());
// app.use(cookieParser());

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// app.use("/api/v1/users", userRoute);
// app.use("/api/v1/products", productRoute);
// app.use("/api/v1/cart", cartRoute);
// app.use("/api/v1/wishlist", wishlistRoute);
// app.use("/api/v1/order", orderRoute);

// app.use("/api/sign-upload", signRouter);

// app.use((req, res, next) => {
//   next(new AppError(`Cannot find ${req.originalUrl} on this server.`, 404));
// });

// app.use(globalErrorHandler);
