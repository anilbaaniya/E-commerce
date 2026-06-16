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
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items = [], loading } = useSelector((state) => state.cart);
  // console.log(items);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const discountPrice = items.map((item) => {
    {
      return (
        (item.product?.originalPrice -
          (item.product?.originalPrice * item.product?.discountPercent) / 100) *
        item.quantity
      );
    }
  });

  const total = discountPrice.reduce((acc, item) => acc + item, 0);

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
    toast.success("Product removed from cart!");
  };

  if (!loading && items.length === 0) {
    return <EmptyCart />;
  }

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
                key={item.product?._id || item.product || item._id || item.id}
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
          <NavLink
            to="/"
            className="mt-6 inline-block border px-6 py-2 rounded-xl hover:bg-gray-100 transition"
          >
            ← Continue Shopping
          </NavLink>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-3xl shadow-sm  p-6">
            <h3 className="text-2xl font-bold mb-6">Order Summary</h3>

            <div className="space-y-4 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{Math.ceil(total)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
            </div>

            <div className="border-t my-6"></div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-semibold">Total</span>

              <span className="text-3xl font-bold">₹{Math.ceil(total)}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold flex items-center justify-center gap-2 transition"
            >
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
