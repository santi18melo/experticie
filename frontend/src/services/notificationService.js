// src/services/notificationService.js
import { axiosInstance } from "./api";

/**
 * NotificationService - Service for notifications
 * Integrates with Django backend endpoints:
 * - GET /api/notificaciones/ - List user's notifications
 * - POST /api/notificaciones/{id}/marcar_leida/ - Mark as read
 * - GET /api/notificaciones/historial/{user_id}/ - Get notification history
 */

const NotificationService = {
  /**
   * Get user's notifications
   * @returns {Promise<Array>} List of notifications
   */
  async getNotifications() {
    try {
      const response = await axiosInstance.get("/notificaciones/");
      // Handle pagination (Django Rest Framework default)
      if (response.data && Array.isArray(response.data.results)) {
        return response.data.results;
      }
      // Handle non-paginated list
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  },

  /**
   * Mark notification as read
   * @param {number} notificationId - Notification ID
   * @returns {Promise<Object>} Updated notification
   */
  async markAsRead(notificationId) {
    try {
      const response = await axiosInstance.post(
        `/notificaciones/${notificationId}/marcar_leida/`
      );
      return response.data;
    } catch (error) {
      console.error(`Error marking notification ${notificationId} as read:`, error);
      throw error;
    }
  },

  /**
   * Get unread notification count
   * @returns {Promise<number>} Count of unread notifications
   */
  async getUnreadCount() {
    try {
      const notifications = await this.getNotifications();
      return notifications.filter((n) => !n.leida).length;
    } catch (error) {
      console.error("Error getting unread count:", error);
      return 0;
    }
  },
};

export default NotificationService;
