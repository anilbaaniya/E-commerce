import {
  Search,
  Calendar,
  ChevronDown,
  Download,
  Package,
  DollarSign,
  Box,
  Truck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Orders",
    value: "1,248",
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

const orders = [
  {
    id: "#ORD1001",
    customer: "John Doe",
    email: "john.doe@example.com",
    date: "May 18, 2025",
    time: "10:30 AM",
    amount: "$120.00",
    payment: "Credit Card",
    status: "Delivered",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-blue-50 text-blue-600";
    case "Processing":
      return "bg-blue-50 text-blue-600";
    case "Pending":
      return "bg-blue-50 text-blue-600";
    case "Shipped":
      return "bg-blue-50 text-blue-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const Orders = () => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-7">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-5"
          >
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
              {item.icon}
            </div>

            <div>
              <p className="text-gray-500 text-[15px]">{item.title}</p>
              <h2 className="text-[36px] leading-none font-bold mt-2 text-black">
                {item.value}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {/* Filters */}
        <div className="p-5 border-b border-gray-200">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
            {/* Search */}
            <div className="xl:col-span-5 relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search by Order ID, User or Email"
                className="w-full h-12 rounded-xl border border-gray-200 bg-white pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-100 text-[15px]"
              />
            </div>

            {/* Status */}
            <div className="xl:col-span-2 relative">
              <select className="appearance-none w-full h-12 rounded-xl border border-gray-200 px-4 pr-10 bg-white text-[15px] outline-none">
                <option>All Status</option>
              </select>

              <ChevronDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>

            {/* Start Date */}
            <div className="xl:col-span-2 relative">
              <input
                type="text"
                placeholder="Start Date"
                className="w-full h-12 rounded-xl border border-gray-200 px-4 pr-10 outline-none text-[15px]"
              />

              <Calendar
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            {/* End Date */}
            <div className="xl:col-span-2 relative">
              <input
                type="text"
                placeholder="End Date"
                className="w-full h-12 rounded-xl border border-gray-200 px-4 pr-10 outline-none text-[15px]"
              />

              <Calendar
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            {/* Button */}
            <div className="xl:col-span-1">
              <button className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium">
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead>
              <tr className="border-b border-gray-200 bg-white">
                {[
                  "Order ID",
                  "Customer",
                  "Email",
                  "Date",
                  "Total Amount",
                  "Payment Method",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="text-left px-6 py-5 text-[15px] font-semibold text-black whitespace-nowrap"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-all"
                >
                  <td className="px-6 py-5 font-medium text-gray-800 whitespace-nowrap">
                    {order.id}
                  </td>

                  <td className="px-6 py-5 text-gray-800 whitespace-nowrap">
                    {order.customer}
                  </td>

                  <td className="px-6 py-5 text-gray-700 whitespace-nowrap">
                    {order.email}
                  </td>

                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-gray-800">{order.date}</div>
                    <div className="text-gray-500 text-sm mt-1">
                      {order.time}
                    </div>
                  </td>

                  <td className="px-6 py-5 text-gray-800 whitespace-nowrap">
                    {order.amount}
                  </td>

                  <td className="px-6 py-5 text-gray-800 whitespace-nowrap">
                    {order.payment}
                  </td>

                  <td className="px-6 py-5 whitespace-nowrap">
                    <span
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${getStatusStyle(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-5 whitespace-nowrap">
                    <button className="px-6 h-10 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
