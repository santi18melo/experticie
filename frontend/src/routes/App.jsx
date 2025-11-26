// src/routes/App.jsx - Updated with all new routes
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppProviders from "../context/AppProviders";
import ProtectedRoute from "./ProtectedRoute";
import ErrorBoundary from "../components/ErrorBoundary";
import Loader from "../components/Loader";

// Auth pages
const Login = lazy(() => import("../pages/Login.jsx"));
const Register = lazy(() => import("../pages/Register.jsx"));
const Home = lazy(() => import("../pages/Home.jsx"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("../pages/ResetPassword.jsx"));

// Dashboards
const Dashboard = lazy(() => import("../pages/Dashboard.jsx"));
const AdminDashboard = lazy(() => import("../pages/DashboardAdmin.jsx"));
const CompradorDashboard = lazy(() => import("../pages/CompradorDashboard.jsx"));
const PanelCliente = lazy(() => import("../components/clientes/PanelCliente.jsx"));
const PanelLogistica = lazy(() => import("../components/logistica/PanelLogistica.jsx"));
const ProveedorPanel = lazy(() => import("../components/usuarios/ProveedorPanel.jsx"));

// New Components
const Cart = lazy(() => import("../pages/Cart.jsx"));
const Checkout = lazy(() => import("../pages/Checkout.jsx"));
const OrderHistory = lazy(() => import("../pages/OrderHistory.jsx"));
const Profile = lazy(() => import("../pages/Profile.jsx"));
const Notifications = lazy(() => import("../pages/Notifications.jsx"));
const Settings = lazy(() => import("../pages/Settings.jsx"));
const PaymentStatus = lazy(() => import("../pages/PaymentStatus.jsx"));
const PaymentHistory = lazy(() => import("../pages/PaymentHistory.jsx"));
const PaymentDetail = lazy(() => import("../pages/PaymentDetail.jsx"));

// Products
const Catalogo = lazy(() => import("../components/productos/Catalogo.jsx"));
const DetalleProducto = lazy(() => import("../components/productos/DetalleProducto.jsx"));

function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
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

      {/* Protected Routes - General Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

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

      {/* Protected Routes - Payment History */}
      <Route
        path="/payments"
        element={
          <ProtectedRoute>
            <PaymentHistory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payments/:id"
        element={
          <ProtectedRoute>
            <PaymentDetail />
          </ProtectedRoute>
        }
      />


      {/* Fallback - 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
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
