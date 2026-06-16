import axios from "axios";
const API = import.meta.env.VITE_API_URL || "";

export const createOrder = async (data) => {
  try {
    return axios.post(`${API}/api/v1/order`, data);
  } catch (error) {
    if (error.response) throw error.response;
    throw error;
  }
};

export const getOrders = async () => {
  try {
    return axios.get(`${API}/api/v1/order`);
  } catch (error) {
    if (error.response) throw error.response;
    throw error;
  }
};

export const getOrder = async (id) => {
  try {
    return axios.get(`${API}/api/v1/order/${id}`);
  } catch (error) {
    if (error.response) throw error.response;
    throw error;
  }
};
