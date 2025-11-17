import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import AdminDashboard from "./pages/dashboardAdmin.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";

// Productos
import Catalogo from "./components/productos/Catalogo";
import DetalleProducto from "./components/productos/DetalleProducto";

// Usuarios
import PanelComprador from "./components/usuarios/PanelComprador";
import PanelProveedor from "./components/usuarios/ProveedorPanel.jsx";
import PanelCliente from "./components/clientes/PanelCliente";

// Logística
import PanelLogistica from "./components/logistica/PanelLogistica";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Panel Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Productos */}
        <Route
          path="/catalogo"
          element={
            <ProtectedRoute>
              <Catalogo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/producto/:id"
          element={
            <ProtectedRoute>
              <DetalleProducto />
            </ProtectedRoute>
          }
        />

        {/* Paneles por rol */}
        <Route
          path="/comprador"
          element={
            <ProtectedRoute role="comprador">
              <PanelComprador />
            </ProtectedRoute>
          }
        />
        <Route
          path="/proveedor"
          element={
            <ProtectedRoute role="proveedor">
              <PanelProveedor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logistica"
          element={
            <ProtectedRoute role="logistica">
              <PanelLogistica />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cliente"
          element={
            <ProtectedRoute role="cliente">
              <PanelCliente />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
