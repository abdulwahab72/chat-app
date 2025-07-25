import axios from "axios";

const token = localStorage.getItem("token");

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const createChat = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/chat/create`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response?.data;
  } catch (error) {
    console.log("error", error);
  }
};
