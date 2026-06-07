export default function QuantitySelect({ quantity, setQuantity }) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-700 mb-2">Quantity</p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="w-9 h-9 rounded-md border border-stone-200 bg-white text-gray-700 text-lg font-bold hover:border-blue-400 transition flex items-center justify-center"
        >
          −
        </button>
        <span className="w-8 text-center font-semibold text-gray-800 text-lg">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="w-9 h-9 rounded-md border border-stone-200 bg-white text-gray-700 text-lg font-bold hover:border-blue-400 transition flex items-center justify-center"
        >
          +
        </button>
        <span className="text-sm text-gray-400 ml-1">In Stock</span>
      </div>
    </div>
  );
}
