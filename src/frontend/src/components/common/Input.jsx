import React from 'react';
import '../../styles/variables.css';

const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  name,
  disabled = false,
  required = false
}) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-xs)',
    marginBottom: 'var(--spacing-md)',
    width: '100%',
  };

  const labelStyle = {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--text-secondary)',
  };

  const inputStyle = {
    padding: '12px 16px',
    borderRadius: 'var(--radius-md)',
    border: error ? '2px solid var(--color-error)' : '2px solid var(--border-light)',
    fontSize: 'var(--font-size-base)',
    fontFamily: 'var(--font-family)',
    background: disabled ? 'var(--bg-secondary)' : 'var(--bg-primary)',
    color: 'var(--text-primary)',
    transition: 'var(--transition-base)',
    width: '100%',
    boxSizing: 'border-box',
  };

  const errorStyle = {
    fontSize: 'var(--font-size-xs)',
    color: 'var(--color-error)',
    marginTop: 'var(--spacing-xs)',
  };

  return (
    <div style={containerStyle}>
      {label && (
        <label htmlFor={name} style={labelStyle}>
          {label} {required && <span style={{ color: 'var(--color-primary-accent)' }}>*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={inputStyle}
        onFocus={(e) => {
          if (!error && !disabled) {
            e.target.style.borderColor = 'var(--color-primary-medium)';
            e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
          }
        }}
        onBlur={(e) => {
          if (!error && !disabled) {
            e.target.style.borderColor = 'var(--border-light)';
            e.target.style.boxShadow = 'none';
          }
        }}
      />
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
};

export default Input;
