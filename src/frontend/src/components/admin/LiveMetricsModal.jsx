import React, { useState, useEffect, useCallback } from 'react';
import { axiosInstance } from '../../services/api';
import '../../styles/ModalEdicion.css';

const TIME_RANGES = [
  { id: '20s', label: '20s' },
  { id: '1m', label: '1 min' },
  { id: '1h', label: '1 hora' },
  { id: '1d', label: '1 día' },
  { id: '1w', label: '1 sem' },
  { id: '1mo', label: '1 mes' },
  { id: '3mo', label: '3 mes' },
  { id: '6mo', label: '6 mes' },
  { id: '1y', label: '1 año' }
];

const TABS = [
  { id: 'ventas', label: '💰 Ventas' },
  { id: 'usuarios', label: '👥 Usuarios' },
  { id: 'plataforma', label: '🖥️ Plataforma' }
];

export default function LiveMetricsModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('plataforma');
  const [timeRange, setTimeRange] = useState('20s');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Determine refresh interval based on range
  const getInterval = () => {
      if (['20s', '1m'].includes(timeRange)) return 2000; // Fast refresh
      if (['1h', '1d'].includes(timeRange)) return 10000; // Medium
      return 60000; // Slow
  };

  const fetchMetrics = useCallback(async () => {
    try {
        const response = await axiosInstance.get(`/admin/metrics/?range=${timeRange}`);
        setData(response.data);
        setError(null);
    } catch (err) {
        console.error("Error fetching metrics:", err);
        setError("Error de conexión al recuperar métricas.");
    } finally {
        setLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, getInterval());
    return () => clearInterval(interval);
  }, [fetchMetrics]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '900px', width: '95%', maxHeight: '90vh', overflowY: 'auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px' }}>
             <h2>📊 Monitor de Métricas en Tiempo Real</h2>
             <button onClick={onClose} className="btn-cancel" style={{ padding: '5px 10px' }}>✕</button>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px', background: '#f1f5f9', padding: '10px', borderRadius: '8px' }}>
            {TIME_RANGES.map(range => (
                <button 
                    key={range.id}
                    onClick={() => setTimeRange(range.id)}
                    style={{
                        padding: '6px 12px',
                        border: 'none',
                        borderRadius: '6px',
                        background: timeRange === range.id ? '#3b82f6' : 'white',
                        color: timeRange === range.id ? 'white' : '#64748b',
                        cursor: 'pointer',
                        fontWeight: '500',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s'
                    }}
                >
                    {range.label}
                </button>
            ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '5px', marginBottom: '20px', borderBottom: '2px solid #e2e8f0' }}>
            {TABS.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                        padding: '10px 20px',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: activeTab === tab.id ? '2px solid #3b82f6' : '2px solid transparent',
                        color: activeTab === tab.id ? '#3b82f6' : '#64748b',
                        fontWeight: '600',
                        cursor: 'pointer',
                        marginBottom: '-2px'
                    }}
                >
                    {tab.label}
                </button>
            ))}
        </div>

        {/* Content */}
        {loading && !data ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>Cargando métricas...</div>
        ) : error ? (
            <div style={{ padding: '20px', color: '#ef4444', background: '#fee2e2', borderRadius: '8px' }}>{error}</div>
        ) : (
            <>
                {activeTab === 'plataforma' && (
                    <div className="metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                        <MetricCard title="Carga CPU" value={`${data.platform.cpu_load}%`} color="#f59e0b" />
                        <MetricCard title="Memoria Uso" value={`${data.platform.memory_usage}%`} sub={`(${data.platform.memory_used_gb} GB)`} color="#6366f1" />
                        <MetricCard title="Disco Uso" value={`${data.platform.disk_usage}%`} color="#10b981" />
                        <MetricCard title="Hora Servidor" value={data.platform.server_time} color="#64748b" />
                    </div>
                )}

                {activeTab === 'ventas' && (
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                            <MetricCard title="Pedidos Totales" value={data.sales.total_orders} color="#3b82f6" />
                            <MetricCard title="Ingresos" value={`$${data.sales.total_revenue.toLocaleString()}`} color="#10b981" />
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                             <ListCard title="🏆 Más Vendidos" items={data.sales.top_products} emptyMsg="No hay ventas en este periodo" />
                             <ListCard title="📉 Menos Vendidos" items={data.sales.bottom_products} emptyMsg="No hay ventas en este periodo" />
                        </div>
                     </div>
                )}

                {activeTab === 'usuarios' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
                         <MetricCard title="Activos" value={data.users.active} color="#10b981" />
                         <MetricCard title="Inactivos" value={data.users.inactive} color="#94a3b8" />
                         <MetricCard title="Nuevos (en rango)" value={data.users.new_users} color="#3b82f6" />
                    </div>
                )}
            </>
        )}

        <p style={{ textAlign: 'right', fontSize: '0.8rem', color: '#94a3b8', marginTop: '20px' }}>
             Actualización automática cada {getInterval()/1000}s
        </p>

      </div>
    </div>
  );
}

function MetricCard({ title, value, sub, color }) {
    return (
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase' }}>{title}</h4>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: color }}>{value}</div>
            {sub && <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{sub}</div>}
        </div>
    );
}

function ListCard({ title, items, emptyMsg }) {
    return (
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#334155' }}>{title}</h4>
            {items.length === 0 ? (
                <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>{emptyMsg}</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {items.map((item, idx) => (
                        <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                            <span style={{ color: '#475569' }}>{item.producto__nombre}</span>
                            <strong style={{ color: '#3b82f6' }}>{item.qty} un.</strong>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
