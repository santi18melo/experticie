// src/routes/App.jsx - Updated with all new routes
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppProviders from "../context/AppProviders";
import ProtectedRoute from "./ProtectedRoute";
import ErrorBoundary from "../components/ErrorBoundary";

// Auth pages
import Login from "../pages/login.jsx";
import Register from "../pages/register.jsx";
import Home from "../pages/Home.jsx";
import ForgotPassword from "../components/ForgotPassword.jsx";
import ResetPassword from "../components/ResetPassword.jsx";

// Dashboards
import AdminDashboard from "../pages/dashboardAdmin.jsx";
import CompradorDashboard from "../pages/CompradorDashboard.jsx";
import PanelCliente from "../components/clientes/PanelCliente.jsx";
import PanelLogistica from "../components/logistica/PanelLogistica.jsx";
import ProveedorPanel from "../components/usuarios/ProveedorPanel.jsx";

// New Components
import Cart from "../pages/Cart.jsx";
import Checkout from "../pages/Checkout.jsx";
import OrderHistory from "../pages/OrderHistory.jsx";
import Profile from "../pages/Profile.jsx";
import Notifications from "../pages/Notifications.jsx";
import Settings from "../pages/Settings.jsx";
import PaymentStatus from "../pages/PaymentStatus.jsx";

// Products
import Catalogo from "../components/productos/Catalogo.jsx";
import DetalleProducto from "../components/productos/DetalleProducto.jsx";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />

      {/* Public Product Routes */}
      <Route path="/productos" element={<Catalogo />} />
      <Route path="/productos/:id" element={<DetalleProducto />} />

      {/* Protected Routes - Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - Comprador */}
      <Route
        path="/comprador"
        element={
          <ProtectedRoute roles={["comprador"]}>
            <CompradorDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - Cliente */}
      <Route
        path="/cliente"
        element={
          <ProtectedRoute roles={["cliente"]}>
            <PanelCliente />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - Logística */}
      <Route
        path="/logistica"
        element={
          <ProtectedRoute roles={["logistica"]}>
            <PanelLogistica />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - Proveedor */}
      <Route
        path="/proveedor"
        element={
          <ProtectedRoute roles={["proveedor"]}>
            <ProveedorPanel />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - Cart & Checkout */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - Orders */}
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrderHistory />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - Profile */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - Notifications */}
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - Settings */}
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - Payment Status */}
      <Route
        path="/payment/:paymentId"
        element={
          <ProtectedRoute>
            <PaymentStatus />
          </ProtectedRoute>
        }
      />

      {/* Fallback - 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppProviders>
          <AppRoutes />
        </AppProviders>
      </Router>
    </ErrorBoundary>
  );
}
