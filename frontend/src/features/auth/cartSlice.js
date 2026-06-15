import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCart as getCartService,
  addToCart as addToCartService,
  updateCartItem as updateCartItemService,
  deleteCartItem as deleteCartItemService,
} from "../../services/cartServices";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCartService();
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.data?.message || error.message || "Failed to load cart",
      );
    }
  },
);

export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await addToCartService(productId, quantity);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.data?.message || error.message || "Failed to add to cart",
      );
    }
  },
);

export const updateCartItem = createAsyncThunk(
  "cart/update",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      console.log(quantity);
      const response = await updateCartItemService(productId, quantity);
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.error("updateCartItem error", error);
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.data?.message ||
          error?.message ||
          "Failed to update cart item",
      );
    }
  },
);

export const removeCartItem = createAsyncThunk(
  "cart/remove",
  async (productId, { rejectWithValue }) => {
    try {
      await deleteCartItemService(productId);
      return productId;
    } catch (error) {
      return rejectWithValue(
        error.data?.message || error.message || "Failed to remove cart item",
      );
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => {
          const cartProductId = item.product?._id || item.product || item._id;
          return cartProductId !== action.payload;
        });
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCartError } = cartSlice.actions;
export default cartSlice.reducer;
