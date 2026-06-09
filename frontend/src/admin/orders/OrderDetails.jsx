import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrder } from "../../services/orderService.js";

export default function OrderDetails() {
  const [order, setOrder] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    async function getProducts() {
      const response = await getOrder(id);
      setOrder(response.data.data);
      console.log(response.data.data);
    }
    getProducts();
  }, [id]);

  return (
    <div className="min-h-screen bg-white p-6 text-black">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Order Details</h1>
          <p className="text-gray-500">Manage customer order information</p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
          Update Status
        </button>
      </div>

      {/* Order Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="border border-stone-300 rounded-xl p-4 shadow-sm">
          <p className="text-gray-500 text-sm">Order ID</p>
          <h2 className="font-semibold text-lg">{order?.orderId}</h2>
        </div>

        <div className="border border-stone-300 rounded-xl p-4 shadow-sm">
          <p className="text-gray-500 text-sm">Status</p>
          <h2 className="font-semibold text-lg text-yellow-600">
            {order?.status}
          </h2>
        </div>

        <div className="border border-stone-300 rounded-xl p-4 shadow-sm">
          <p className="text-gray-500 text-sm">Total Price</p>
          <h2 className="font-semibold text-lg">{order?.totalPrice}</h2>
        </div>

        <div className="border border-stone-300 rounded-xl p-4 shadow-sm">
          <p className="text-gray-500 text-sm">Items</p>
          <h2 className="font-semibold text-lg">
            {order?.products?.length} Products
          </h2>
        </div>
      </div>

      {/* Customer + Shipping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Customer Info */}
        <div className="border border-stone-300 rounded-xl p-5 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Customer Information</h2>

          <div className="space-y-3">
            <div>
              <p className="text-gray-500 text-sm">Full Name</p>
              <p className="font-medium">{order?.shippingInfo?.fullName}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-medium">{order?.shippingInfo?.email}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Phone</p>
              <p className="font-medium">{order?.shippingInfo?.phone}</p>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="border border-stone-300 rounded-xl p-5 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

          <div className="space-y-3">
            <div>
              <p className="text-gray-500 text-sm">Street</p>
              <p className="font-medium">{order?.shippingInfo?.streetName}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">City</p>
              <p className="font-medium">{order?.shippingInfo?.city}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="border border-stone-300 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-semibold">Ordered Products</h2>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Print Invoice
          </button>
        </div>

        <div className="space-y-4">
          {/* Product Item */}
          <div className="flex items-center justify-between border border-stone-300 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <img
                src="/product.jpg"
                alt="product"
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div>
                <h3 className="font-semibold text-lg">Product Name</h3>
                <p className="text-gray-500">Quantity: 1</p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold text-lg">$60</p>
              <p className="text-gray-500 text-sm">Subtotal</p>
            </div>
          </div>

          {/* Product Item */}
          <div className="flex items-center justify-between border border-stone-300 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <img
                src="/product.jpg"
                alt="product"
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div>
                <h3 className="font-semibold text-lg">Product Name</h3>
                <p className="text-gray-500">Quantity: 1</p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold text-lg">$60</p>
              <p className="text-gray-500 text-sm">Subtotal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
