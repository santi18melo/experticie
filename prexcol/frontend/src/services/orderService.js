// src/services/orderService.js
import { axiosInstance } from "./api";

/**
 * OrderService - Service for order-related API calls
 * Integrates with Django backend endpoints:
 * - POST /api/pedidos/crear_pedido/ - Create new order
 * - GET /api/pedidos/ - List user's orders
 * - GET /api/pedidos/<id>/ - Get order detail
 * - PUT /api/pedidos/<id>/cambiar_estado/ - Update order status
 */

const OrderService = {
  /**
   * Create a new order
   * @param {Object} orderData - Order data { tienda_id, detalles, notas }
   * @returns {Promise<Object>} Created order
   */
  async createOrder(orderData) {
    try {
      const response = await axiosInstance.post("/pedidos/crear_pedido/", orderData);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  /**
   * Get user's order history
   * @returns {Promise<Array>} List of orders
   */
  async getOrderHistory() {
    try {
      const response = await axiosInstance.get("/pedidos/");
      return response.data;
    } catch (error) {
      console.error("Error fetching order history:", error);
      throw error;
    }
  },

  /**
   * Get order details by ID
   * @param {number} orderId - Order ID
   * @returns {Promise<Object>} Order details
   */
  async getOrder(orderId) {
    try {
      const response = await axiosInstance.get(`/pedidos/${orderId}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      throw error;
    }
  },

  /**
   * Update order status
   * @param {number} orderId - Order ID
   * @param {string} newStatus - New status
   * @returns {Promise<Object>} Updated order
   */
  async updateOrderStatus(orderId, newStatus) {
    try {
      const response = await axiosInstance.put(
        `/pedidos/${orderId}/cambiar_estado/`,
        { estado: newStatus }
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating order ${orderId} status:`, error);
      throw error;
    }
  },
};

export default OrderService;
