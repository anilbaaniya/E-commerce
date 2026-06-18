import { IoHeart, IoHeartOutline } from "react-icons/io5";

export default function Image({ image, discountPercent, wished, setWished }) {
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
          onClick={() => setWished((w) => !w)}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:scale-110 transition"
        >
          {wished ? (
            <IoHeart className="text-blue-500 text-xl" />
          ) : (
            <IoHeartOutline className="text-gray-400 text-xl" />
          )}
        </button>
      </div>
    </div>
  );
}
