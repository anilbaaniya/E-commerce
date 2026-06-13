import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import cartReducer from "../features/auth/cartSlice.js";
import wishlistReducer from "../features/auth/wishlistSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
