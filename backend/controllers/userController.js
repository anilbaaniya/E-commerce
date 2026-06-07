import { User } from "../models/userModel.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

const filterObj = (obj, ...allowedField) => {
  let newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedField.includes(el)) newObj[el] = obj[el];
  });
};

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    result: users.length,
    data: users,
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("There is not user with this id!", 400));
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError("There is no user with this id!", 400));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        "This route is not for update password. Please try this route /updateMyPassword",
      ),
    );
  }

  // 2) Filtered out the unwanted fields name that are not allowed to update
  const filteredBody = filterObj(req.body, "name", "email");

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    returnDocument: after,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

export const getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user);
  if (!user) {
    return next(new AppError("No user found!", 400));
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { active: false },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );

  res.status(204).json({
    status: "success",
    data: null,
  });
});
