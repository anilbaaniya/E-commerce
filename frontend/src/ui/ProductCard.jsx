import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/auth/cartSlice";
import {
  addToWishlist,
  removeWishlistItem,
} from "../features/auth/wishlistSlice";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item._id === product._id);
  const { name, image, originalPrice, discountPercent } = product;
  const price = Math.ceil(
    originalPrice - (originalPrice * discountPercent) / 100,
  );

  const handleAddToCart = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await dispatch(
        addToCart({ productId: product._id, quantity: 1 }),
      ).unwrap();
      setAdded(true);
      toast.success("Product added to Cart");
      setTimeout(() => setAdded(false), 1800);
    } catch (error) {
      toast.error(error);
      console.error("Add to cart failed:", error);
    }
  };

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
    <Link to={`/products/${product._id}`}>
      <div>
        <div className="bg-white border border-stone-100 rounded-lg p-4 shadow-sm">
          <div className="relative">
            <img
              src={image}
              alt={name}
              className="w-full h-48 object-contain rounded-md"
            />
            <span className="absolute top-0 left-0 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
              {`${discountPercent}%`} OFF
            </span>
            <button
              onClick={handleWishlistToggle}
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition"
            >
              {isInWishlist ? (
                <MdFavorite className="text-blue-500 text-xl" />
              ) : (
                <MdFavoriteBorder className="text-gray-400 text-xl hover:text-blue-500" />
              )}
            </button>
          </div>

          <div className="mt-3 flex flex-col gap-1">
            <span className="text-gray-800 font-medium">{name}</span>

            <div className="flex gap-2 items-center">
              <span className="text-green-600 font-semibold">Rs {price}</span>
              <span className=" line-through">Rs {originalPrice}</span>
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-3 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
            >
              <IoCartOutline />
              <span>{added ? "Added!" : "Add to Cart"}</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
