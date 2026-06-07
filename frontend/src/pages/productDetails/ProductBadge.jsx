import { IoCarOutline, IoShieldCheckmarkOutline } from "react-icons/io5";

export default function ProductBadge() {
  return (
    <div className="grid grid-cols-3 gap-2 mt-1">
      {[
        { icon: <IoShieldCheckmarkOutline />, text: "Cash on Delivery" },
        // { icon: <IoRefreshOutline />, text: "Easy Returns" },
        { icon: <IoCarOutline />, text: "Free Delivery" },
      ].map((b, i) => (
        <div
          key={i}
          className="flex flex-col items-center gap-1 text-center p-2 bg-white rounded-lg border border-stone-100 shadow-sm"
        >
          <span className="text-blue-600 text-xl">{b.icon}</span>
          <span className="text-xs text-gray-500">{b.text}</span>
        </div>
      ))}
    </div>
  );
}
