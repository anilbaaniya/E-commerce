import { useSelector } from "react-redux";
import CheckoutForm from "./CheckoutForm";
import { LiaShippingFastSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

// Simple SVG icons

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.cart);

  const discountPrice = items.map((item) => {
    return (
      ((item.product?.originalPrice || 0) -
        ((item.product?.originalPrice || 0) *
          (item.product?.discountPercent || 0)) /
          100) *
      item.quantity
    );
  });

  const totalAmount = Math.ceil(
    discountPrice.reduce((acc, item) => acc + item, 0),
  );

  console.log(totalAmount);

  const subtotal = items.reduce(
    (acc, item) => acc + (item.product?.originalPrice || 0) * item.quantity,
    0,
  );
  console.log(subtotal);
  // console.log(items);
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>
      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-6">
        {/* Left: Main Form */}
        <div className="flex-1">
          {/* Form Card */}
          <div className="bg-white rounded-2xl p-7 shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-15 h-15 bg-green-50 rounded-xl flex items-center justify-center text-green-700">
                <LiaShippingFastSolid className="text-3xl" />
              </div>
              <div>
                <p className=" font-bold text-gray-900">Shipping Details</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Please enter your delivery information
                </p>
              </div>
            </div>

            <CheckoutForm />

            <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-3">
              Your data is secure and encrypted
            </p>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="w-110 shrink-0">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-gray-900">
                Order Summary
              </h2>
              <button
                onClick={() => navigate("/cart")}
                className="text-sm text-green-700 font-semibold hover:underline"
              >
                Edit Cart
              </button>
            </div>

            {/* Items */}
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item._id} className="flex gap-3 py-3.5 items-start">
                  <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                    {/* {item.product.image} */}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                    Rs.{" "}
                    {Math.ceil(
                      item.product.originalPrice -
                        (item.product.originalPrice *
                          item.product.discountPercent) /
                          100,
                    )}
                  </p>
                </div>
              ))}
            </div>

            {/* Summary rows */}
            <div className="mt-4 space-y-2.5">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Free delivery </span>
              </div>
              <div className="flex justify-between text-sm text-green-700 font-medium">
                <span>Discount</span>
                <span>- Rs. {subtotal - totalAmount}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900 border-t border-dashed border-gray-200 pt-3 mt-1">
                <span>Total Amount</span>
                <span>Rs. {totalAmount}</span>
              </div>
            </div>

            {/* Savings badge */}
            <div className="mt-4 mb-5 bg-green-50 rounded-xl px-3.5 py-3 flex items-center gap-2.5 text-sm text-green-700 font-medium">
              Yay! You are saving Rs. {subtotal - totalAmount} on this order.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
