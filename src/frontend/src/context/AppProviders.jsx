// src/context/AppProviders.jsx
import React from "react";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { NotificationProvider } from "./NotificationContext";
import { I18nProvider } from "./I18nContext";
import { ThemeProvider } from "./ThemeContext";

/**
 * AppProviders - Wraps all context providers in one component
 * Usage: Wrap your entire app with this component
 */
export const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <I18nProvider>
      <AuthProvider>
        <CartProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </CartProvider>
      </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
