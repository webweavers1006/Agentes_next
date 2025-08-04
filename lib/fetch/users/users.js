import axios from 'axios';
import { API_URL } from '@/lib/fetch/vars';

export const loginUser = async (user, pass) => {
  try {
    const response = await axios.post(`${API_URL}/auth/user/authentication`, { user, pass });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.error?.message || error.message || "Error de autenticación";
    // Lanzar un error con un mensaje claro para que route.js lo capture
    throw new Error(message);
  }
};