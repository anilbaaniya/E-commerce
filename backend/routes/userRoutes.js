import express from "express";
import {
  forgotPassword,
  login,
  logout,
  protect,
  resetPassword,
  restrictTo,
  signup,
  updateMyPassword,
} from "../controllers/authController.js";
import {
  deleteMe,
  deleteUser,
  getAllUsers,
  getMe,
  getUser,
  updateMe,
} from "../controllers/userController.js";

export const userRoute = express.Router();

userRoute.post("/signup", signup);
userRoute.post("/login", login);
userRoute.post("/logout", logout);

userRoute.post("/forgotPassword", forgotPassword);
userRoute.patch("/resetPassword/:token", resetPassword);
userRoute.patch("/updateMyPassword", protect, updateMyPassword);

userRoute.patch("/updateMe", protect, updateMe);
userRoute.delete("/deleteMe", protect, deleteMe);
userRoute.get("/getMe", protect, getMe);

userRoute.route("/").get(protect, getAllUsers);
userRoute
  .route("/:id")
  .get(getUser)
  .delete(protect, restrictTo("admin"), deleteUser);
