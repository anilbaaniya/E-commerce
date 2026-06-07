import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A user must have name."],
    },

    email: {
      type: String,
      required: [true, "A user must have email."],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "A user must have password."],
      minLength: [8, "The length of password should be at least 8 character."],
      select: false,
    },

    confirmPassword: {
      type: String,
      required: [true, "A user must have password."],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Password are not same.",
      },
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "Role must be either user or admin.",
      },
      default: "user",
    },

    cart: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    wishlist: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  // if the password is not modified then this middleware does not do anything
  if (!this.isModified("password")) return;

  // hash the password with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // remove the confirmPassword field
  this.confirmPassword = undefined;
});

userSchema.pre("save", async function () {
  // Run only if password was modified and document is not new
  if (!this.isModified("password") || this.isNew) {
    return;
  }
  // Set changedPasswordAt slightly in the past
  this.changedPasswordAt = Date.now() - 1000;
});

userSchema.pre(/^find/, async function () {
  this.find({ active: { $ne: false } });
});

userSchema.methods.correctPassword = async function (
  enteredPassword,
  userPassword,
) {
  return bcrypt.compare(enteredPassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (tokenIssuedAt) {
  if (this.passwordChangedAt) {
    const passwordChangedTime = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return tokenIssuedAt < passwordChangedTime;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // console.log(resetToken, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

export const User = mongoose.model("User", userSchema);
