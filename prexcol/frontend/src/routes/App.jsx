// src/routes/AuthApp.jsx
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "../pages/Login.jsx"
import Register from "../pages/Register.jsx";
import ForgotPassword from "../components/ForgotPassword.jsx";
import ResetPassword from "../components/ResetPassword.jsx";
import ProtectedRoute from "../routes/ProtectedRoute.jsx";

import PanelCliente from "../components/clientes/PanelCliente";
import PanelLogistica from "../components/logistica/PanelLogistica";
import PanelComprador from "../components/usuarios/PanelComprador";
import ProveedorPanel from "../components/usuarios/ProveedorPanel";


import Home from "../pages/Home.jsx";
import Dashboard from "../components/Dashboard.jsx";

import AppRoutes from "./App.jsx"; // Tus rutas internas
import AdminDashboard from "../pages/DashboardAdmin.jsx"; // IMPORTANTE

function AuthApp() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/app");
  };

  return (
    <Routes>

      {/* PÚBLICAS */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login onSuccess={handleLoginSuccess} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />

      {/* 🔥 RUTAS INTERNAS */}
      <Route path="/app/*" element={<AppRoutes />} />

      {/* 🔥 RUTA ADMIN FUNCIONANDO */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* DASHBOARD GENERAL */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute roles={["admin", "proveedor"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default function AuthAppWrapper() {
  return (
    <Router>
      <AuthApp />
    </Router>
  );
}
