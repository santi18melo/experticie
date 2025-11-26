import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPasswordService } from "../services/authService";
import "../styles/Login.css"; // Reusing Login styles for consistency

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
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Recuperar Contraseña</h2>
        <p className="login-subtitle">Ingresa tu correo para recibir un enlace</p>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ejemplo@correo.com"
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Enviando..." : "Enviar Enlace"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
