import { FaBoxOpen, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice.js";
import { useDispatch } from "react-redux";

export default function AdminSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-64 p-5 border-r border-stone-300 bg-white sticky top-0 h-screen overflow-hidden">
      <h2 className="text-2xl font-bold mb-10">E-Commerce Admin</h2>

      <ul className="space-y-3" id="admin">
        <NavLink
          to="products"
          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition-all duration-200"
        >
          <FaBoxOpen />
          Products
        </NavLink>

        <NavLink
          to="orders"
          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition-all duration-200"
        >
          <FaTachometerAlt />
          Orders
        </NavLink>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition-all duration-200"
        >
          <FaSignOutAlt />
          Logout
        </button>
        <NavLink
          to="/"
          className=" block w-40 text-stone-100 py-3 px-8 text-lg bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-600 transition-all duration-200"
        >
          User Panel
        </NavLink>
      </ul>
    </div>
  );
}
