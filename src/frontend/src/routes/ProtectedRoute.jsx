// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

/**
 * Componente para proteger rutas según autenticación y roles.
 * @param {ReactNode} children - Componente hijo a renderizar si el usuario tiene acceso.
 * @param {string[]} roles - Lista de roles permitidos (opcional).
 */
export default function ProtectedRoute({ children, roles }) {
  const { userRole, loading } = useAuth();

  // Mientras carga información del usuario
  if (loading) {
    return <Loader />;
  }

  // Si NO hay usuario autenticado
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  // Si el usuario NO tiene el rol requerido
  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  // Acceso permitido
  return children;
}
