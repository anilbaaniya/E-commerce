import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { RiArrowDropDownFill } from "react-icons/ri";

import toast from "react-hot-toast";
import Profile from "../pages/profile/Profile";

export default function UserMenu({ user }) {
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeProfile = () => setShowProfile(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.success("Logged out successfully!");
  };

  const openProfile = (e) => {
    e.stopPropagation();
    setShowProfile(true);
    setMenuOpen(false);
  };

  return (
    <div className="relative inline-block ">
      {/* User Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 text-lg select-none cursor-pointer"
      >
        <FaUserCircle />
        <span>{user?.name?.toUpperCase()}</span>
        <RiArrowDropDownFill />
      </button>

      {/* Dropdown */}
      {menuOpen && (
        <div className="absolute -right-10 mt-2 w-40 bg-white rounded-lg shadow-md z-50 overflow-hidden">
          <button
            onClick={openProfile}
            className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100"
          >
            <FaUserCircle />
            Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-500 hover:bg-gray-100"
          >
            <BiLogOut />
            Logout
          </button>
        </div>
      )}

      {/* Profile Panel */}
      {showProfile && (
        <div className="fixed inset-0 z-50 flex" onClick={closeProfile}>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

          {/* Side Panel */}
          <div
            className="ml-auto w-100 h-full bg-white shadow-xl relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeProfile}
              className="absolute top-3 right-3 text-2xl text-gray-600 hover:text-black"
            >
              <IoClose />
            </button>

            <div className="h-full p-4">
              <Profile />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
