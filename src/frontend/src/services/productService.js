// src/services/productService.js
import { axiosInstance } from "./api";

/**
 * ProductService - Service for product-related API calls
 * Integrates with Django backend endpoints:
 * - GET /api/productos/ - List all products (public)
 * - GET /api/productos/<id>/ - Get product detail
 * - POST /api/productos/ - Create product (admin only)
 * - PUT /api/productos/<id>/ - Update product
 * - DELETE /api/productos/<id>/ - Delete product
 */

const ProductService = {
  /**
   * Get all products (public access)
   * @returns {Promise<Array>} List of products
   */
  async listProducts() {
    try {
      const response = await axiosInstance.get("/productos/productos/");
      if (response.data && response.data.results) {
        return response.data.results;
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  /**
   * Get product by ID
   * @param {number} productId - Product ID
   * @returns {Promise<Object>} Product details
   */
  async getProduct(productId) {
    try {
      const response = await axiosInstance.get(`/productos/productos/${productId}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error);
      throw error;
    }
  },

  /**
   * Search products by name
   * @param {string} query - Search query
   * @returns {Promise<Array>} Filtered products
   */
  async searchProducts(query) {
    try {
      const response = await axiosInstance.get(`/productos/productos/?search=${query}`);
      if (response.data && response.data.results) {
        return response.data.results;
      }
      return response.data;
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  },

  /**
   * Create new product (Admin only)
   * @param {Object} productData - Product data
   * @returns {Promise<Object>} Created product
   */
  async createProduct(productData) {
    try {
      const response = await axiosInstance.post("/productos/productos/", productData);
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  /**
   * Update product
   * @param {number} productId - Product ID
   * @param {Object} productData - Updated product data
   * @returns {Promise<Object>} Updated product
   */
  async updateProduct(productId, productData) {
    try {
      const response = await axiosInstance.put(`/productos/productos/${productId}/`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${productId}:`, error);
      throw error;
    }
  },

  /**
   * Delete product
   * @param {number} productId - Product ID
   * @returns {Promise<void>}
   */
  async deleteProduct(productId) {
    try {
      await axiosInstance.delete(`/productos/productos/${productId}/`);
    } catch (error) {
      console.error(`Error deleting product ${productId}:`, error);
      throw error;
    }
  },
};

export default ProductService;
