import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const addContact = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/contact/add`, {
      name: formData.name,
      email: formData.email,
      number: formData.contact,
    });
    return response?.data;
  } catch (e) {
    console.log("error", e);
  }
};
export const getContact = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/contact/get`);
    return response?.data;
  } catch (e) {
    console.log("error", e);
  }
};
