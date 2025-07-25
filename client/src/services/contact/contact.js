import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("token");
export const addContact = async (formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/contact/add`,
      {
        name: formData.name,
        email: formData.email,
        number: formData.contact,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (e) {
    console.log("error", e);
  }
};
export const getContact = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/contact/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (e) {
    console.log("error", e);
  }
};
export const getContactById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/contact/get/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    console.log("error", error);
  }
};
