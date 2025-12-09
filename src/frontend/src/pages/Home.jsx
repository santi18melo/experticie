// frontend/src/pages/Home.jsx - WITH PUBLIC SUPPORT ROUTES
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SEOHead, { SEOConfigs } from "../components/SEOHead";
import SocialShare from "../components/SocialShare";
import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [showSupportPopup, setShowSupportPopup] = useState(false);

  return (
    <div className="home-container">
      <SEOHead {...SEOConfigs.home} />
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
            <div className="feature-item">
              <span className="feature-icon">💬</span>
              <span className="feature-text">Soporte 24/7</span>
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

          {/* Sección de Ayuda Dual - ACCESO DIRECTO */}
          <div className="home-help-section">
            <h3>¿Necesitas Ayuda?</h3>
            <p>Acceso directo a nuestros canales de soporte</p>
            <div className="help-options">
              <button 
                onClick={() => navigate("/ai-assistant")}
                className="help-option-btn ai-option"
              >
                <span className="help-icon">🤖</span>
                <div className="help-text">
                  <strong>Asistente IA</strong>
                  <small>Disponible 24/7 • Respuestas instantáneas</small>
                </div>
              </button>
              <button 
                onClick={() => navigate("/support")}
                className="help-option-btn live-option"
              >
                <span className="help-icon">💬</span>
                <div className="help-text">
                  <strong>Chat en Vivo</strong>
                  <small>Agente humano • 2-5 min espera</small>
                </div>
              </button>
              <button 
                onClick={() => setShowSupportPopup(true)}
                className="help-option-btn contact-option"
              >
                <span className="help-icon">📞</span>
                <div className="help-text">
                  <strong>Otros Canales</strong>
                  <small>Email • Teléfono • Horarios</small>
                </div>
              </button>
            </div>
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
            <div className="stat-label">Soporte</div>
          </div>
        </div>

        <div className="home-social-section">
          <SocialShare 
            url="https://prexcol.com"
            title="PREXCOL - Plataforma de Comercio Electrónico Colombia"
            description="Únete a la plataforma líder de comercio electrónico en Colombia. Gestiona productos, pedidos y toda tu operación comercial."
            hashtags={['PREXCOL', 'EcommerceColombia', 'ComercioElectronico']}
            layout="horizontal"
          />
        </div>
      </div>

      {/* Botón Flotante de Soporte */}
      <button 
        className="floating-support-btn"
        onClick={() => navigate("/ai-assistant")}
        title="Asistente IA"
      >
        <span className="support-icon">🤖</span>
        <span className="support-text">Ayuda IA</span>
      </button>

      {/* Popup de Información de Soporte */}
      {showSupportPopup && (
        <div className="support-popup-overlay" onClick={() => setShowSupportPopup(false)}>
          <div className="support-popup" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowSupportPopup(false)}>×</button>
            <h3>📞 Contacta con Soporte</h3>
            <div className="popup-content">
              <div className="contact-option">
                <span className="contact-icon">🤖</span>
                <div>
                  <strong>Asistente IA</strong>
                  <p>Disponible 24/7 • Respuestas instantáneas</p>
                  <button onClick={() => navigate("/ai-assistant")} className="popup-btn">
                    Abrir Asistente IA
                  </button>
                </div>
              </div>
              <div className="contact-option">
                <span className="contact-icon">💬</span>
                <div>
                  <strong>Chat en Vivo</strong>
                  <p>Agente humano • Tiempo de espera: 2-5 min</p>
                  <button onClick={() => navigate("/support")} className="popup-btn">
                    Iniciar Chat
                  </button>
                </div>
              </div>
              <div className="contact-option">
                <span className="contact-icon">📧</span>
                <div>
                  <strong>Email</strong>
                  <p>soporte@prexcol.com</p>
                  <a href="mailto:soporte@prexcol.com" className="popup-btn">
                    Enviar Email
                  </a>
                </div>
              </div>
              <div className="contact-option">
                <span className="contact-icon">📱</span>
                <div>
                  <strong>Teléfono</strong>
                  <p>+57 300 123 4567</p>
                  <a href="tel:+573001234567" className="popup-btn">
                    Llamar Ahora
                  </a>
                </div>
              </div>
              <div className="contact-option">
                <span className="contact-icon">⏰</span>
                <div>
                  <strong>Horario de Atención</strong>
                  <p>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                  <p>Sábados: 9:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
