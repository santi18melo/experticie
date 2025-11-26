// frontend/src/pages/Home.jsx - PROFESSIONAL VERSION
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-background">
        <div className="home-shape shape-1"></div>
        <div className="home-shape shape-2"></div>
        <div className="home-shape shape-3"></div>
      </div>

      <div className="home-content">
        <div className="home-card">
          <div className="home-logo">
            <div className="logo-icon-large">🏪</div>
            <h1 className="brand-name">PREXCOL</h1>
          </div>

          <h2 className="home-title">Bienvenido a PREXCOL</h2>
          <p className="home-subtitle">
            Plataforma centralizada de gestión y procesos empresariales
          </p>

          <div className="home-features">
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span className="feature-text">Gestión Eficiente</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <span className="feature-text">Seguro y Confiable</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <span className="feature-text">Reportes en Tiempo Real</span>
            </div>
          </div>

          <div className="home-actions">
            <button
              onClick={() => navigate("/login")}
              className="btn-home-primary"
            >
              <span>Iniciar Sesión</span>
              <span className="btn-arrow">→</span>
            </button>

            <button
              onClick={() => navigate("/register")}
              className="btn-home-secondary"
            >
              <span>Crear Cuenta</span>
            </button>
          </div>

          <div className="home-info">
            <p className="info-text">
              <span className="info-icon">ℹ️</span>
              Sistema de gestión integral para empresas
            </p>
          </div>
        </div>

        <div className="home-stats">
          <div className="stat-item">
            <div className="stat-number">5</div>
            <div className="stat-label">Roles de Usuario</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Seguro</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Disponible</div>
          </div>
        </div>
      </div>
    </div>
  );
}
