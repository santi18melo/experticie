import React, { useState, useEffect } from 'react';
import '../../styles/ModalEdicion.css'; // Use existing modal styles

export default function LiveMetricsModal({ onClose }) {
  const [metrics, setMetrics] = useState({
      activeUsers: 45,
      requestsPerMinute: 120,
      cpuLoad: 35,
      memoryUsage: 42,
      recentSales: []
  });

  const [graphData, setGraphData] = useState(Array(20).fill(0));

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
        setMetrics(prev => ({
            activeUsers: Math.floor(Math.random() * 10) + 40,
            requestsPerMinute: Math.floor(Math.random() * 50) + 100,
            cpuLoad: Math.floor(Math.random() * 20) + 20,
            memoryUsage: Math.floor(Math.random() * 10) + 40,
            recentSales: prev.recentSales // In a real app this would fetch new sales
        }));

        setGraphData(prev => {
            const newValue = Math.floor(Math.random() * 100);
            return [...prev.slice(1), newValue];
        });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '800px', width: '90%' }}>
        <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>📊 Métricas en Tiempo Real</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
            <div className="stat-card" style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '2rem', color: '#3b82f6' }}>{metrics.activeUsers}</h3>
                <p style={{ margin: 0, color: '#64748b' }}>Usuarios Activos</p>
            </div>
            <div className="stat-card" style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '2rem', color: '#10b981' }}>{metrics.requestsPerMinute}</h3>
                <p style={{ margin: 0, color: '#64748b' }}>Req / min</p>
            </div>
            <div className="stat-card" style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '2rem', color: '#f59e0b' }}>{metrics.cpuLoad}%</h3>
                <p style={{ margin: 0, color: '#64748b' }}>Carga CPU</p>
            </div>
            <div className="stat-card" style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '2rem', color: '#6366f1' }}>{metrics.memoryUsage}%</h3>
                <p style={{ margin: 0, color: '#64748b' }}>Uso Memoria</p>
            </div>
        </div>

        <div style={{ marginTop: '30px', height: '200px', background: '#1e293b', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '5px' }}>
            {graphData.map((val, i) => (
                <div 
                    key={i} 
                    style={{ 
                        width: '100%', 
                        height: `${val}%`, 
                        background: '#38bdf8',
                        borderRadius: '4px 4px 0 0',
                        opacity: 0.8,
                        transition: 'height 0.3s ease'
                    }} 
                />
            ))}
        </div>
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.9rem', marginTop: '10px' }}>Actividad del servidor (últimos 20 segundos)</p>

        <div className="modal-actions" style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn-cancel" style={{ padding: '10px 20px' }}>Cerrar Monitor</button>
        </div>
      </div>
    </div>
  );
}
