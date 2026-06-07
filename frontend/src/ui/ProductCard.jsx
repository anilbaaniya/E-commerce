import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/auth/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
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
      setTimeout(() => setAdded(false), 1800);
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  return (
    <Link to={`/products/${product._id}`}>
      <div>
        <div className="bg-white border border-stone-100 rounded-lg p-4 shadow-sm">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover rounded-md"
          />

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
