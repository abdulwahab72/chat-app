import axios from "axios";

const token = localStorage.getItem("token");
const API_URL = import.meta.env.VITE_API_BASE_URL;

export const createMessage = async (msgFormData) => {
  try {
    const formData = msgFormData;
    const response = await axios.post(
      `${API_URL}/api/message/create`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response?.data;
  } catch (error) {
    console.log("error", error);
  }
};
