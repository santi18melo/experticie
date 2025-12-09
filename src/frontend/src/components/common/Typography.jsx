import React from 'react';
import '../../styles/variables.css';

export const Heading = ({ level = 1, children, className = '', color = 'primary' }) => {
  const Tag = `h${level}`;
  
  const sizes = {
    1: 'var(--font-size-4xl)',
    2: 'var(--font-size-3xl)',
    3: 'var(--font-size-2xl)',
    4: 'var(--font-size-xl)',
    5: 'var(--font-size-lg)',
    6: 'var(--font-size-base)',
  };

  const colors = {
    primary: 'var(--text-primary)',
    secondary: 'var(--text-secondary)',
    white: 'var(--text-white)',
    accent: 'var(--color-primary-accent)',
  };

  const style = {
    fontSize: sizes[level],
    fontWeight: 'var(--font-weight-bold)',
    color: colors[color],
    lineHeight: 1.2,
    marginBottom: 'var(--spacing-md)',
  };

  return <Tag style={style} className={className}>{children}</Tag>;
};

export const Text = ({ size = 'base', weight = 'normal', color = 'secondary', children, className = '' }) => {
  const sizes = {
    xs: 'var(--font-size-xs)',
    sm: 'var(--font-size-sm)',
    base: 'var(--font-size-base)',
    lg: 'var(--font-size-lg)',
    xl: 'var(--font-size-xl)',
  };

  const weights = {
    normal: 'var(--font-weight-normal)',
    medium: 'var(--font-weight-medium)',
    semibold: 'var(--font-weight-semibold)',
    bold: 'var(--font-weight-bold)',
  };

  const colors = {
    primary: 'var(--text-primary)',
    secondary: 'var(--text-secondary)',
    tertiary: 'var(--text-tertiary)',
    white: 'var(--text-white)',
    error: 'var(--color-error)',
    success: 'var(--color-success)',
  };

  const style = {
    fontSize: sizes[size],
    fontWeight: weights[weight],
    color: colors[color],
    lineHeight: 1.6,
  };

  return <p style={style} className={className}>{children}</p>;
};
