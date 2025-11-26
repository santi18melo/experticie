import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPasswordService } from "../services/authService";
import "../styles/Login.css"; // Reusing Login styles for consistency

export default function ResetPassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    const res = await resetPasswordService(uid, token, password);
    setLoading(false);

    if (res.ok) {
      setMessage("Contraseña restablecida correctamente. Redirigiendo...");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      setError(res.error || "Error al restablecer la contraseña.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Nueva Contraseña</h2>
        <p className="login-subtitle">Ingresa tu nueva contraseña</p>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="password">Nueva Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="********"
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Restableciendo..." : "Restablecer Contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
}
