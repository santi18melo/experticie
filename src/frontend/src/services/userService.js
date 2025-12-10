// src/services/userService.js
import { axiosInstance } from "./api";

/**
 * UserService - Service for user profile and management
 * Integrates with Django backend endpoints:
 * - GET /api/users/me/ - Get current user profile
 * - PUT /api/users/me/ - Update current user profile
 * - GET /api/users/ - List users (admin only)
 */

const UserService = {
  /**
   * Get current user profile
   * @returns {Promise<Object>} User profile
   */
  async getProfile() {
    try {
      // Note: This endpoint needs to be created in Django backend
      const response = await axiosInstance.get("/usuarios/me/");
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },

  /**
   * Update current user profile
   * @param {Object} profileData - Updated profile data
   * @returns {Promise<Object>} Updated user profile
   */
  async updateProfile(profileData) {
    try {
      const isFormData = profileData instanceof FormData;
      const config = isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {};
      
      const response = await axiosInstance.put("/usuarios/me/", profileData, config);
      return response.data;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  },

  /**
   * Get all users (Admin only)
   * @returns {Promise<Array>} List of users
   */
  async getAllUsers() {
    try {
      const response = await axiosInstance.get("/usuarios/");
      // Handle pagination
      if (response.data && response.data.results) {
        return response.data.results;
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  /**
   * Get all active providers (Admin only)
   * @returns {Promise<Array>} List of providers
   */
  async getProveedores() {
    try {
      const response = await axiosInstance.get("/usuarios/proveedores/");
      return response.data;
    } catch (error) {
      console.error("Error fetching providers:", error);
      throw error;
    }
  },
  /**
   * Create a new user (Admin only)
   * @param {Object} userData - User data
   * @returns {Promise<Object>} Created user
   */
  async createUser(userData) {
    try {
      const response = await axiosInstance.post("/usuarios/", userData);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  /**
   * Update a user (Admin only)
   * @param {number} userId - User ID
   * @param {Object} userData - User data to update
   * @returns {Promise<Object>} Updated user
   */
  async updateUser(userId, userData) {
    try {
        const response = await axiosInstance.patch(`/usuarios/${userId}/`, userData);
        return response.data;
    } catch (error) {
        console.error(`Error updating user ${userId}:`, error);
        throw error;
    }
  },

  /**
   * Delete a user (Admin only)
   * @param {number} userId - User ID
   * @returns {Promise<void>}
   */
  async deleteUser(userId) {
    try {
        await axiosInstance.delete(`/usuarios/${userId}/`);
    } catch (error) {
        console.error(`Error deleting user ${userId}:`, error);
        throw error;
    }
  },
};

export default UserService;
