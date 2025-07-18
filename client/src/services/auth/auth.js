import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const signupUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, {
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
    });
    return response?.data;
  } catch (e) {
    console.log(e);
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email: formData.email,
      password: formData.password,
    });
    return response?.data;
  } catch (e) {
    console.log(e);
  }
};
