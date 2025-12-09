import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPasswordService } from "../services/authService";
import "../styles/Auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const res = await forgotPasswordService(email);
    setLoading(false);

    if (res.ok) {
      setMessage("Se ha enviado un enlace de recuperación a tu correo.");
    } else {
      setError(res.error || "Error al enviar la solicitud.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-shape shape-1"></div>
        <div className="auth-shape shape-2"></div>
        <div className="auth-shape shape-3"></div>
      </div>

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <div className="logo-icon">🏪</div>
            <h1>PREXCOL</h1>
          </div>
          <h2>Recuperar Contraseña</h2>
          <p className="auth-subtitle">Ingresa tu correo para recibir un enlace</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">
              <span className="label-icon">📧</span>
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ejemplo@correo.com"
              data-testid="forgot-password-email"
            />
          </div>

          {message && (
            <div className="auth-success" role="alert">
              <span className="success-icon">✓</span>
              {message}
            </div>
          )}

          {error && (
            <div className="auth-error" role="alert">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Enviando..." : "Enviar Enlace"}
            {!loading && <span className="button-arrow">→</span>}
          </button>

          <div className="auth-footer">
            <p>
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="auth-link-primary">
                Inicia Sesión
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
