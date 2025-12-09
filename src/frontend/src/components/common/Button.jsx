import React from 'react';
import '../../styles/variables.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  onClick, 
  type = 'button',
  fullWidth = false,
  className = ''
}) => {
  const baseStyles = {
    borderRadius: 'var(--radius-md)',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'var(--font-family)',
    fontWeight: 'var(--font-weight-semibold)',
    transition: 'var(--transition-all)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
  };

  const variants = {
    primary: {
      background: 'var(--gradient-primary)',
      color: 'var(--text-white)',
      boxShadow: 'var(--shadow-primary)',
    },
    secondary: {
      background: 'var(--bg-secondary)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-medium)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--color-primary-medium)',
      border: '2px solid var(--color-primary-medium)',
    },
    danger: {
      background: 'var(--color-error)',
      color: 'var(--text-white)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
      boxShadow: 'none',
    }
  };

  const sizes = {
    small: {
      padding: '8px 16px',
      fontSize: 'var(--font-size-sm)',
    },
    medium: {
      padding: '12px 24px',
      fontSize: 'var(--font-size-base)',
    },
    large: {
      padding: '16px 32px',
      fontSize: 'var(--font-size-lg)',
    },
  };

  const style = {
    ...baseStyles,
    ...variants[variant],
    ...sizes[size],
  };

  return (
    <button
      type={type}
      style={style}
      disabled={disabled}
      onClick={onClick}
      className={`btn-${variant} ${className}`}
      onMouseEnter={(e) => {
        if (!disabled && variant === 'primary') {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-primary-lg)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && variant === 'primary') {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'var(--shadow-primary)';
        }
      }}
    >
      {children}
    </button>
  );
};

export default Button;
