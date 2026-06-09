import React from "react";
import { CheckCircle, MapPin, Package, Truck, ShoppingBag } from "lucide-react";

const SuccessPage = () => {
  const order = {
    id: "A10293",
    customerName: "Anil",
    address: "Kathmandu, Nepal",
    estimatedDelivery: "12–14 June",
    total: "Rs. 8,500",
    items: [
      {
        name: "Nike Shoes",
        quantity: 1,
      },
      {
        name: "Hoodie",
        quantity: 2,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        {/* Success Header */}
        <div className="flex flex-col items-center text-center">
          <CheckCircle className="text-green-500 w-20 h-20 mb-4" />

          <h1 className="text-3xl font-bold text-gray-800">Order Confirmed</h1>

          <p className="text-gray-600 mt-2 text-lg">
            Thank you, {order.customerName}!
          </p>

          <p className="text-gray-500 mt-1">
            Your order{" "}
            <span className="font-semibold text-gray-800">#{order.id}</span> has
            been placed successfully.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t my-8"></div>

        {/* Delivery Info */}
        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <MapPin className="text-gray-500 mt-1" />

            <div>
              <h3 className="font-semibold text-gray-800">Delivery Address</h3>

              <p className="text-gray-600">{order.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Truck className="text-gray-500 mt-1" />

            <div>
              <h3 className="font-semibold text-gray-800">
                Estimated Delivery
              </h3>

              <p className="text-gray-600">{order.estimatedDelivery}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Package className="text-gray-600" />

            <h2 className="text-xl font-semibold text-gray-800">Order Items</h2>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b last:border-none pb-3 last:pb-0"
              >
                <p className="text-gray-700">{item.name}</p>

                <span className="text-gray-500">x{item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mt-8 bg-green-50 border border-green-100 rounded-xl p-4">
          <p className="text-lg font-semibold text-gray-800">Total Paid</p>

          <p className="text-2xl font-bold text-green-600">{order.total}</p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button className="flex-1 bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition">
            Track Order
          </button>

          <button className="flex-1 border border-gray-300 py-3 rounded-xl font-medium hover:bg-gray-100 transition flex items-center justify-center gap-2">
            <ShoppingBag size={18} />
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
