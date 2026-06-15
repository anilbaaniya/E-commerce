import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteWishlistItem,
  getWishlist,
  addToWishlist as addToWishlistService,
} from "../../services/wishlistService";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

/* FETCH WISHLIST */
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getWishlist();
      return response.data?.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to load wishlist",
      );
    }
  },
);

/* ADD TO WISHLIST */
export const addToWishlist = createAsyncThunk(
  "wishlist/add",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await addToWishlistService(productId);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to add to wishlist",
      );
    }
  },
);

/* REMOVE FROM WISHLIST */
export const removeWishlistItem = createAsyncThunk(
  "wishlist/remove",
  async (productId, { rejectWithValue }) => {
    try {
      await deleteWishlistItem(productId);
      return productId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to remove wishlist item",
      );
    }
  },
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlistError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ADD */
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;

        // IMPORTANT FIX: replace instead of push
        state.items = Array.isArray(action.payload)
          ? action.payload
          : state.items;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* REMOVE */
      .addCase(removeWishlistItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.loading = false;

        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(removeWishlistItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWishlistError } = wishlistSlice.actions;
export default wishlistSlice.reducer;
