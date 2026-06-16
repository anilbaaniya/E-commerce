import { FaTimes } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

export default function SideMenu({ open, setOpen }) {
  const location = useLocation();

  const isActive = (gender, subCategory) =>
    location.search === `?gender=${gender}&subCategory=${subCategory}`;

  const active = (category) => location.search === `?category=${category}`;
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
        <div className="p-4 flex flex-col gap-6 ">
          {/* Men Clothing */}
          <div className="flex flex-col gap-2 w-40">
            <h3 className="font-semibold text-gray-700">Men Clothing</h3>

            <NavLink
              // onClick={() => setOpen(false)}
              to="/products?gender=male&subCategory=t-shirts"
              className={`ml-3 px-2 py-1 rounded hover:text-blue-700 ${
                isActive("male", "t-shirts") ? "bg-blue-200 " : ""
              }`}
            >
              T-Shirt
            </NavLink>

            <NavLink
              to="/products?gender=male&subCategory=shirts"
              className={`ml-3 px-2 py-1 rounded hover:text-blue-700 ${
                isActive("male", "shirts") ? "bg-blue-200 " : ""
              }`}
            >
              Shirt
            </NavLink>

            <NavLink
              to="/products?gender=male&subCategory=jackets"
              className={`ml-3 px-2 py-1 rounded hover:text-blue-700 ${
                isActive("male", "jackets") ? "bg-blue-200 " : ""
              }`}
            >
              Jacket
            </NavLink>

            <NavLink
              to="/products?gender=male&subCategory=jeans"
              className={`ml-3 px-2 py-1 rounded hover:text-blue-700 ${
                isActive("male", "jeans") ? "bg-blue-200 " : ""
              }`}
            >
              Jeans Pant
            </NavLink>

            <NavLink
              to="/products?gender=male&subCategory=trousers"
              className={`ml-3 px-2 py-1 rounded hover:text-blue-700 ${
                isActive("male", "trousers") ? "bg-blue-200 " : ""
              }`}
            >
              Trouser
            </NavLink>
          </div>

          {/* Women Clothing */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-gray-700">Women Clothing</h3>

            <NavLink
              to="/products?gender=female&subCategory=t-shirts"
              className={`ml-3 px-2 py-1 rounded hover:text-blue-700 ${
                isActive("female", "t-shirts") ? "bg-blue-200 " : ""
              }`}
            >
              T-Shirt
            </NavLink>

            {/* <NavLink
              to="/products?gender=female&subCategory=jackets"
              className={`ml-3 px-2 py-1 rounded hover:text-blue-700 ${
                isActive("female", "jackets") ? "bg-blue-200 " : ""
              }`}
            >
              Jacket
            </NavLink> */}

            <NavLink
              to="/products?gender=female&subCategory=jeans"
              className={`ml-3 px-2 py-1 rounded hover:text-blue-700 ${
                isActive("female", "jeans") ? "bg-blue-200 " : ""
              }`}
            >
              Jeans Pants
            </NavLink>

            <NavLink
              to="/products?gender=female&subCategory=saree"
              className={`ml-3 px-2 py-1 rounded hover:text-blue-700 ${
                isActive("female", "saree") ? "bg-blue-200 " : ""
              }`}
            >
              Saree
            </NavLink>
            <NavLink
              to="/products?gender=female&subCategory=kurtha"
              className={`ml-3 px-2 py-1 rounded hover:text-blue-700 ${
                isActive("female", "kurtha") ? "bg-blue-200 " : ""
              }`}
            >
              Kurtha
            </NavLink>
          </div>

          {/* Other Categories */}
          <NavLink
            to="/products?category=electronics"
            className={`ml-3 px-2 py-1 rounded hover:text-blue-700 ${
              active("electronics") ? "bg-blue-200 " : ""
            }`}
          >
            Electronic Gadget
          </NavLink>

          <NavLink
            to="/products?category=stationery"
            className={`ml-3 px-2 py-1 rounded hover:text-blue-700 ${
              active("stationery") ? "bg-blue-200 " : ""
            }`}
          >
            Stationery
          </NavLink>
        </div>
      </div>
    </>
  );
}
