import { useEffect } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import WishlistItem from "./WishlistItem";
import EmptyWishlist from "./EmptyWishlist";
import {
  fetchWishlist,
  removeWishlistItem,
} from "../../features/auth/wishlistSlice";
import toast from "react-hot-toast";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeWishlistItem(productId));
    toast.success("Product removed from wishlist!");
  };

  if (!loading && items.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 rounded-full p-3">
              <Heart className="text-blue-600" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-500 mt-1">
                {items.length} item{items.length !== 1 ? "s" : ""} saved
              </p>
            </div>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <WishlistItem item={item} key={item._id} onRemove={handleRemove} />
          ))}
        </div>

        {/* Continue Shopping Button */}
        <div className="mt-12 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition flex items-center gap-2 mx-auto">
            <ShoppingBag size={20} />
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
