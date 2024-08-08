import axios from "axios";
import { API_BASE_URL } from "./constants";

export const loginRequest = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const registrationRequest = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg || "Ошибка регистрации");
    }
    throw new Error("Ошибка регистрации");
  }
};
