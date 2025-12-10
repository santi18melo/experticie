// frontend/src/pages/Register.jsx - PROFESSIONAL VERSION
import React, { useState } from "react";
import { registerService } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import '../styles/Auth.css';

export default function Register() {
  const navigate = useNavigate();
  
  const [formValues, setFormValues] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    direccion: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccess("");

    // Validaciones
    if (formValues.password !== formValues.confirmPassword) {
      setErrorMsg("Las contraseñas no coinciden");
      return;
    }

    if (formValues.password.length < 6) {
      setErrorMsg("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const { confirmPassword, ...dataToSend } = formValues;
    const res = await registerService(dataToSend);
    
    if (res.ok) {
      setSuccess("✓ Registro exitoso. Redirigiendo al login...");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      const backendError =
        res.error?.detail ||
        res.error?.message ||
        res.error?.error ||
        (typeof res.error === 'string' ? res.error : "Ocurrió un error en el registro.");

      setErrorMsg(backendError);
    }
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-shape shape-1"></div>
        <div className="auth-shape shape-2"></div>
        <div className="auth-shape shape-3"></div>
      </div>

      <div className="auth-card auth-card-wide">
        <div className="auth-header">
          <div className="auth-logo">
            <div className="logo-icon">🏪</div>
            <h1>PREXCOL</h1>
          </div>
          <h2>Crear Cuenta</h2>
          <p className="auth-subtitle">Únete a nuestra plataforma</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombre">
                <span className="label-icon">👤</span>
                Nombre Completo
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                value={formValues.nombre}
                onChange={handleChange}
                placeholder="Ingresa nombres y apellidos"
                data-testid="register-nombre"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <span className="label-icon">📧</span>
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="Ingresa tu correo electrónico"
                data-testid="register-email"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">
                <span className="label-icon">🔒</span>
                Contraseña
              </label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formValues.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  data-testid="register-password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                <span className="label-icon">🔐</span>
                Confirmar Contraseña
              </label>
              <div className="password-input-wrapper">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="telefono">
                <span className="label-icon">📱</span>
                Teléfono
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                value={formValues.telefono}
                onChange={handleChange}
                placeholder="Número de teléfono"
                data-testid="register-telefono"
              />
            </div>

            <div className="form-group">
              <label htmlFor="direccion">
                <span className="label-icon">📍</span>
                Dirección
              </label>
              <input
                id="direccion"
                name="direccion"
                type="text"
                value={formValues.direccion}
                onChange={handleChange}
                placeholder="Calle 12 #45-67"
                data-testid="register-direccion"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="auth-error" role="alert">
              <span className="error-icon">⚠️</span>
              {errorMsg}
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
            data-testid="register-submit"
          >
            <span>Crear Cuenta</span>
            <span className="button-arrow">→</span>
          </button>

          {/* Documentation Button */}
          <a 
            href="http://localhost:8000/docs/index.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="docs-button"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 20px',
              marginTop: '16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(102, 126, 234, 0.25)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 12px rgba(102, 126, 234, 0.35)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 6px rgba(102, 126, 234, 0.25)';
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>📚</span>
            <span>Ver Documentación</span>
            <span style={{ fontSize: '0.8rem' }}>↗</span>
          </a>

          <div className="auth-divider">
            <span>o</span>
          </div>

          <div className="auth-footer">
            <p>
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="auth-link-primary">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </form>

        <div className="auth-info">
          <p className="info-text">
            <span className="info-icon">🔒</span>
            Tus datos están protegidos y encriptados
          </p>
        </div>
      </div>
    </div>
  );
}
