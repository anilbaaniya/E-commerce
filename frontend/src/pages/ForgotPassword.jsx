import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Reset link sent to:", email);

    // Later: call backend API
    // await axios.post("/api/auth/forgot-password", { email })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="w-full max-w-md p-8 border border-gray-200 rounded-lg shadow-sm">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2">Forgot Password</h2>

        <p className="text-sm text-center text-gray-600 mb-6">
          Enter your email and we’ll send you a reset link
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to login */}
        <p className="text-sm text-center mt-4 text-gray-600">
          Remember your password?{" "}
          <NavLink to="/login" className="text-blue-600 hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}
