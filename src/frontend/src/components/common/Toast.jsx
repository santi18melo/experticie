import React from 'react';
import '../../styles/Toast.css';

/**
 * Sistema de notificaciones Toast moderno
 * @param {Object} props
 * @param {string} props.message - Mensaje a mostrar
 * @param {string} props.type - Tipo: 'success', 'error', 'warning', 'info'
 * @param {number} props.duration - Duración en ms (default: 3000)
 * @param {function} props.onClose - Callback al cerrar
 */
export default function Toast({ message, type = 'info', duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose && onClose(), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  const colors = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`toast toast-${type} ${isVisible ? 'toast-enter' : 'toast-exit'}`}
      style={{ borderLeftColor: colors[type] }}
    >
      <div className="toast-icon" style={{ background: colors[type] }}>
        {icons[type]}
      </div>
      <div className="toast-content">
        <p className="toast-message">{message}</p>
      </div>
      <button 
        className="toast-close" 
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose && onClose(), 300);
        }}
      >
        ✕
      </button>
    </div>
  );
}

/**
 * Contenedor para múltiples toasts
 */
export function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

/**
 * Hook para gestionar toasts
 */
export function useToast() {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = React.useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showSuccess = React.useCallback((message) => addToast(message, 'success'), [addToast]);
  const showError = React.useCallback((message) => addToast(message, 'error'), [addToast]);
  const showWarning = React.useCallback((message) => addToast(message, 'warning'), [addToast]);
  const showInfo = React.useCallback((message) => addToast(message, 'info'), [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
}
