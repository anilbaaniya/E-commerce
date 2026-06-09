import axios from "axios";

export const createOrder = async (data) => {
  try {
    return axios.post(`/api/v1/order`, data);
  } catch (error) {
    if (error.response) throw error.response;
    throw error;
  }
};

export const getOrders = async () => {
  try {
    return axios.get(`/api/v1/order`);
  } catch (error) {
    if (error.response) throw error.response;
    throw error;
  }
};

export const getOrder = async (id) => {
  try {
    return axios.get(`/api/v1/order/${id}`);
  } catch (error) {
    if (error.response) throw error.response;
    throw error;
  }
};
