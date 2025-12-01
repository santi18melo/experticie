import React, { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { resetPasswordService } from "../services/authService";
import "../styles/ResetPassword.css";
import { FaLock, FaCheckCircle, FaExclamationCircle, FaArrowRight, FaTimesCircle, FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Validación de requisitos de contraseña en tiempo real
  const passwordRequirements = useMemo(() => {
    return {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
    };
  }, [password]);

  const isPasswordValid = useMemo(() => {
    return passwordRequirements.minLength && 
           passwordRequirements.hasUpperCase && 
           passwordRequirements.hasNumber;
  }, [passwordRequirements]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar requisitos de contraseña
    if (!isPasswordValid) {
      setError("La contraseña no cumple con los requisitos de seguridad");
      return;
    }

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
    <div className="reset-container">
      <div className="reset-bg">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="reset-card">
        <div className="reset-header">
          <div className="reset-logo">
            <span className="logo-icon">🔐</span>
            <h1>PREXCOL</h1>
          </div>
          <h2>Nueva Contraseña</h2>
          <p className="reset-subtitle">Ingresa tu nueva contraseña para recuperar el acceso</p>
        </div>

        {message && (
          <div className="reset-alert success">
            <FaCheckCircle className="success-icon" />
            <span>{message}</span>
          </div>
        )}
        
        {error && (
          <div className="reset-alert error">
            <FaExclamationCircle className="error-icon" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="reset-form">
          <div className="form-group">
            <label htmlFor="password">
              <FaLock className="label-icon" />
              Nueva Contraseña
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Ingresa tu nueva contraseña"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              <FaLock className="label-icon" />
              Confirmar Contraseña
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirma tu nueva contraseña"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="reset-button" disabled={loading}>
            {loading ? (
              <>
                <div className="spinner-small"></div>
                <span>Restableciendo...</span>
              </>
            ) : (
              <>
                <span>Restablecer Contraseña</span>
                <FaArrowRight className="button-arrow" />
              </>
            )}
          </button>

          <div className="reset-links">
            <Link to="/login" className="reset-link">
              ← Volver a Inicio de Sesión
            </Link>
          </div>
        </form>

        <div className="reset-info">
          <div className="info-box">
            <h4 className="info-title">
              <FaCheckCircle className="info-icon" />
              Requisitos de seguridad
            </h4>
            <ul className="requirements-list">
              <li className={passwordRequirements.minLength ? 'requirement-met' : 'requirement-unmet'}>
                {passwordRequirements.minLength ? (
                  <FaCheckCircle className="req-icon success" />
                ) : (
                  <FaTimesCircle className="req-icon error" />
                )}
                Mínimo 8 caracteres
              </li>
              <li className={passwordRequirements.hasUpperCase ? 'requirement-met' : 'requirement-unmet'}>
                {passwordRequirements.hasUpperCase ? (
                  <FaCheckCircle className="req-icon success" />
                ) : (
                  <FaTimesCircle className="req-icon error" />
                )}
                Al menos una letra mayúscula
              </li>
              <li className={passwordRequirements.hasNumber ? 'requirement-met' : 'requirement-unmet'}>
                {passwordRequirements.hasNumber ? (
                  <FaCheckCircle className="req-icon success" />
                ) : (
                  <FaTimesCircle className="req-icon error" />
                )}
                Al menos un número
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
