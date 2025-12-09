import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../services/api';

export default function SalesTab() {
  const [ventas, setVentas] = useState([]);
  const [reporte, setReporte] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [expandedRow, setExpandedRow] = useState(null);
  const [stats, setStats] = useState({ totalVentas: 0, promedioVenta: 0, totalItems: 0 });

  useEffect(() => {
    fetchVentas();
    fetchReporteDiario();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [ventas]);

  const calculateStats = () => {
    if (ventas.length === 0) {
      setStats({ totalVentas: 0, promedioVenta: 0, totalItems: 0 });
      return;
    }
    const totalVentas = ventas.reduce((sum, v) => sum + parseFloat(v.total || 0), 0);
    const totalItems = ventas.reduce((sum, v) => sum + (v.cantidad_items || 0), 0);
    const promedioVenta = totalVentas / ventas.length;
    setStats({ totalVentas, promedioVenta, totalItems });
  };

  const fetchVentas = async () => {
    setLoading(true);
    try {
      let url = '/ventas/';
      const params = [];
      if (fechaInicio) params.push(`fecha_inicio=${fechaInicio}`);
      if (fechaFin) params.push(`fecha_fin=${fechaFin}`);
      if (params.length > 0) url += `?${params.join('&')}`;

      const res = await axiosInstance.get(url);
      setVentas(res.data.results || res.data);
    } catch (error) {
      console.error("Error fetching sales:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReporteDiario = async () => {
    try {
      const res = await axiosInstance.get('/ventas/reporte_diario/');
      setReporte(res.data);
    } catch (error) {
      console.error("Error fetching daily report:", error);
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchVentas();
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="content-section">
      <div className="section-header">
        <h2>📊 Reporte de Ventas</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: '#718096', textTransform: 'uppercase', fontWeight: 'bold' }}>Total Ventas</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748' }}>
              ${stats.totalVentas.toLocaleString('es-CO', {maximumFractionDigits: 0})}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: '#718096', textTransform: 'uppercase', fontWeight: 'bold' }}>Transacciones</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748' }}>
              {ventas.length}
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <form onSubmit={handleFilter} className="form-card">
        <div className="form-grid" style={{ alignItems: 'end' }}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' }}>Fecha Inicio</label>
            <input 
              type="date" 
              value={fechaInicio} 
              onChange={(e) => setFechaInicio(e.target.value)}
              className="form-control"
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' }}>Fecha Fin</label>
            <input 
              type="date" 
              value={fechaFin} 
              onChange={(e) => setFechaFin(e.target.value)}
              className="form-control"
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn-primary" style={{ padding: '10px 20px' }}>
              Filtrar
            </button>
            {(fechaInicio || fechaFin) && (
              <button 
                type="button" 
                onClick={() => { setFechaInicio(''); setFechaFin(''); fetchVentas(); }}
                className="btn-secondary"
                style={{ padding: '10px 20px', background: '#e2e8f0', color: '#4a5568', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
              >
                Limpiar
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Tabla */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th style={{ textAlign: 'center' }}>Items</th>
              <th style={{ textAlign: 'right' }}>Total</th>
              <th style={{ textAlign: 'center' }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
                  Cargando datos...
                </td>
              </tr>
            ) : ventas.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
                  No se encontraron registros.
                </td>
              </tr>
            ) : (
              ventas.map((venta) => (
                <React.Fragment key={venta.id}>
                  <tr style={{ background: expandedRow === venta.id ? '#f7fafc' : 'transparent' }}>
                    <td>
                      <span className="badge badge-normal" style={{ fontWeight: 'bold' }}>#{venta.id}</span>
                    </td>
                    <td>
                      <div style={{ fontWeight: '500' }}>{new Date(venta.fecha_venta).toLocaleDateString('es-CO')}</div>
                      <div style={{ fontSize: '12px', color: '#718096' }}>
                        {new Date(venta.fecha_venta).toLocaleTimeString('es-CO', {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: '600', color: '#2d3748' }}>{venta.cliente?.nombre || 'Usuario'}</div>
                      <div style={{ fontSize: '12px', color: '#718096' }}>{venta.cliente?.email}</div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="badge badge-info" style={{ background: '#ebf8ff', color: '#2b6cb0' }}>
                        {venta.cantidad_items}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 'bold', color: '#2d3748' }}>
                      ${parseFloat(venta.total).toLocaleString('es-CO')}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button 
                        onClick={() => toggleRow(venta.id)}
                        style={{ 
                          background: 'transparent', 
                          border: 'none', 
                          color: '#3182ce', 
                          fontWeight: '600', 
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        {expandedRow === venta.id ? 'Ocultar' : 'Ver detalle'}
                      </button>
                    </td>
                  </tr>
                  
                  {/* Detalle Expandido */}
                  {expandedRow === venta.id && (
                    <tr>
                      <td colSpan="6" style={{ padding: '0' }}>
                        <div style={{ background: '#f8fafc', padding: '20px', borderBottom: '1px solid #e2e8f0' }}>
                          <div style={{ background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                              <thead>
                                <tr style={{ background: '#edf2f7', borderBottom: '1px solid #e2e8f0' }}>
                                  <th style={{ padding: '10px 15px', textAlign: 'left', fontSize: '12px', color: '#4a5568', textTransform: 'uppercase' }}>Producto</th>
                                  <th style={{ padding: '10px 15px', textAlign: 'right', fontSize: '12px', color: '#4a5568', textTransform: 'uppercase' }}>Precio Unit.</th>
                                  <th style={{ padding: '10px 15px', textAlign: 'center', fontSize: '12px', color: '#4a5568', textTransform: 'uppercase' }}>Cant.</th>
                                  <th style={{ padding: '10px 15px', textAlign: 'right', fontSize: '12px', color: '#4a5568', textTransform: 'uppercase' }}>Subtotal</th>
                                </tr>
                              </thead>
                              <tbody>
                                {venta.detalles?.map((detalle) => (
                                  <tr key={detalle.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                                    <td style={{ padding: '10px 15px', fontSize: '14px', color: '#2d3748' }}>{detalle.producto_nombre}</td>
                                    <td style={{ padding: '10px 15px', textAlign: 'right', fontSize: '14px', color: '#718096' }}>${parseFloat(detalle.precio_unitario).toLocaleString('es-CO')}</td>
                                    <td style={{ padding: '10px 15px', textAlign: 'center', fontSize: '14px', color: '#718096' }}>{detalle.cantidad}</td>
                                    <td style={{ padding: '10px 15px', textAlign: 'right', fontSize: '14px', fontWeight: '600', color: '#2d3748' }}>${parseFloat(detalle.subtotal).toLocaleString('es-CO')}</td>
                                  </tr>
                                ))}
                              </tbody>
                              <tfoot>
                                <tr style={{ background: '#f7fafc' }}>
                                  <td colSpan="3" style={{ padding: '10px 15px', textAlign: 'right', fontWeight: 'bold', color: '#4a5568', fontSize: '12px', textTransform: 'uppercase' }}>Total Venta</td>
                                  <td style={{ padding: '10px 15px', textAlign: 'right', fontWeight: 'bold', color: '#2b6cb0', fontSize: '15px' }}>${parseFloat(venta.total).toLocaleString('es-CO')}</td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div style={{ marginTop: '15px', textAlign: 'right', fontSize: '12px', color: '#a0aec0' }}>
        Mostrando {ventas.length} registros
      </div>
    </div>
  );
}
