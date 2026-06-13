import axios from "axios";

export const getWishlist = async () => {
  try {
    return await axios.get("/api/v1/wishlist", { withCredentials: true });
  } catch (error) {
    if (error.response) throw error.response;
    throw error;
  }
};

export const addToWishlist = async (productId) => {
  try {
    return await axios.post(
      "/api/v1/wishlist",
      { productId },
      { withCredentials: true },
    );
  } catch (error) {
    if (error.response) throw error.response;
    throw error;
  }
};

export const deleteWishlistItem = async (productId) => {
  try {
    return await axios.delete(`/api/v1/wishlist/${productId}`, {
      withCredentials: true,
    });
  } catch (error) {
    if (error.response) throw error.response;
    throw error;
  }
};
