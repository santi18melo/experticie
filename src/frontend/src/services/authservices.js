// src/services/authservices.js
import axios from "axios";
import API_CONFIG from "../config/api.js";

const API_URL = API_CONFIG.baseURL;

// ================= AXIOS PROTEGIDO =================
const authAxios = axios.create({
  baseURL: API_URL,
});

// ---- INTERCEPTOR PARA TOKEN ----
authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---- LOGOUT ----
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh");
  localStorage.removeItem("role");
};

// ---- REFRESH TOKEN ----
authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem("refresh");

      if (refresh) {
        try {
          const res = await axios.post(`${API_URL}/auth/refresh/`, { refresh });

          // Guarda el nuevo access token
          localStorage.setItem("token", res.data.access);

          // Actualiza headers
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;

          return authAxios(originalRequest);
        } catch (err) {
          console.error("Error refrescando token:", err);
        }
      }
    }

    return Promise.reject(error);
  }
);

// ---- EXPORT PRINCIPAL ----
export { authAxios };

// ================= AUTH =================

// Registro
export const register = async (userData) => {
  const res = await axios.post(`${API_URL}/auth/register/`, userData);
  return res.data;
};

// Login
export const login = async (email, password) => {
  const res = await axios.post(`${API_URL}/auth/login/`, { email, password });

  if (res.data.access) localStorage.setItem("token", res.data.access);
  if (res.data.refresh) localStorage.setItem("refresh", res.data.refresh);
  if (res.data.user?.rol) localStorage.setItem("role", res.data.user.rol);

  return res.data;
};

// Email recuperación
export const forgotPassword = async (email) => {
  const res = await axios.post(`${API_URL}/auth/forgot-password/`, { email });
  return res.data;
};

// Reset password
export const resetPassword = async (uid, token, password) => {
  const res = await axios.post(
    `${API_URL}/auth/reset-password/${uid}/${token}/`,
    { password }
  );
  return res.data;
};
