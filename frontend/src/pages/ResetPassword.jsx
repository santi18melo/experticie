// frontend/src/pages/ResetPassword.jsx - PROFESSIONAL VERSION
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import '../styles/ResetPassword.css';

export default function ResetPassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validaciones
    if (!password || !confirmPassword) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(`/auth/reset-password/${uid}/${token}/`, {
        password: password,
      });

      setSuccess("✓ ¡Contraseña actualizada! Ahora puedes iniciar sesión con tu nueva contraseña. Redirigiendo...");
      
      // Clear password fields for security
      setPassword("");
      setConfirmPassword("");
      
      setTimeout(() => {
        navigate("/login", { state: { message: "Contraseña actualizada. Usa tu nueva contraseña para iniciar sesión." } });
      }, 3000);
    } catch (err) {
      console.error("Reset password error:", err);
      setError(
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Token inválido o expirado. Solicita un nuevo enlace."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-bg">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="reset-card">
        <div className="reset-header">
          <div className="reset-logo">
            <div className="logo-icon">🔐</div>
            <h1>PREXCOL</h1>
          </div>
          <h2>Restablecer Contraseña</h2>
          <p className="reset-subtitle">
            Ingresa tu nueva contraseña
          </p>
        </div>

        <form onSubmit={handleSubmit} className="reset-form">
          <div className="form-group">
            <label htmlFor="password">
              <span className="label-icon">🔑</span>
              Nueva Contraseña
            </label>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Mostrar contraseña"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              <span className="label-icon">✓</span>
              Confirmar Contraseña
            </label>
            <div className="password-input-wrapper">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite tu contraseña"
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label="Mostrar contraseña"
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {error && (
            <div className="reset-alert error" role="alert">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          {success && (
            <div className="reset-alert success" role="alert">
              <span className="success-icon">✓</span>
              {success}
            </div>
          )}

          <button
            type="submit"
            className="reset-button"
            disabled={loading}
          >
            {loading ? (
              <React.Fragment key="loading">
                <span className="spinner-small"></span>
                <span>Guardando...</span>
              </React.Fragment>
            ) : (
              <React.Fragment key="ready">
                <span>Guardar Nueva Contraseña</span>
                <span className="button-arrow">→</span>
              </React.Fragment>
            )}
          </button>

          <div className="reset-links">
            <Link to="/login" className="reset-link">
              ← Volver al inicio de sesión
            </Link>
          </div>
        </form>

        <div className="reset-info">
          <div className="info-box">
            <p className="info-title">
              <span className="info-icon">🔒</span>
              Consejos de seguridad
            </p>
            <ul>
              <li>Usa al menos 6 caracteres</li>
              <li>Combina letras, números y símbolos</li>
              <li>No uses información personal</li>
              <li>No reutilices contraseñas antiguas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
