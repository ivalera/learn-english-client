import axios from "axios";
import { API_BASE_URL } from "./constants";

export const getWordsRequest = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/words`, {
      headers: {
        "x-auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting words:", error);
    throw error;
  }
};
