import { ShoppingCart, ArrowRight, Heart, Home } from "lucide-react";

const EmptyCart = () => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-4xl p-10 text-center relative overflow-hidden">
      {/* Cart Icon */}
      <div className="relative z-10">
        <div className="w-30 h-30 mx-auto rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-blue-200">
          <ShoppingCart size={60} className="text-white" />
        </div>

        {/* Floating Badge */}
        <div className="absolute top-5 right-[32%] bg-white shadow-lg border border-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-600">
          0 Items
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-10">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          Your Cart is Empty
        </h1>

        <p className="mt-5 text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
          Looks like you haven’t added anything yet. Discover trendy products
          and start shopping now.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-5 mt-10">
          <button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-6 py-4 rounded-2xl text-lg font-semibold flex items-center gap-3 shadow-lg shadow-blue-200">
            Continue Shopping
            <ArrowRight size={20} />
          </button>

          <button className="border border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 px-8 py-4 rounded-2xl text-lg font-medium flex items-center gap-3 bg-white">
            <Home size={20} />
            Go Home
          </button>
        </div>
      </div>

      {/* Wishlist Suggestion */}
      <div className="relative z-10 mt-14 bg-linear-to-r from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="text-left">
          <h4 className="text-2xl font-bold text-gray-900">
            Saved items waiting for you 💙
          </h4>

          <p className="text-gray-500 mt-2">
            Check your wishlist and move products to cart anytime.
          </p>
        </div>

        <button className=" hover:bg-blue-600 hover:text-white transition-all duration-300 border border-gray-200 px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-sm">
          <Heart size={18} />
          View Wishlist
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;

// import { useEffect } from "react";
// import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import CartItem from "./CartItem";
// import EmptyCart from "./EmptyCart";
// import {
//   fetchCart,
//   updateCartItem,
//   removeCartItem,
// } from "../../features/auth/cartSlice";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const Cart = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { items = [], loading } = useSelector((state) => state.cart);

//   useEffect(() => {
//     dispatch(fetchCart());
//   }, [dispatch]);

//   const discountPrice = items.map((item) => {
//     {
//       return (
//         (item.product?.originalPrice -
//           (item.product?.originalPrice * item.product?.discountPercent) / 100) *
//         item.quantity
//       );
//     }
//   });

//   const total = discountPrice.reduce((acc, item) => acc + item, 0);

//   const handleDecrease = (productId, quantity) => {
//     if (quantity <= 1) {
//       dispatch(removeCartItem(productId));
//     } else {
//       dispatch(updateCartItem({ productId, quantity: quantity - 1 }));
//     }
//   };

//   const handleIncrease = (productId, quantity) => {
//     dispatch(updateCartItem({ productId, quantity: quantity + 1 }));
//   };

//   const handleRemove = (productId) => {
//     dispatch(removeCartItem(productId));
//     toast.success("Product removed from cart!");
//   };

//   if (!loading && items.length === 0) {
//     return <EmptyCart />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Main */}
//       <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-3 gap-8">
//         {/* Left Side */}
//         <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm  p-6">
//           <div className="flex items-center justify-between mb-8">
//             <h2 className="text-3xl font-bold text-gray-900">Shopping Cart</h2>

//             <span className="text-lg text-gray-500">{items.length} Items</span>
//           </div>

//           {/* Cart Items */}
//           <div className="space-y-6">
//             {items.map((item) => (
//               <CartItem
//                 item={item}
//                 key={item.product?._id || item.id}
//                 onDecrease={handleDecrease}
//                 onIncrease={handleIncrease}
//                 onRemove={handleRemove}
//               />
//             ))}
//           </div>

//           {/* Features */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
//             <div className="bg-blue-50 rounded-2xl p-4 flex items-start gap-4">
//               <ShieldCheck className="text-blue-600" />
//               <div>
//                 <h4 className="font-semibold">Secure Checkout</h4>
//               </div>
//             </div>

//             <div className="bg-blue-50 rounded-2xl p-4 flex items-start gap-4">
//               <Truck className="text-blue-600" />
//               <div>
//                 <h4 className="font-semibold">Free Shipping</h4>
//               </div>
//             </div>
//           </div>

//           {/* Continue Shopping */}
//           <button className="mt-8 border px-6 py-3 rounded-xl hover:bg-gray-100 transition">
//             ← Continue Shopping
//           </button>
//         </div>

//         {/* Right Side */}
//         <div className="space-y-6">
//           {/* Summary */}
//           <div className="bg-white rounded-3xl shadow-sm  p-6">
//             <h3 className="text-2xl font-bold mb-6">Order Summary</h3>

//             <div className="space-y-4 text-gray-700">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>₹{Math.ceil(total)}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span>Shipping</span>
//                 <span className="text-green-600">FREE</span>
//               </div>
//             </div>

//             <div className="border-t my-6"></div>

//             <div className="flex justify-between items-center mb-6">
//               <span className="text-xl font-semibold">Total</span>

//               <span className="text-3xl font-bold">₹{Math.ceil(total)}</span>
//             </div>

//             <button
//               onClick={() => navigate("/checkout")}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold flex items-center justify-center gap-2 transition"
//             >
//               Proceed to Checkout
//               <ArrowRight size={20} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;
