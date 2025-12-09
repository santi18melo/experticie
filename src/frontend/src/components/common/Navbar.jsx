import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/variables.css';
import Button from './Button';

const Navbar = ({ logo, links = [], user, onLogout }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navStyle = {
    background: 'var(--bg-glass)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid var(--border-light)',
    position: 'sticky',
    top: 0,
    zIndex: 'var(--z-fixed)',
    padding: '0 var(--spacing-lg)',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: 'var(--shadow-sm)',
  };

  const logoStyle = {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 'var(--font-weight-bold)',
    color: 'var(--color-primary-dark)',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
  };

  const linkContainerStyle = {
    display: 'flex',
    gap: 'var(--spacing-lg)',
    alignItems: 'center',
  };

  const linkStyle = (isActive) => ({
    color: isActive ? 'var(--color-primary-medium)' : 'var(--text-secondary)',
    fontWeight: isActive ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
    textDecoration: 'none',
    fontSize: 'var(--font-size-base)',
    transition: 'var(--transition-base)',
    padding: '8px 12px',
    borderRadius: 'var(--radius-md)',
    background: isActive ? 'var(--color-info-light)' : 'transparent',
  });

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>
        {logo || 'PREXCOL'}
      </Link>

      <div style={linkContainerStyle} className="desktop-menu">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={linkStyle(location.pathname === link.path)}
          >
            {link.label}
          </Link>
        ))}
        
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
              Hola, {user.username}
            </span>
            <Button variant="outline" size="small" onClick={onLogout}>
              Cerrar Sesión
            </Button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
            <Link to="/login">
              <Button variant="ghost" size="small">Iniciar Sesión</Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="small">Registrarse</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
