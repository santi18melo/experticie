// src/routes/AuthApp.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";

import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ForgotPassword from "../components/ForgotPassword.jsx";
import ResetPassword from "../components/ResetPassword.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

import Home from "../pages/Home.jsx";
import Dashboard from "../components/Dashboard.jsx";
import AppRoutes from "./App.jsx";

function AuthApp() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/app");
  };

  return (
    <Routes>
      {/* Público */}
      <Route path="/" element={<Home />} />

      {/* Auth */}
      <Route path="/login" element={<Login onSuccess={handleLoginSuccess} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />

      {/* Redirección admin legacy */}
      <Route path="/admin" element={<Navigate to="/dashboard" replace />} />

      {/* App interna */}
      <Route path="/app/*" element={<AppRoutes />} />

      {/* Dashboard protegido */}
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
