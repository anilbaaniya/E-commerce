export default function Price({ discountPercent, originalPrice }) {
  const price = originalPrice - (originalPrice * discountPercent) / 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-2xl font-bold text-green-600">
        Rs {Math.ceil(price)}
      </span>
      <span className="text-lg text-gray-400 line-through">
        Rs {Math.ceil(originalPrice)}
      </span>
      <span className="text-sm bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">
        Save Rs {Math.ceil(originalPrice - price)}
      </span>
    </div>
  );
}
