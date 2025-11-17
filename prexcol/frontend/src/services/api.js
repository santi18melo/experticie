// src/services/api.js
import axios from 'axios';

// Configura la URL base de tu API Django
const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Cambiar según tu entorno

/**
 * Función para crear el header de autorización con token JWT o sesión
 * @param {string} token - Token de autenticación del usuario
 * @returns {object} headers
 */
const getAuthHeaders = (token) => ({
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
});

const api = {

  // ========================= PRODUCTOS =========================

  /**
   * Obtiene los productos del proveedor actual
   * Endpoint: GET /api/productos/mis_productos/
   * @param {string} token - Token del usuario proveedor
   * @returns {Array} lista de productos
   */
  getProductos: async (token) => {
    const response = await axios.get(`${API_BASE_URL}/productos/mis_productos/`, getAuthHeaders(token));
    return response.data;
  },

  // Devuelve todos los productos visibles para el usuario (paginado posible)
  getAllProductos: async (token) => {
    const response = await axios.get(`${API_BASE_URL}/productos/`, getAuthHeaders(token));
    // Manejar paginación: DRF devuelve {results: [...], count, next, previous} cuando aplica
    return response.data.results ? response.data.results : response.data;
  },

  // Obtener detalle de producto por id
  getProductoById: async (token, productoId) => {
    const response = await axios.get(`${API_BASE_URL}/productos/${productoId}/`, getAuthHeaders(token));
    return response.data;
  },

  /**
   * Ajusta el stock de un producto
   * Endpoint: POST /api/productos/{id}/ajustar_stock/
   * @param {string} token - Token del usuario
   * @param {number} productoId - ID del producto
   * @param {string} operacion - 'aumentar' o 'reducir'
   * @param {number} cantidad - cantidad a ajustar
   * @returns {object} información del stock actualizado
   */
  ajustarStock: async (token, productoId, operacion, cantidad) => {
    const body = {
      operacion, // "aumentar" o "reducir"
      cantidad
    };
    const response = await axios.post(`${API_BASE_URL}/productos/${productoId}/ajustar_stock/`, body, getAuthHeaders(token));
    return response.data;
  },

  // ========================= TIENDAS =========================

  /**
   * Obtiene todas las tiendas activas
   * Endpoint: GET /api/tiendas/
   * @param {string} token - Token del usuario
   * @returns {Array} lista de tiendas
   */
  getTiendas: async (token) => {
    const response = await axios.get(`${API_BASE_URL}/tiendas/`, getAuthHeaders(token));
    return response.data;
  },

  /**
   * Obtiene las tiendas administradas por el usuario actual
   * Endpoint: GET /api/tiendas/mis_tiendas/
   * @param {string} token - Token del usuario
   * @returns {Array} lista de tiendas
   */
  getMisTiendas: async (token) => {
    const response = await axios.get(`${API_BASE_URL}/tiendas/mis_tiendas/`, getAuthHeaders(token));
    return response.data;
  },

  // Obtener productos por tienda (usa la action por_tienda)
  getProductosPorTienda: async (token, tiendaId) => {
    const response = await axios.get(`${API_BASE_URL}/productos/por_tienda/?tienda_id=${tiendaId}`, getAuthHeaders(token));
    return response.data;
  },

  // ========================= PEDIDOS =========================

  /**
   * Crea un nuevo pedido (solo cliente)
   * Endpoint: POST /api/pedidos/crear_pedido/
   * @param {string} token - Token del usuario cliente
   * @param {object} data - { tienda_id, detalles: [{producto, cantidad}], notas }
   * @returns {object} pedido creado
   */
  crearPedido: async (token, data) => {
    const response = await axios.post(`${API_BASE_URL}/pedidos/crear_pedido/`, data, getAuthHeaders(token));
    return response.data;
  },

  /**
   * Obtiene los pedidos del usuario (según rol)
   * Endpoint: GET /api/pedidos/mis_pedidos/
   * @param {string} token - Token del usuario
   * @returns {Array} lista de pedidos
   */
  getMisPedidos: async (token) => {
    const response = await axios.get(`${API_BASE_URL}/pedidos/mis_pedidos/`, getAuthHeaders(token));
    return response.data;
  },

  // Obtener pedidos pendientes para comprador
  getPedidosPendientes: async (token) => {
    const response = await axios.get(`${API_BASE_URL}/pedidos/pendientes/`, getAuthHeaders(token));
    return response.data;
  },

  // Obtener pedidos en preparación para logística
  getPedidosEnPreparacion: async (token) => {
    const response = await axios.get(`${API_BASE_URL}/pedidos/en_preparacion/`, getAuthHeaders(token));
    return response.data;
  },

  /**
   * Cambia el estado de un pedido (admin, comprador, logística)
   * Endpoint: POST /api/pedidos/{id}/cambiar_estado/
   * @param {string} token - Token del usuario
   * @param {number} pedidoId - ID del pedido
   * @param {string} nuevoEstado - 'preparando', 'en_transito', 'entregado', 'cancelado'
   * @returns {object} pedido actualizado
   */
  cambiarEstadoPedido: async (token, pedidoId, nuevoEstado) => {
    const body = { estado: nuevoEstado };
    const response = await axios.post(`${API_BASE_URL}/pedidos/${pedidoId}/cambiar_estado/`, body, getAuthHeaders(token));
    return response.data;
  },

  // ========================= DETALLES PEDIDO =========================

  /**
   * Obtiene los detalles de un pedido específico
   * Endpoint: GET /api/detalles-pedido/por_pedido/?pedido_id=<id>
   * @param {string} token - Token del usuario
   * @param {number} pedidoId - ID del pedido
   * @returns {Array} detalles del pedido
   */
  getDetallesPedido: async (token, pedidoId) => {
    const response = await axios.get(`${API_BASE_URL}/detalles-pedido/por_pedido/?pedido_id=${pedidoId}`, getAuthHeaders(token));
    return response.data;
  }
};

export default api;
