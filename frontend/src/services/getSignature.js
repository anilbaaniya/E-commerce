import axios from "axios";
// const API = import.meta.env.VITE_API_URL || "";

export const getSignatureForUpload = async (folder) => {
  try {
    const res = await axios.post(`/api/sign-upload`, { folder });
    return res.data;
  } catch (error) {
    // rethrow so callers can handle the error
    console.error(
      "getSignatureForUpload error:",
      error?.response?.data || error.message || error,
    );
    throw error;
  }
};
