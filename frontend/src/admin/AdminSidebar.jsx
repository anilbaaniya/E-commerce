import { FaBoxOpen, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 p-5 border-r border-stone-300">
      <h2 className="text-2xl font-bold mb-10">E-Commerce Admin</h2>

      <ul className="space-y-3">
        <NavLink
          to="products"
          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition-all duration-200cursor-pointer"
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

        <NavLink className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition-all duration-200">
          <FaSignOutAlt />
          Logout
        </NavLink>
      </ul>
    </div>
  );
}
