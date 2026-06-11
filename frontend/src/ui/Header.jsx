import { FaShoppingBag } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineLogin } from "react-icons/md";
import NavBar from "./NavBar";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";

export default function Header() {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-50 bg-white ">
      <div className=" mx-auto py-2 flex items-center justify-between gap-6 border-b border-gray-200 ">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 min-w-fit">
          <FaShoppingBag className="text-blue-600 text-2xl" />
          <span className="text-2xl font-bold tracking-tight ">
            <span className="text-gray-900">Shop</span>
            <span className="text-blue-600">Ease</span>
          </span>
        </NavLink>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl relative group">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full pl-5 pr-12 py-2.5 rounded-full border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all duration-200"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-1.5 transition-colors duration-200">
            <IoIosSearch className="text-base" />
          </button>
        </div>

        {user?.role === "admin" && (
          <div>
            <NavLink
              to="/admin/products"
              className=" block w-38 text-stone-100 py-2 px-6 text-lg bg-blue-700 rounded-full cursor-pointer hover:bg-blue-600 transition-all duration-200"
            >
              Admin Panel
            </NavLink>
          </div>
        )}

        {/* Nav Actions */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-1">
            {/* Wishlist */}
            <button className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl hover:bg-gray-50 group transition-colors duration-200 cursor-pointer">
              <div className="relative">
                <CiHeart className="text-2xl text-gray-700 group-hover:text-blue-600 transition-colors duration-200" />
              </div>
              <span className="text-xs font-medium text-gray-600 group-hover:text-blue-600 transition-colors duration-200">
                Wishlist
              </span>
            </button>

            {/* Cart */}
            <NavLink
              to="cart"
              className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl hover:bg-gray-50 group transition-colors duration-200 cursor-pointer relative"
            >
              <div className="relative">
                <IoCartOutline className="text-2xl text-gray-700 group-hover:text-blue-600 transition-colors duration-200" />
                <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                  3
                </span>
              </div>
              <span className="text-xs font-medium text-gray-600 group-hover:text-blue-600 transition-colors duration-200">
                Cart
              </span>
            </NavLink>

            {/* Divider */}
            {/* <div className="w-px h-8 bg-gray-200 mx-1" /> */}
          </div>
          {/* Login */}
          {user?.name ? (
            <UserMenu user={user} />
          ) : (
            <div>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors duration-200 cursor-pointer shadow-sm shadow-blue-200">
                <MdOutlineLogin className="text-base" />
                <NavLink to="/login">Login</NavLink>
              </button>
            </div>
          )}
        </div>
      </div>
      <NavBar />
    </header>
  );
}
