import crypto from "crypto";
import { catchAsync } from "../utils/catchAsync.js";
import { User } from "../models/userModel.js";
import jwt, { decode } from "jsonwebtoken";
import { AppError } from "../utils/appError.js";
// import { sendEmail } from "../utils/email.js";
import { sendEmail } from "../utils/resendEmail.js";

const signInToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signInToken(user._id);
  const tokenOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  res.cookie("jwt", token, tokenOptions);

  // this removes the password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: user,
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    role: req.body.role,
  });

  createSendToken(user, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password exists
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }
  // 2) Check if user exists and password correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password!", 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

export const protect = catchAsync(async (req, res, next) => {
  let token;

  // 1) Get token and check of it's there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    // console.log("Token exists", token);
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("You are not logged in. Please login!", 401));
  }

  // 2) Verification Token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   console.log(decoded);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exists.",
        401,
      ),
    );
  }

  // 4) Check if user changed password after token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "User has recently changed the password. Please login again!",
        401,
      ),
    );
  }
  req.user = currentUser;
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    console.log(req.user);
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action.", 403),
      );
    }
    next();
  };
};

export const forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("There is no user with this email address.", 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  // console.log(resetToken);
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetUrl = `http://localhost:5173/resetPassword/${resetToken}`;

  const message = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2>Password Reset Request</h2>

    <p>We received a request to reset your password.</p>

    <p>This link is valid for <b>10 minutes</b>.</p>

    <a href="${resetUrl}" 
       style="display:inline-block;padding:12px 20px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:6px;">
      Reset Password
    </a>

    <p style="margin-top:20px;">
      If you did not request this, you can safely ignore this email.
    </p>

    <hr />
    <small>ShopEase Security Team</small>
  </div>
`;

  console.log(user.email);
  try {
    await sendEmail({
      to: user.email,
      subject: "Your password reset token (valid for 10 minutes)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token send to email",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: true });

    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500,
      ),
    );
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Invalid token or token has expired!", 400));
  }

  // 2) If token has not expired and user exist, set the new password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update the changedPasswordAt property for the use

  // 4) Log the user in and send JWT
  createSendToken(user, 200, res);
});

export const updateMyPassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user._id).select("+password");

  // 2) Check if POSTed current password is correct
  const isCorrect = await user.correctPassword(
    req.body.currentPassword,
    user.password,
  );

  if (!isCorrect) {
    return next(new AppError("Your current password is wrong!", 401));
  }
  // 3) If so update password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();

  // 4) Log user in, send jwt
  createSendToken(user, 200, res);
});

export const logout = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // instantly expires
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};
