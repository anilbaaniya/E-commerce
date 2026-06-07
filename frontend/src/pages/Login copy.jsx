import { Form, NavLink, useActionData } from "react-router-dom";

export default function Login() {
  const errors = useActionData();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="w-full max-w-md p-8 border border-gray-200 rounded-lg shadow-sm">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to Your Account
        </h2>

        {/* Form */}
        <Form method="POST" className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <p className="text-red-600 text-sm pl-4">{errors?.message}</p>
          {/* Forgot Password */}
          <div className="text-right">
            <NavLink
              to="/forgotPassword"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </NavLink>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
          >
            Login
          </button>
        </Form>

        {/* Extra */}
        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <NavLink to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
}
