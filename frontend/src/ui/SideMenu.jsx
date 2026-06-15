import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function SideMenu({ open, setOpen }) {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-stone-50 shadow-lg z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-lg">Categories</h2>

          <button
            onClick={() => setOpen(false)}
            className="cursor-pointer transition-all duration-200 hover:text-blue-700"
          >
            <FaTimes />
          </button>
        </div>

        {/* Menu Items */}
        <div className="p-4 flex flex-col gap-6">
          {/* Men Clothing */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-gray-700">Men Clothing</h3>

            <NavLink
              // onClick={() => setOpen(false)}
              to="/products?gender=male&subCategory=t-shirts"
              className="ml-3 hover:text-blue-700"
            >
              T-Shirt
            </NavLink>

            <NavLink
              to="/products?gender=male&subCategory=shirts"
              className="ml-3 hover:text-blue-700"
            >
              Shirt
            </NavLink>

            <NavLink
              to="/products?gender=male&subCategory=jackets"
              className="ml-3 hover:text-blue-700"
            >
              Jacket
            </NavLink>

            <NavLink
              to="/products?gender=male&subCategory=jeans"
              className="ml-3 hover:text-blue-700"
            >
              Jeans Pant
            </NavLink>

            <NavLink
              to="/products?gender=male&subCategory=trousers"
              className="ml-3 hover:text-blue-700"
            >
              Trouser
            </NavLink>
          </div>

          {/* Women Clothing */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-gray-700">Women Clothing</h3>

            <NavLink
              to="/products?gender=female&subCategory=t-shirts"
              className="ml-3 hover:text-blue-700"
            >
              T-Shirt
            </NavLink>

            <NavLink
              to="/products?gender=female&subCategory=jackets"
              className="ml-3 hover:text-blue-700"
            >
              Jacket
            </NavLink>

            <NavLink
              to="/products?gender=female&subCategory=jeans"
              className="ml-3 hover:text-blue-700"
            >
              Jeans Pants
            </NavLink>

            <NavLink
              to="/products?gender=female&subCategory=saree"
              className="ml-3 hover:text-blue-700"
            >
              Saree
            </NavLink>
            <NavLink
              to="/products?gender=female&subCategory=kurtha"
              className="ml-3 hover:text-blue-700"
            >
              Kurtha
            </NavLink>
          </div>

          {/* Other Categories */}
          <NavLink
            to="/products?category=electronics"
            className="transition-all duration-200 hover:text-blue-700"
          >
            Electronics
          </NavLink>

          <NavLink
            to="/products?category=stationery"
            className="transition-all duration-200 hover:text-blue-700"
          >
            Books and Stationery
          </NavLink>
        </div>
      </div>
    </>
  );
}
