import { ShoppingCart, ArrowRight, Heart, Home } from "lucide-react";
import { NavLink } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-4xl p-10 text-center relative overflow-hidden">
      {/* Cart Icon */}
      <div className="relative z-10">
        <div className="w-30 h-30 mx-auto rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-blue-200">
          <ShoppingCart size={60} className="text-white" />
        </div>

        {/* Floating Badge */}
        <div className="absolute top-5 right-[32%] bg-white shadow-lg border border-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-600">
          0 Items
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-10">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          Your Cart is Empty
        </h1>

        <p className="mt-5 text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
          Looks like you haven’t added anything yet. Discover trendy products
          and start shopping now.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-5 mt-10">
          <NavLink
            to="/products"
            className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-6 py-4 rounded-2xl text-lg font-semibold flex items-center gap-3 shadow-lg shadow-blue-200"
          >
            Continue Shopping
            <ArrowRight size={20} />
          </NavLink>

          <NavLink
            to="/"
            className="border border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 px-8 py-4 rounded-2xl text-lg font-medium flex items-center gap-3 bg-white"
          >
            <Home size={20} />
            Go Home
          </NavLink>
        </div>
      </div>

      {/* Wishlist Suggestion */}
      <div className="relative z-10 mt-14 bg-linear-to-r from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="text-left">
          <h4 className="text-2xl font-bold text-gray-900">
            Saved items waiting for you 💙
          </h4>

          <p className="text-gray-500 mt-2">
            Check your wishlist and move products to cart anytime.
          </p>
        </div>

        <button className=" hover:bg-blue-600 hover:text-white transition-all duration-300 border border-gray-200 px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-sm">
          <Heart size={18} />
          View Wishlist
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;
