const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function SizeSelect({ selectedSize, setSelectedSize }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-semibold text-gray-700">Size</p>
      </div>
      <div className="flex gap-2 flex-wrap">
        {SIZES.map((s) => (
          <button
            key={s}
            onClick={() => setSelectedSize(s)}
            className={`w-12 h-10 rounded-md border text-sm font-medium transition ${
              selectedSize === s
                ? "bg-blue-600 text-white border-blue-600 shadow"
                : "bg-white text-gray-700 border-stone-200 hover:border-blue-400"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
