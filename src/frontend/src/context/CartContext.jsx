// src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import CartService from "../services/cartService";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Load cart on mount
  useEffect(() => {
    refreshCart();
  }, []);

  const refreshCart = () => {
    const items = CartService.getCart();
    setCart(items);
    setCartCount(CartService.getCartCount());
    setCartTotal(CartService.getCartTotal());
  };

  const addToCart = (product, quantity = 1) => {
    CartService.addToCart(product, quantity);
    refreshCart();
  };

  const updateQuantity = (productId, quantity) => {
    CartService.updateQuantity(productId, quantity);
    refreshCart();
  };

  const removeFromCart = (productId) => {
    CartService.removeFromCart(productId);
    refreshCart();
  };

  const clearCart = () => {
    CartService.clearCart();
    refreshCart();
  };

  const value = {
    cart,
    cartCount,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
