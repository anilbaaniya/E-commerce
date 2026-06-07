import { useEffect } from "react";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import {
  fetchCart,
  updateCartItem,
  removeCartItem,
} from "../../features/auth/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleDecrease = (productId, quantity) => {
    if (quantity <= 1) {
      dispatch(removeCartItem(productId));
    } else {
      dispatch(updateCartItem({ productId, quantity: quantity - 1 }));
    }
  };

  const handleIncrease = (productId, quantity) => {
    dispatch(updateCartItem({ productId, quantity: quantity + 1 }));
  };

  const handleRemove = (productId) => {
    dispatch(removeCartItem(productId));
  };

  if (!loading && items.length === 0) {
    return <EmptyCart />;
  }

  const subtotal = items.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0,
  );

  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-3 gap-8">
        {/* Left Side */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm  p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Shopping Cart</h2>

            <span className="text-lg text-gray-500">{items.length} Items</span>
          </div>

          {/* Cart Items */}
          <div className="space-y-6">
            {items.map((item) => (
              <CartItem
                item={item}
                key={item.product?._id || item.id}
                onDecrease={handleDecrease}
                onIncrease={handleIncrease}
                onRemove={handleRemove}
              />
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            <div className="bg-blue-50 rounded-2xl p-4 flex items-start gap-4">
              <ShieldCheck className="text-blue-600" />
              <div>
                <h4 className="font-semibold">Secure Checkout</h4>
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-4 flex items-start gap-4">
              <Truck className="text-blue-600" />
              <div>
                <h4 className="font-semibold">Free Shipping</h4>
              </div>
            </div>
          </div>

          {/* Continue Shopping */}
          <button className="mt-8 border px-6 py-3 rounded-xl hover:bg-gray-100 transition">
            ← Continue Shopping
          </button>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-3xl shadow-sm  p-6">
            <h3 className="text-2xl font-bold mb-6">Order Summary</h3>

            <div className="space-y-4 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
            </div>

            <div className="border-t my-6"></div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-semibold">Total</span>

              <span className="text-3xl font-bold">₹{total}</span>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold flex items-center justify-center gap-2 transition">
              Proceed to Checkout
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
