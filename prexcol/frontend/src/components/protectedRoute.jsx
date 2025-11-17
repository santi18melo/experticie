import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />; // No logueado
  if (role && userRole !== role) return <Navigate to="/login" />; // Rol no permitido

  return children; // Todo ok
}
