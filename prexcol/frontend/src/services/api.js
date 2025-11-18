// src/services/api.js
import axios from "axios";

// -------------------------------
// CONFIG
// -------------------------------
const API_HOST = import.meta.env.VITE_API_HOST || "192.168.1.78";
const API_PORT = import.meta.env.VITE_API_PORT || "8000";

// BASE FINAL EJEMPLO: http://192.168.1.78:8000/api
const API_BASE_URL = `http://${API_HOST}:${API_PORT}/api`;

// -------------------------------
// AXIOS INSTANCE
// -------------------------------
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// -------------------------------
// TOKEN HELPERS
// -------------------------------
const getAccessToken = () => localStorage.getItem("accessToken") || "";
const getRefreshToken = () => localStorage.getItem("refreshToken") || "";

// -------------------------------
// REFRESH TOKEN FUNCTION
// -------------------------------
const refreshToken = async () => {
  const refresh = getRefreshToken();
  if (!refresh) return false;

  try {
    const resp = await axiosInstance.post("/auth/refresh/", { refresh });
    const newAccess = resp.data?.access;
    if (!newAccess) return false;

    localStorage.setItem("accessToken", newAccess);
    return true;
  } catch (err) {
    console.error("Error refrescando token:", err);
    return false;
  }
};

// -------------------------------
// INTERCEPTOR: añade Authorization
// -------------------------------
axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// -------------------------------
// INTERCEPTOR: 401 → refresh
// -------------------------------
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalReq = error.config;

    if (error.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;

      if (await refreshToken()) {
        originalReq.headers.Authorization = `Bearer ${getAccessToken()}`;
        return axiosInstance(originalReq);
      }
    }

    return Promise.reject(error);
  }
);

// -------------------------------
// API WRAPPER (AUTH)
// -------------------------------
const api = {
  login: (email, password) =>
    axiosInstance
      .post("/auth/login/", { email, password })
      .then((r) => r.data),

  register: (data) =>
    axiosInstance.post("/auth/register/", data).then((r) => r.data),

  requestPasswordReset: (email) =>
    axiosInstance
      .post("/auth/forgot-password/", { email })
      .then((r) => r.data),

  resetPassword: (uid, token, newPassword) =>
    axiosInstance
      .post(`/auth/reset-password/${uid}/${token}/`, {
        password: newPassword,
      })
      .then((r) => r.data),
};

export default api;
export { axiosInstance, API_BASE_URL };
