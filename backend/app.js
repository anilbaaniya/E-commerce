import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { userRoute } from "./routes/userRoutes.js";
import { productRoute } from "./routes/productRoutes.js";
import morgan from "morgan";
import { AppError } from "./utils/appError.js";
import { globalErrorHandler } from "./controllers/errorController.js";
import { cartRoute } from "./routes/cartRoute.js";
import { signRouter } from "./routes/signatureRoute.js";
import { orderRoute } from "./routes/orderRoute.js";
import { wishlistRoute } from "./routes/wishlistRoute.js";

export const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://your-vercel-app.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/wishlist", wishlistRoute);
app.use("/api/v1/order", orderRoute);

app.use("/api/sign-upload", signRouter);

app.use((req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);
