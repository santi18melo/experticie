// API configuration for all environments
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 10000,
};

// Helper to get full URL for media files
export const getMediaURL = (path) => {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("blob")) return path;
  const baseURL = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:8000";
  return `${baseURL}${path}`;
};

export default API_CONFIG;
