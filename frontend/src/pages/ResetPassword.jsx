import { useState } from "react";
import { resetPassword } from "../services/authServices";
import toast from "react-hot-toast";
import { NavLink, useParams } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Later: call backend API
    // await axios.post(`/api/auth/reset-password/${token}`, { password })
    try {
      await resetPassword({ password, confirmPassword }, token);
      toast.success("Password reset successfully");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="w-full max-w-md p-8 border border-gray-200 rounded-lg shadow-sm">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2">Reset Password</h2>

        <p className="text-sm text-center text-gray-600 mb-6">
          Enter your new password below
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              New Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm new password"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
          >
            Reset Password
          </button>
        </form>

        {/* Back to login */}
        <NavLink
          to="/login"
          className="text-sm text-center mt-4  text-blue-600 hover:underline"
        >
          Login
        </NavLink>
      </div>
    </div>
  );
}
