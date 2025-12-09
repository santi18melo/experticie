// frontend/src/context/AuthContext.jsx - FIXED FOR GUARANTEED RENDERING
import React, { createContext, useState, useEffect } from "react";
import { loginService } from "../services/authService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start as loading
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("[AuthContext] Error loading user:", e);
    } finally {
      setLoading(false); // Always set loading to false after initial load
    }
  }, []);

  // LOGIN
// src/context/AuthContext.jsx (solo el bloque login)
  const login = async (email, password) => {
  console.log("[AuthContext] login called", email);
  setLoading(true);
  setError(null);

  const res = await loginService(email, password);
  setLoading(false);
  console.log("[AuthContext] loginService result", res);

  if (res.ok && (res.access || res.user)) {
    // Guardar tokens y usuario
    if (res.access) localStorage.setItem("token", res.access);
    if (res.refresh) localStorage.setItem("refresh", res.refresh);
    if (res.user) localStorage.setItem("user", JSON.stringify(res.user));

    const finalUser = res.user || JSON.parse(localStorage.getItem("user") || "null");
    setUser(finalUser);   // <-- actualiza estado

    // **Navegación diferida**: useEffect observará `user`
    return { ok: true, access: res.access, refresh: res.refresh, user: finalUser };
  }

  const msg = res.error?.error || res.error?.detail || res.error?.message || (typeof res.error === 'string' ? res.error : "Credenciales incorrectas");
  console.error("[AuthContext] login failed:", msg);
  setError(msg);
  return { ok: false, error: msg };

  };

  // LOGOUT
  const logout = () => {
    console.log("[AuthContext] logout");

    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setUser(null);
  };

  // ALWAYS render children - never return null or loading screen

  // Compute userRole from user object
  const userRole = user?.rol || null;

  return (
    <AuthContext.Provider value={{ user, userRole, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// HOOK
export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
