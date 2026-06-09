import axios from "axios";

export const createProduct = async (data) => {
  try {
    return await axios.post(`/api/v1/products/`, data);
  } catch (error) {
    if (error.response) throw error.response;
    throw error;
  }
};

export const getFeaturedProducts = async () => {
  try {
    return await axios.get(`/api/v1/products/featured-products`);
  } catch (error) {
    if (error.response) throw error.response;
    throw error;
  }
};

export const getBestSellerProducts = async () => {
  try {
    return await axios.get(`/api/v1/products/bestSeller-products`);
  } catch (error) {
    if (error.response) throw error.response;
    throw error;
  }
};

export const getTrendingProducts = async () => {
  try {
    return await axios.get(`/api/v1/products/trending-products`);
  } catch (error) {
    if (error.response) throw error.response;
    throw error;
  }
};

export const getProducts = async (filters) => {
  const query = new URLSearchParams(filters).toString();
  const path = `/api/v1/products${query ? `?${query}` : ""}`;

  // return the full axios response for consistency with other service helpers
  return await axios.get(path);
};

export const getProduct = async (id) => {
  try {
    return await axios.get(`/api/v1/products/${id}`);
  } catch (error) {
    if (error.response) throw error.response;
    throw error;
  }
};

export const updateProduct = async (id, data) => {
  try {
    return await axios.patch(`/api/v1/products/${id}`, data);
  } catch (error) {
    if (error.response) throw error.response;
    throw error;
  }
};
