import axios from "axios";

export const createOrder = async (data) => {
  try {
    return axios.post(`/api/v1/order`, data);
  } catch (error) {
    if (error.response) throw error.response;
    throw error;
  }
};
