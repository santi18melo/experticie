// src/context/AppProviders.jsx
import React from "react";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { NotificationProvider } from "./NotificationContext";

/**
 * AppProviders - Wraps all context providers in one component
 * Usage: Wrap your entire app with this component
 */
export const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default AppProviders;
