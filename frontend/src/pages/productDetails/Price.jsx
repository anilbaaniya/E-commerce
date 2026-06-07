export default function Price({ price, originalPrice }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-2xl font-bold text-green-600">
        {" "}
        {`Rs ${price}`}
      </span>
      <span className="text-lg text-gray-400 line-through">
        {`Rs ${originalPrice}`}
      </span>
      <span className="text-sm bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">
        Save Rs {originalPrice - price}
      </span>
    </div>
  );
}
