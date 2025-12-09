import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LanguageSelector from './LanguageSelector';
import { getMediaURL } from '../config/api.js';
import '../styles/DashboardHeader.css';

const DashboardHeader = ({ title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setTimeout(() => {
      console.log('[DashboardHeader] Redirecting to /login');
      window.location.replace('/login');
    }, 200);
  };

  const getImageUrl = (path) => {
    return getMediaURL(path) || null;
  };

  return (
    <div className="dashboard-header">
      <div className="header-content">
        <div 
          className="header-left profile-section" 
          onClick={() => navigate('/profile')}
          title="Clic para editar perfil"
        >
          <div className="profile-image-container">
            {user?.imagen ? (
              <img 
                src={getImageUrl(user.imagen)} 
                alt="Perfil" 
                className="profile-image"
              />
            ) : (
              <div className="profile-placeholder">
                {user?.nombre?.charAt(0) || "U"}
              </div>
            )}
            <div className="profile-edit-overlay">
              <span>✏️</span>
            </div>
          </div>
          <div className="profile-info">
            <h1>{title}</h1>
            <p>Bienvenido, <strong>{user?.nombre}</strong></p>
            <span className="edit-hint">Editar perfil</span>
          </div>
        </div>
        <a 
          href={`${getMediaURL('')}/swagger/`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-link"
          style={{ marginRight: '1rem', color: 'var(--text-main)', textDecoration: 'none' }}
        >
          📄 API Docs
        </a>
        <LanguageSelector />
        <button onClick={handleLogout} className="btn-logout">
          🚪 Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
