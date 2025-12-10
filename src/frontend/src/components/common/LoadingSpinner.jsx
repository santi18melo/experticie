import React from 'react';
import '../../styles/LoadingSpinner.css';

/**
 * Componente de spinner de carga moderno y profesional
 * @param {Object} props
 * @param {string} props.size - Tamaño: 'small', 'medium', 'large'
 * @param {string} props.message - Mensaje opcional a mostrar
 * @param {boolean} props.fullScreen - Si debe ocupar toda la pantalla
 */
export default function LoadingSpinner({ 
  size = 'medium', 
  message = 'Cargando...', 
  fullScreen = false 
}) {
  const sizeClasses = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large'
  };

  const spinnerClass = `loading-spinner ${sizeClasses[size]}`;
  
  if (fullScreen) {
    return (
      <div className="loading-fullscreen">
        <div className="loading-content">
          <div className={spinnerClass}>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-core"></div>
          </div>
          {message && <p className="loading-message">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="loading-inline">
      <div className={spinnerClass}>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-core"></div>
      </div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
}
