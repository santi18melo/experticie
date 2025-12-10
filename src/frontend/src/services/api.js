// src/services/api.js
import axios from "axios";

// -------------------------------
// CONFIG - Base URL
// -------------------------------
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// -------------------------------
// AXIOS INSTANCE
// -------------------------------
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// -------------------------------
// TOKEN HELPERS
// -------------------------------
const getAccessToken = () => localStorage.getItem("token") || localStorage.getItem("accessToken") || "";
const getRefreshToken = () => localStorage.getItem("refresh") || localStorage.getItem("refreshToken") || "";

// -------------------------------
// REFRESH TOKEN FUNCTION
// -------------------------------
const refreshToken = async () => {
  const refresh = getRefreshToken();
  if (!refresh) return false;

  try {
    const resp = await axiosInstance.post("/auth/token/refresh/", { refresh });
    const newAccess = resp.data?.access;
    if (!newAccess) return false;

    localStorage.setItem("token", newAccess);
    localStorage.setItem("accessToken", newAccess);
    return true;
  } catch (err) {
    console.error("[API] Refresh token failed:", err);
    return false;
  }
};

// -------------------------------
// INTERCEPTOR: Add Authorization Header
// -------------------------------
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("[🔵 AXIOS REQ]", config.method?.toUpperCase(), config.url, config.data || "");
    
    const token = getAccessToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("[🔴 AXIOS REQ ERROR]", error);
    return Promise.reject(error);
  }
);

// -------------------------------
// INTERCEPTOR: Handle Responses
// -------------------------------
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("[✅ AXIOS SUCCESS]", response.status, response.config.url);
    return response;
  },
  async (error) => {
    console.error("[❌ AXIOS ERROR]", {
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data,
      message: error.message
    });

    const originalReq = error.config;

    // Handle 401 (Unauthorized) or 403 (Forbidden)
    if (error.response?.status === 401 || error.response?.status === 403) {
      
      // If it's a refresh token failure, or we've already retried, or it's a 403
      if (originalReq.url.includes('/token/refresh/') || originalReq._retry || error.response?.status === 403) {
        console.warn("[🔒 AUTH] Session invalid/expired. Logging out...");
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; 
        return Promise.reject(error);
      }

      // Try to refresh token (only for 401)
      originalReq._retry = true;
      const refreshed = await refreshToken();
      
      if (refreshed) {
        originalReq.headers.Authorization = `Bearer ${getAccessToken()}`;
        return axiosInstance(originalReq);
      } else {
        // Refresh failed
        console.warn("[🔒 AUTH] Refresh failed. Logging out...");
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
export { axiosInstance, API_BASE_URL };