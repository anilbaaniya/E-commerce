import { Heart, ArrowRight, Home, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmptyWishlist = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-4xl p-10 text-center relative overflow-hidden my-20">
      {/* Heart Icon */}
      <div className="relative z-10">
        <div className="w-30 h-30 mx-auto rounded-full bg-linear-to-br from-red-500 to-red-600 flex items-center justify-center shadow-2xl shadow-red-200">
          <Heart size={60} className="text-white fill-white" />
        </div>

        {/* Floating Badge */}
        <div className="absolute top-5 right-[32%] bg-white shadow-lg border border-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-red-600">
          0 Items
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-10">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          Your Wishlist is Empty
        </h1>

        <p className="mt-5 text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
          You haven't added any items to your wishlist yet. Explore our
          collection and save your favorite products!
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-5 mt-10 flex-wrap">
          <button
            onClick={() => navigate("/products")}
            className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-6 py-4 rounded-2xl text-lg font-semibold flex items-center gap-3 shadow-lg shadow-blue-200"
          >
            <ShoppingCart size={20} />
            Start Shopping
            <ArrowRight size={20} />
          </button>

          <button
            onClick={() => navigate("/")}
            className="border border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 px-8 py-4 rounded-2xl text-lg font-medium flex items-center gap-3 bg-white"
          >
            <Home size={20} />
            Go Home
          </button>
        </div>
      </div>

      {/* Suggestion Box */}
      <div className="relative z-10 mt-14 bg-linear-to-r from-red-50 to-pink-50 rounded-3xl p-6 border border-red-100 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="text-left">
          <h4 className="text-2xl font-bold text-gray-900">
            Ready to start saving? 💝
          </h4>

          <p className="text-gray-500 mt-2">
            Add your favorite products to wishlist and get notified on sales!
          </p>
        </div>

        <button
          onClick={() => navigate("/products")}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition"
        >
          Explore Products
        </button>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"></div>
    </div>
  );
};

export default EmptyWishlist;
