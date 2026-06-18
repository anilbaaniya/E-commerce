import { removeWishlistItem } from "../../features/auth/wishlistSlice.js";
import { addToWishlist } from "../../features/auth/wishlistSlice.js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

export default function Image({
  image,
  discountPercent,

  product,
}) {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item._id === product._id);
  const dispatch = useDispatch();

  const handleWishlistToggle = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      if (isInWishlist) {
        await dispatch(removeWishlistItem(product._id)).unwrap();
        toast.success("Removed from Wishlist");
      } else {
        await dispatch(addToWishlist(product._id)).unwrap();
        toast.success("Added to Wishlist");
      }
    } catch (error) {
      toast.error(
        isInWishlist
          ? "Failed to remove from wishlist"
          : "Failed to add to wishlist",
      );
      console.error("Wishlist operation failed:", error);
    }
  };
  return (
    <div className="flex gap-3">
      {/* Main Image */}
      <div className="flex-1 relative rounded-xl overflow-hidden border border-stone-100 shadow-sm bg-white">
        <img
          src={image}
          alt="Casual Shirt"
          className="w-full h-105 object-contain transition-all duration-300"
        />
        {/* Discount badge */}
        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
          {`${discountPercent}%`} OFF
        </span>
        {/* Wishlist */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:scale-110 transition"
        >
          {isInWishlist ? (
            <MdFavorite className="text-blue-500 text-xl" />
          ) : (
            <MdFavoriteBorder className="text-gray-400 text-xl hover:text-blue-500" />
          )}
        </button>
      </div>
    </div>
  );
}
