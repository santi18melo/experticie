// src/services/paymentService.js
import { axiosInstance } from "./api";

/**
 * PaymentService - Service for payment-related API calls
 * Integrates with Django backend endpoints:
 * - GET /api/pagos/pagos/ - List user's payments
 * - POST /api/pagos/pagos/ - Create new payment
 * - GET /api/pagos/pagos/:id/ - Get payment detail
 * - GET /api/pagos/pagos/:id/estado/ - Get payment status
 * - POST /api/pagos/pagos/transaccion/ - Register a transaction
 * - GET /api/pagos/metodos-pago/ - List available payment methods
 */

const PaymentService = {
  /**
   * Get available payment methods
   * @returns {Promise<Array>} List of active payment methods
   */
  async getPaymentMethods() {
    try {
      const response = await axiosInstance.get("/pagos/metodos-pago/");
      return response.data;
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      throw error;
    }
  },

  /**
   * Create a new payment
   * @param {Object} paymentData - Payment data { pedido, monto, estado, metodo_pago }
   * @returns {Promise<Object>} Created payment
   */
  async createPayment(paymentData) {
    try {
      const response = await axiosInstance.post("/pagos/pagos/", paymentData);
      return response.data;
    } catch (error) {
      console.error("Error creating payment:", error);
      throw error;
    }
  },

  /**
   * Get user's payment history
   * @returns {Promise<Array>} List of payments
   */
  async getPaymentHistory() {
    try {
      const response = await axiosInstance.get("/pagos/pagos/");
      return response.data;
    } catch (error) {
      console.error("Error fetching payment history:", error);
      throw error;
    }
  },

  /**
   * Get payment details by ID
   * @param {number} paymentId - Payment ID
   * @returns {Promise<Object>} Payment details
   */
  async getPayment(paymentId) {
    try {
      const response = await axiosInstance.get(`/pagos/pagos/${paymentId}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching payment ${paymentId}:`, error);
      throw error;
    }
  },

  /**
   * Get payment status
   * @param {number} paymentId - Payment ID
   * @returns {Promise<Object>} Payment status
   */
  async getPaymentStatus(paymentId) {
    try {
      const response = await axiosInstance.get(`/pagos/pagos/${paymentId}/estado/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching payment ${paymentId} status:`, error);
      throw error;
    }
  },

  /**
   * Register a transaction for a payment
   * @param {Object} transactionData - Transaction data { pago_id, monto, referencia_externa, estado, respuesta_gateway }
   * @returns {Promise<Object>} Created transaction
   */
  async registerTransaction(transactionData) {
    try {
      const response = await axiosInstance.post("/pagos/pagos/transaccion/", transactionData);
      return response.data;
    } catch (error) {
      console.error("Error registering transaction:", error);
      throw error;
    }
  },
};

export default PaymentService;
