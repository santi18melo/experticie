import axios from "axios";

// ========================= CONFIG =========================
const API_BASE_URL = "const API_BASE_URL = 'http://192.168.1.78:5173"


// ========================= TOKEN =========================
const getAccessToken = () => localStorage.getItem("accessToken") || "";
const getRefreshToken = () => localStorage.getItem("refreshToken") || "";

// ========================= REFRESH TOKEN =========================
const refreshToken = async () => {
  const refresh = getRefreshToken();
  if (!refresh) return false;

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
      refresh,
    });

    localStorage.setItem("accessToken", response.data.access);
    return true;
  } catch (error) {
    console.error("Error refrescando token:", error);
    return false;
  }
};

// ========================= HEADERS =========================
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
    "Content-Type": "application/json",
  },
});

// ========================= AXIOS WRAPPER =========================
const axiosAuth = async (method, url, data = null) => {
  // Rutas públicas
  if (
    url.startsWith("/auth/login") ||
    url.startsWith("/auth/register") ||
    url.startsWith("/auth/forgot-password") ||
    url.startsWith("/auth/reset-password")
  ) {
    return axios({ method, url: API_BASE_URL + url, data });
  }

  try {
    return await axios({
      method,
      url: API_BASE_URL + url,
      data,
      ...getAuthHeaders(),
    });
  } catch (error) {
    if (error.response?.status === 401) {
      const refreshed = await refreshToken();
      if (refreshed) {
        return await axios({
          method,
          url: API_BASE_URL + url,
          data,
          ...getAuthHeaders(),
        });
      }
      throw new Error("Token expirado. Necesita login.");
    }
    throw error;
  }
};

// ========================= API =========================
const api = {
  // ========== PRODUCTOS ==========
  getProductos: async () =>
    axiosAuth("get", "/productos/mis_productos/").then((r) => r.data),

  getAllProductos: async () =>
    axiosAuth("get", "/productos/").then((r) => r.data.results || r.data),

  getProductoById: async (id) =>
    axiosAuth("get", `/productos/${id}/`).then((r) => r.data),

  ajustarStock: async (id, operacion, cantidad) =>
    axiosAuth("post", `/productos/${id}/ajustar_stock/`, {
      operacion,
      cantidad,
    }).then((r) => r.data),

  // ========== TIENDAS ==========
  getTiendas: async () => axiosAuth("get", "/tiendas/").then((r) => r.data),

  getMisTiendas: async () =>
    axiosAuth("get", "/tiendas/mis_tiendas/").then((r) => r.data),

  getProductosPorTienda: async (tiendaId) =>
    axiosAuth(
      "get",
      `/productos/por_tienda/?tienda_id=${tiendaId}`
    ).then((r) => r.data),

  // ========== PEDIDOS ==========
  crearPedido: async (data) =>
    axiosAuth("post", "/pedidos/crear_pedido/", data).then((r) => r.data),

  getMisPedidos: async () =>
    axiosAuth("get", "/pedidos/mis_pedidos/").then((r) => r.data),

  getPedidosPendientes: async () =>
    axiosAuth("get", "/pedidos/pendientes/").then((r) => r.data),

  getPedidosEnPreparacion: async () =>
    axiosAuth("get", "/pedidos/en_preparacion/").then((r) => r.data),

  cambiarEstadoPedido: async (id, estado) =>
    axiosAuth("post", `/pedidos/${id}/cambiar_estado/`, {
      estado,
    }).then((r) => r.data),

  getDetallesPedido: async (id) =>
    axiosAuth(
      "get",
      `/detalles-pedido/por_pedido/?pedido_id=${id}`
    ).then((r) => r.data),

  // ========== AUTH ==========
  login: async (email, password) =>
    axios
      .post(`${API_BASE_URL}/auth/login/`, { email, password })
      .then((r) => r.data),

  register: async (data) =>
    axios.post(`${API_BASE_URL}/auth/register/`, data).then((r) => r.data),

  requestPasswordReset: async (email) =>
    axios.post(`${API_BASE_URL}/auth/forgot-password/`, { email }).then((r) => r.data),

  resetPassword: async (uid, token, newPassword) =>
    axios
      .post(`${API_BASE_URL}/auth/reset-password/${uid}/${token}/`, {
        password: newPassword,
      })
      .then((r) => r.data),

  // ========== MÉTODOS GENÉRICOS ==========
  get: async (endpoint) => axiosAuth("get", endpoint).then((r) => r.data),
  post: async (endpoint, data) => axiosAuth("post", endpoint, data).then((r) => r.data),
  put: async (endpoint, data) => axiosAuth("put", endpoint, data).then((r) => r.data),
  delete: async (endpoint) => axiosAuth("delete", endpoint).then((r) => r.data),
};

export default api;
