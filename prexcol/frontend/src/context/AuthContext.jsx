// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");
    const userName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");

    if (token && role) {
      setUser({ id: userId, nombre: userName, rol: role });
      setUserRole(role);
      setIsAuthenticated(true);
    }
    setLoading(false);
  };

  const login = (userData, tokens) => {
    // Save tokens
    localStorage.setItem("accessToken", tokens.access);
    if (tokens.refresh) {
      localStorage.setItem("refreshToken", tokens.refresh);
    }

    // Save user data
    localStorage.setItem("role", userData.rol);
    localStorage.setItem("userName", userData.nombre);
    localStorage.setItem("userId", userData.id);

    setUser(userData);
    setUserRole(userData.rol);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");

    setUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    userRole,
    loading,
    isAuthenticated,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
