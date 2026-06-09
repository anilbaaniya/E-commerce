import { NavLink } from "react-router-dom";

const tableHeading = [
  "Order ID",
  "Customer",
  "Email",
  "Date",
  "Total Amount",

  "Status",
  "Actions",
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

export default function OrderTable({ orders }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-300">
        <thead>
          <tr className="border-b border-gray-200 bg-white">
            {tableHeading.map((heading) => (
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
                {order.orderId}
              </td>

              <td className="px-6 py-5 text-gray-800 whitespace-nowrap">
                {order.shippingInfo.fullName}
              </td>

              <td className="px-6 py-5 text-gray-700 whitespace-nowrap">
                {order.shippingInfo.email}
              </td>

              <td className="px-6 py-5 whitespace-nowrap">
                <div className="text-gray-800">{order.date}</div>
                <div className="text-gray-500 text-sm mt-1">{order.time}</div>
              </td>

              <td className="px-6 py-5 text-gray-800 whitespace-nowrap">
                {order.totalPrice}
              </td>

              {/* <td className="px-6 py-5 text-gray-800 whitespace-nowrap">
                {order.payment}
              </td> */}

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
                <NavLink
                  to={`${order._id}`}
                  className="px-6 h-10 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all"
                >
                  View
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
