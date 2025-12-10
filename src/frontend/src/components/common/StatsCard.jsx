import React from 'react';
import '../../styles/StatsCard.css';

/**
 * Tarjeta de estadística mejorada con animaciones
 * @param {Object} props
 * @param {string} props.title - Título de la estadística
 * @param {string|number} props.value - Valor principal
 * @param {string} props.icon - Emoji o icono
 * @param {string} props.trend - 'up', 'down', 'neutral'
 * @param {string} props.trendValue - Valor del cambio (ej: "+12%")
 * @param {string} props.color - Color del tema
 * @param {function} props.onClick - Callback al hacer click
 */
export default function StatsCard({
  title,
  value,
  icon = '📊',
  trend = 'neutral',
  trendValue,
  color = '#3b82f6',
  onClick
}) {
  const trendIcons = {
    up: '↗',
    down: '↘',
    neutral: '→'
  };

  const trendColors = {
    up: '#10b981',
    down: '#ef4444',
    neutral: '#64748b'
  };

  return (
    <div 
      className={`stats-card ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
      style={{ borderLeftColor: color }}
    >
      <div className="stats-header">
        <div className="stats-icon" style={{ background: `${color}15` }}>
          <span style={{ fontSize: '24px' }}>{icon}</span>
        </div>
        {trendValue && (
          <div 
            className="stats-trend"
            style={{ color: trendColors[trend] }}
          >
            <span className="trend-icon">{trendIcons[trend]}</span>
            <span className="trend-value">{trendValue}</span>
          </div>
        )}
      </div>

      <div className="stats-body">
        <h3 className="stats-value" style={{ color }}>{value}</h3>
        <p className="stats-title">{title}</p>
      </div>

      {onClick && (
        <div className="stats-footer">
          <span className="stats-action">Ver detalles →</span>
        </div>
      )}
    </div>
  );
}

/**
 * Contenedor de tarjetas de estadísticas
 */
export function StatsGrid({ children, columns = 4 }) {
  return (
    <div 
      className="stats-grid"
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${100 / columns}%, 1fr))`
      }}
    >
      {children}
    </div>
  );
}
