import axios from "axios";

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
