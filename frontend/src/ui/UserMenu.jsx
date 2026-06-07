import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";

export default function UserMenu({ user }) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    console.log("logout logic here");
    await dispatch(logoutUser());
  };

  return (
    <div className="relative inline-block">
      {/* Clickable user section */}
      <div
        onClick={() => setOpen(!open)}
        className="flex gap-2 items-center text-lg cursor-pointer select-none"
      >
        <FaUserCircle />
        <span>{user.name.toUpperCase()}</span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute -right-10 mt-2 w-40 bg-white  rounded-lg shadow-md overflow-hidden z-50">
          <div
            className=" w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <FaUserCircle />
            <span>Profile</span>
          </div>

          <div
            className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 cursor-pointer"
            onClick={handleLogout}
          >
            <BiLogOut />
            <span>Logout</span>
          </div>
        </div>
      )}
    </div>
  );
}
