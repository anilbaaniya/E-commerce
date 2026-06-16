import axios from "axios";
const API = import.meta.env.VITE_API_URL || "";

export const createUser = async (userData) => {
  try {
    return await axios.post(`/api/v1/users/signup`, userData, {
      withCredentials: true,
    });
  } catch (error) {
    if (error.response) throw error.response;
    throw error;
  }
};

export const login = async (userData) => {
  try {
    return await axios.post("/api/v1/users/login", userData, {
      withCredentials: true,
    });
  } catch (error) {
    if (error.response) throw error.response;
    throw error;
  }
};

export const logout = async () => {
  try {
    return await axios.post(
      "/api/v1/users/logout",
      {},
      { withCredentials: true },
    );
  } catch (error) {
    if (error.response) throw error.response;
    throw error;
  }
};

export const getMe = async () => {
  try {
    const response = await axios.get("/api/v1/users/getMe", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    if (error.response) throw error.response;
    throw error;
  }
};

export const updateMe = async (data) => {
  try {
    const response = await axios.patch("/api/v1/users/updateMe", data, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    if (error.response) throw error.response;
    throw error;
  }
};

export const updateMyPassword = async (data) => {
  try {
    const response = await axios.patch("/api/v1/users/updateMyPassword", data, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    if (error.response) throw error.response;
    throw error;
  }
};

export const forgotPassword = async (data) => {
  console.log(data);
  try {
    const response = await axios.post("/api/v1/users/forgotPassword", data, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    if (error.response) throw error.response.data.message;
    throw error;
  }
};
export const resetPassword = async (data, token) => {
  console.log(data);
  try {
    const response = await axios.patch(
      `/api/v1/users/resetPassword/${token}`,
      data,
      {
        withCredentials: true,
      },
    );
    return response;
  } catch (error) {
    if (error.response) throw error.response.data.message;
    throw error;
  }
};
