import { Heart, Minus, Plus, Trash2 } from "lucide-react";

export default function CartItem({ item, onDecrease, onIncrease, onRemove }) {
  const product = item.product || item;
  const quantity = item.quantity || item.qty || 1;
  const { name, image, price, originalPrice, color, size } = product;

  return (
    <div className="bg-stone-50 rounded-2xl p-5 hover:shadow-md transition">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image */}
        <div className="w-35 h-35 bg-gray-100 rounded-2xl overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex justify-between gap-3">
            {/* Info */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{name}</h3>

              <div className="mt-2 text-gray-500 space-y-1">
                {size && <p>Size: {size}</p>}
                {color && <p>Color: {color}</p>}
              </div>

              <p className="text-green-600 font-medium mt-3">In Stock</p>

              <button className="mt-4 flex items-center gap-2 text-sm border px-4 py-2 rounded-xl hover:bg-gray-100">
                <Heart size={16} />
                Move to Wishlist
              </button>
            </div>

            {/* Price + Qty */}
            <div className="flex flex-col items-end gap-4">
              <div>
                <p className="text-2xl font-bold text-gray-900">₹{price}</p>

                {originalPrice && (
                  <p className="line-through text-gray-400 text-sm">
                    ₹{originalPrice}
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div className="flex items-center border rounded-xl overflow-hidden">
                <button
                  onClick={() => onDecrease(product._id, quantity)}
                  className="px-4 py-3 hover:bg-gray-100"
                >
                  <Minus size={14} />
                </button>

                <span className="px-2 font-medium">{quantity}</span>

                <button
                  onClick={() => onIncrease(product._id, quantity)}
                  className="px-4 py-3 hover:bg-gray-100"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={() => onRemove(product._id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
