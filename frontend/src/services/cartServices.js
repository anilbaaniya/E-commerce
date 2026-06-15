import axios from "axios";

export const getCart = async () => {
  try {
    return await axios.get("/api/v1/cart", { withCredentials: true });
  } catch (error) {
    if (error.response) throw error.response;
    throw error;
  }
};

export const addToCart = async (productId, quantity = 1) => {
  try {
    return await axios.post(
      "/api/v1/cart",
      { productId, quantity },
      { withCredentials: true },
    );
  } catch (error) {
    if (error.response) throw error.response;
    throw error;
  }
};

export const updateCartItem = async (productId, quantity) => {
  if (quantity === undefined || isNaN(quantity)) {
    throw new Error("Invalid quantity");
  }

  try {
    return await axios.patch(
      `/api/v1/cart/${productId}`,
      { quantity: Number(quantity) },
      { withCredentials: true },
    );
  } catch (error) {
    if (error?.response) throw error.response;
    throw error;
  }
};

export const deleteCartItem = async (productId) => {
  try {
    return await axios.delete(`/api/v1/cart/${productId}`, {
      withCredentials: true,
    });
  } catch (error) {
    if (error.response) throw error.response;
    throw error;
  }
};
