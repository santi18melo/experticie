// frontend/src/pages/Login.jsx - PROFESSIONAL VERSION
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import '../styles/Auth.css';

export default function Login() {
  const { login, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!email || !password) {
      setLocalError("Por favor ingresa email y contraseña.");
      return;
    }

    try {
      const res = await login(email.trim(), password);
      if (res && res.ok) {
        const user = res.user || JSON.parse(localStorage.getItem("user") || "null");
        
        // Redirect based on user role
        if (user && user.rol) {
          switch(user.rol) {
            case 'admin':
              navigate("/admin");
              break;
            case 'cliente':
              navigate("/cliente");
              break;
            case 'comprador':
              navigate("/comprador");
              break;
            case 'proveedor':
              navigate("/proveedor");
              break;
            case 'logistica':
              navigate("/logistica");
              break;
            default:
              navigate("/dashboard");
          }
        } else {
          navigate("/dashboard");
        }
      } else {
        setLocalError(res?.error || "Credenciales incorrectas o error de servidor.");
      }
    } catch (err) {
      console.error("Login unexpected error:", err);
      setLocalError("Error inesperado al iniciar sesión.");
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
          <h2>Iniciar Sesión</h2>
          <p className="auth-subtitle">Bienvenido de nuevo</p>
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
              data-testid="login-email"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <span className="label-icon">🔒</span>
              Contraseña
            </label>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                data-testid="login-password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {(localError || error) && (
            <div className="auth-error" role="alert">
              <span className="error-icon">⚠️</span>
              {localError || error}
            </div>
          )}

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
            data-testid="login-submit"
          >
            {loading ? (
              <>
                <span className="spinner-small"></span>
                Iniciando sesión...
              </>
            ) : (
              <>
                <span>Entrar</span>
                <span className="button-arrow">→</span>
              </>
            )}
          </button>

          <div className="auth-links">
            <Link to="/forgot-password" className="auth-link">
              ¿Olvidaste tu contraseña?
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
          <p className="info-text">
            <span className="info-icon">ℹ️</span>
            Sistema seguro con autenticación JWT
          </p>
        </div>
      </div>
    </div>
  );
}
