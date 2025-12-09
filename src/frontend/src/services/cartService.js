// src/services/cartService.js

/**
 * CartService - Service for managing shopping cart
 * Uses localStorage to persist cart data
 * Cart structure: { items: [{ product, quantity }] }
 */

const CART_KEY = "prexcol_cart";

const CartService = {
  /**
   * Get current cart
   * @returns {Array} Cart items
   */
  getCart() {
    try {
      const cart = localStorage.getItem(CART_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error("Error getting cart:", error);
      return [];
    }
  },

  /**
   * Add product to cart
   * @param {Object} product - Product to add
   * @param {number} quantity - Quantity to add
   */
  addToCart(product, quantity = 1) {
    try {
      const cart = this.getCart();
      const existingItem = cart.find((item) => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ product, quantity });
      }

      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      return cart;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  },

  /**
   * Update quantity of item in cart
   * @param {number} productId - Product ID
   * @param {number} quantity - New quantity
   */
  updateQuantity(productId, quantity) {
    try {
      const cart = this.getCart();
      const item = cart.find((item) => item.product.id === productId);

      if (item) {
        if (quantity <= 0) {
          return this.removeFromCart(productId);
        }
        item.quantity = quantity;
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
      }

      return cart;
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      throw error;
    }
  },

  /**
   * Remove product from cart
   * @param {number} productId - Product ID to remove
   */
  removeFromCart(productId) {
    try {
      let cart = this.getCart();
      cart = cart.filter((item) => item.product.id !== productId);
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      return cart;
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  },

  /**
   * Clear entire cart
   */
  clearCart() {
    try {
      localStorage.removeItem(CART_KEY);
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  },

  /**
   * Get cart total
   * @returns {number} Total amount
   */
  getCartTotal() {
    try {
      const cart = this.getCart();
      return cart.reduce((total, item) => {
        const price = parseFloat(item.product.precio || 0);
        return total + price * item.quantity;
      }, 0);
    } catch (error) {
      console.error("Error calculating cart total:", error);
      return 0;
    }
  },

  /**
   * Get total items count
   * @returns {number} Total number of items
   */
  getCartCount() {
    try {
      const cart = this.getCart();
      return cart.reduce((count, item) => count + item.quantity, 0);
    } catch (error) {
      console.error("Error getting cart count:", error);
      return 0;
    }
  },
};

export default CartService;
