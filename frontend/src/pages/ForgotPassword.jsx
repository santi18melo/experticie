// frontend/src/pages/ForgotPassword.jsx - PROFESSIONAL VERSION
import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import '../styles/Auth.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Por favor ingresa tu correo electrónico");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/forgot-password/", { email });
      setSuccess(
        "✓ Si el correo existe en nuestro sistema, recibirás instrucciones para restablecer tu contraseña."
      );
      setEmail("");
    } catch (err) {
      console.error("Forgot password error:", err);
      setError(
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Error al procesar la solicitud. Intenta nuevamente."
      );
    } finally {
      setLoading(false);
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
          <p className="auth-subtitle">
            Ingresa tu correo y te enviaremos instrucciones
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">
              <span className="label-icon">📧</span>
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              autoComplete="email"
            />
          </div>

          {error && (
            <div className="auth-error" role="alert">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          {success && (
            <div className="auth-success" role="alert">
              <span className="success-icon">✓</span>
              {success}
            </div>
          )}

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-small"></span>
                Enviando...
              </>
            ) : (
              <>
                <span>Enviar Instrucciones</span>
                <span className="button-arrow">→</span>
              </>
            )}
          </button>

          <div className="auth-links">
            <Link to="/login" className="auth-link">
              ← Volver al inicio de sesión
            </Link>
          </div>

          <div className="auth-divider">
            <span>o</span>
          </div>

          <div className="auth-footer">
            <p>
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="auth-link-primary">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </form>

        <div className="auth-info">
          <div className="info-box">
            <p className="info-title">
              <span className="info-icon">💡</span>
              ¿Cómo funciona?
            </p>
            <ol className="info-list">
              <li>Ingresa tu correo electrónico registrado</li>
              <li>Recibirás un enlace de recuperación</li>
              <li>Haz clic en el enlace para crear una nueva contraseña</li>
              <li>Inicia sesión con tu nueva contraseña</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
