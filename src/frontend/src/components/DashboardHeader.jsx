import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LanguageSelector from './LanguageSelector';
import { getMediaURL } from '../config/api.js';
import '../styles/DashboardHeader.css';

const DashboardHeader = ({ title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = React.useState(false);

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
        <div className="header-left">
           <h1>{title}</h1>
        </div>

        <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <a 
              href={`${getMediaURL('')}/swagger/`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-link"
              style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <span>📄</span> API
            </a>
            
            <LanguageSelector />

            <div 
              className="user-menu-container" 
              style={{ position: 'relative', cursor: 'pointer' }}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="user-profile-trigger" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="profile-text">
                   <span style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', color: '#1e293b' }}>{user?.nombre}</span>
                   <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', textTransform: 'capitalize' }}>{user?.rol}</span>
                </div>
                <div className="profile-avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #e2e8f0' }}>
                   {user?.imagen ? (
                      <img src={getImageUrl(user.imagen)} alt="Perfil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                   ) : (
                      <div style={{ width: '100%', height: '100%', background: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        {user?.nombre?.charAt(0) || "U"}
                      </div>
                   )}
                </div>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>▼</span>
              </div>

              {showDropdown && (
                <div className="user-dropdown" style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  width: '220px',
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #f1f5f9',
                  zIndex: 50,
                  overflow: 'hidden',
                  animation: 'fadeIn 0.2s ease-out'
                }}>
                  <div className="dropdown-header" style={{ padding: '16px', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                    <p style={{ margin: 0, fontWeight: 'bold', color: '#334155' }}>Mi Cuenta</p>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>{user?.email}</p>
                  </div>
                  <ul style={{ listStyle: 'none', padding: '8px 0', margin: 0 }}>
                    <li>
                      <button 
                        onClick={(e) => { e.stopPropagation(); navigate('/profile'); setShowDropdown(false); }}
                        style={{ width: '100%', textAlign: 'left', padding: '10px 16px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', color: '#475569', fontSize: '0.9rem', transition: 'background 0.2s' }}
                        onMouseOver={(e) => e.target.style.background = '#f8fafc'}
                        onMouseOut={(e) => e.target.style.background = 'transparent'}
                      >
                        <span>👤</span> Mi Perfil
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={(e) => { e.stopPropagation(); navigate('/settings'); setShowDropdown(false); }}
                        style={{ width: '100%', textAlign: 'left', padding: '10px 16px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', color: '#475569', fontSize: '0.9rem', transition: 'background 0.2s' }}
                        onMouseOver={(e) => e.target.style.background = '#f8fafc'}
                        onMouseOut={(e) => e.target.style.background = 'transparent'}
                      >
                        <span>⚙️</span> Configuración
                      </button>
                    </li>
                    <li style={{ borderTop: '1px solid #f1f5f9', marginTop: '8px', paddingTop: '8px' }}>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleLogout(); }}
                        style={{ width: '100%', textAlign: 'left', padding: '10px 16px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444', fontSize: '0.9rem', fontWeight: '500', transition: 'background 0.2s' }}
                        onMouseOver={(e) => e.target.style.background = '#fef2f2'}
                        onMouseOut={(e) => e.target.style.background = 'transparent'}
                      >
                        <span>🚪</span> Cerrar Sesión
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
