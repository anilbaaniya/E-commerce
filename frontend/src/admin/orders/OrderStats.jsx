import { Box, DollarSign, Package, Truck } from "lucide-react";

const stats = [
  {
    title: "Total Orders",

    icon: <Package size={24} className="text-blue-600" />,
  },
  {
    title: "Total Revenue",
    value: "$32,450.80",
    icon: <DollarSign size={24} className="text-blue-600" />,
  },
  {
    title: "Pending Orders",
    value: "156",
    icon: <Box size={24} className="text-blue-600" />,
  },
  {
    title: "Delivered Orders",
    value: "1,092",
    icon: <Truck size={24} className="text-blue-600" />,
  },
];

export default function OrderStats({ orders }) {
  const pending = orders.filter((order) => order.status === "pending");
  const delivered = orders.filter((order) => order.status === "delivered");

  const totalRevenue = orders.reduce((acc, next) => acc + next.totalPrice, 0);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-7">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
          <Package size={24} className="text-blue-600" />
        </div>

        <div>
          <p className="text-gray-500 text-sm">Total Orders</p>
          <h2 className="text-xl leading-none font-bold mt-2 text-black">
            {orders.length}
          </h2>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
          <DollarSign size={24} className="text-blue-600" />,
        </div>

        <div>
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <h2 className="text-xl leading-none font-bold mt-2 text-black">
            {totalRevenue}
          </h2>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
          <Box size={24} className="text-blue-600" />
        </div>

        <div>
          <p className="text-gray-500 text-sm">Pending Orders</p>
          <h2 className="text-xl leading-none font-bold mt-2 text-black">
            {pending.length}
          </h2>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
          <Truck size={24} className="text-blue-600" />
        </div>

        <div>
          <p className="text-gray-500 text-sm">Delivered Orders</p>
          <h2 className="text-xl leading-none font-bold mt-2 text-black">
            {delivered.length}
          </h2>
        </div>
      </div>
    </div>
  );
}
