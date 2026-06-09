import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import OrderStats from "./OrderStats";
import OrderTable from "./OrderTable";
import OrderFilter from "./OrderFilter";
import { useEffect, useState } from "react";
import { getOrders } from "../../services/orderService.js";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const res = await getOrders();
      console.log(res.data.data);
      setOrders(res.data.data || []);
    };
    getAllProducts();
  }, []);
  return (
    <div className="min-h-screen bg-[#fafafa] p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[40px] font-bold text-black">Orders</h1>
          <p className="text-gray-500 mt-1 text-[17px]">
            Manage and view all customer orders.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all text-white px-5 py-3 rounded-xl font-medium shadow-sm">
          <Download size={18} />
          Export Orders
        </button>
      </div>

      {/* Stats */}
      <OrderStats orders={orders} />

      {/* Table Container */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {/* Filters */}
        <OrderFilter />

        {/* Table */}
        <OrderTable orders={orders} />

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-5">
          <p className="text-gray-500 text-[15px]">
            Showing 1 to 8 of 1,248 orders
          </p>

          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
              <ChevronLeft size={18} />
            </button>

            <button className="w-10 h-10 rounded-lg bg-blue-600 text-white font-medium">
              1
            </button>

            <button className="w-10 h-10 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
              2
            </button>

            <button className="w-10 h-10 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
              3
            </button>

            <span className="px-2 text-gray-500">...</span>

            <button className="w-14 h-10 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
              156
            </button>

            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
