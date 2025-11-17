import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

// Registro
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register/`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Error en el registro" };
  }
};

// Login para obtener tokens
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login/`, {
      email,
      password,
    });
    if (response.data.access) {
      localStorage.setItem("token", response.data.access);
      if (response.data.refresh) {
        localStorage.setItem("refresh", response.data.refresh);
      }
      // Guardar rol en localStorage
      localStorage.setItem("role", response.data.user.rol);
    }
    return {
      ...response.data,
      role: response.data.user.rol // <-- añadir aquí
    };
  } catch (error) {
    throw error.response?.data || { error: "Error en el login" };
  }
};


// Logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh");
};

// Axios con token incluido automáticamente
export const authAxios = axios.create({
  baseURL: API_URL,
});

authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem("refresh");
      if (refresh) {
        try {
          const response = await axios.post(`${API_URL}/auth/refresh/`, {
            refresh,
          });
          localStorage.setItem("token", response.data.access);
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          return authAxios(originalRequest);
        } catch (refreshError) {
          logout();
        }
      }
    }
    return Promise.reject(error);
  }
);
