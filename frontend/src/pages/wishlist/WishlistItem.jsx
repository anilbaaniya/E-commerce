import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/auth/cartSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function WishlistItem({ item, onRemove }) {
  const dispatch = useDispatch();
  const product = item || {};
  const { _id, name, image, originalPrice, discountPercent } = product;

  const price = Math.ceil(
    originalPrice - (originalPrice * discountPercent) / 100,
  );

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addToCart({ productId: _id, quantity: 1 })).unwrap();
      toast.success("Added to Cart");
      onRemove(_id);
    } catch (error) {
      toast.error("Failed to add to cart");
      console.error("Add to cart failed:", error);
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    onRemove(_id);
  };

  return (
    <Link to={`/products/${_id}`}>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
        {/* Image Container */}
        <div className="relative h-56 bg-gray-100 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain hover:scale-110 transition duration-300"
          />

          {/* Discount Badge */}
          <div className="absolute top-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            -{discountPercent}%
          </div>

          {/* Wishlist Heart Badge */}
          <div className="absolute top-3 left-3 bg-blue-100 rounded-full p-2">
            <Heart className="text-blue-600 fill-blue-600" size={20} />
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Name */}
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {name}
          </h3>

          {/* Pricing */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xl font-bold text-green-600">Rs {price}</span>
            <span className="line-through text-gray-400 text-sm">
              Rs {originalPrice}
            </span>
          </div>

          {/* Stock Status */}
          <p className="text-green-600 text-sm font-medium mt-2">In Stock</p>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-semibold flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>

            <button
              onClick={handleRemove}
              className="px-4 py-2 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
