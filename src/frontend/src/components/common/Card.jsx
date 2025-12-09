import React from 'react';
import '../../styles/variables.css';

const Card = ({ children, className = '', padding = 'large', elevation = 'md' }) => {
  const paddings = {
    none: '0',
    small: 'var(--spacing-sm)',
    medium: 'var(--spacing-md)',
    large: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
  };

  const shadows = {
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    xl: 'var(--shadow-xl)',
  };

  const style = {
    background: 'var(--bg-primary)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: shadows[elevation],
    padding: paddings[padding],
    border: '1px solid var(--border-light)',
    transition: 'var(--transition-base)',
  };

  return (
    <div style={style} className={`card ${className}`}>
      {children}
    </div>
  );
};

export default Card;
