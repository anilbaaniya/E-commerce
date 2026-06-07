import { useState } from "react";
import { FaBars } from "react-icons/fa";
import SideMenu from "./SideMenu";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <nav className="text-black font-semibold py-2 flex items-center gap-20  ">
        {/* Categories Button */}
        <div className="transition-all duration-200 hover:text-blue-700 ">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <FaBars />
            <span>Categories</span>
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex gap-10">
          <NavLink
            to="/"
            className="hover:-translate-y-1 transition-all duration-200 hover:text-blue-700 "
          >
            Home
          </NavLink>
          <NavLink
            to="bestSeller"
            className="hover:-translate-y-1 transition-all duration-200 hover:text-blue-700 "
          >
            Best Sellers
          </NavLink>
          <NavLink
            to="trending"
            className="hover:-translate-y-1 transition-all duration-200 hover:text-blue-700 "
          >
            Trending
          </NavLink>
          <NavLink
            to="contact"
            className="hover:-translate-y-1 transition-all duration-200 hover:text-blue-700 "
          >
            Contact Us
          </NavLink>
        </div>
      </nav>

      {/* Sidebar */}
      <SideMenu open={open} setOpen={setOpen} />
    </div>
  );
}
