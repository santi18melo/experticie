import React from 'react';
import '../../styles/ConfirmDialog.css';

/**
 * Diálogo de confirmación reutilizable
 * @param {Object} props
 * @param {boolean} props.isOpen - Si el diálogo está abierto
 * @param {string} props.title - Título del diálogo
 * @param {string} props.message - Mensaje a mostrar
 * @param {string} props.confirmText - Texto del botón confirmar
 * @param {string} props.cancelText - Texto del botón cancelar
 * @param {function} props.onConfirm - Callback al confirmar
 * @param {function} props.onCancel - Callback al cancelar
 * @param {string} props.type - Tipo: 'danger', 'warning', 'info'
 */
export default function ConfirmDialog({
  isOpen,
  title = '¿Estás seguro?',
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  type = 'warning'
}) {
  if (!isOpen) return null;

  const typeConfig = {
    danger: {
      icon: '⚠️',
      color: '#ef4444',
      bgColor: '#fee2e2'
    },
    warning: {
      icon: '⚡',
      color: '#f59e0b',
      bgColor: '#fef3c7'
    },
    info: {
      icon: 'ℹ️',
      color: '#3b82f6',
      bgColor: '#dbeafe'
    }
  };

  const config = typeConfig[type] || typeConfig.warning;

  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon" style={{ background: config.bgColor }}>
          <span style={{ fontSize: '48px' }}>{config.icon}</span>
        </div>
        
        <div className="confirm-content">
          <h3 className="confirm-title">{title}</h3>
          <p className="confirm-message">{message}</p>
        </div>

        <div className="confirm-actions">
          <button 
            className="btn-cancel" 
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button 
            className={`btn-confirm btn-confirm-${type}`}
            onClick={onConfirm}
            style={{ background: config.color }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Hook para gestionar diálogos de confirmación
 */
export function useConfirmDialog() {
  const [dialogState, setDialogState] = React.useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    type: 'warning'
  });

  const showConfirm = React.useCallback((options) => {
    return new Promise((resolve) => {
      setDialogState({
        isOpen: true,
        title: options.title || '¿Estás seguro?',
        message: options.message || '',
        type: options.type || 'warning',
        confirmText: options.confirmText,
        cancelText: options.cancelText,
        onConfirm: () => {
          setDialogState(prev => ({ ...prev, isOpen: false }));
          resolve(true);
        },
        onCancel: () => {
          setDialogState(prev => ({ ...prev, isOpen: false }));
          resolve(false);
        }
      });
    });
  }, []);

  const ConfirmDialogComponent = React.useCallback(() => (
    <ConfirmDialog {...dialogState} />
  ), [dialogState]);

  return {
    showConfirm,
    ConfirmDialog: ConfirmDialogComponent
  };
}
