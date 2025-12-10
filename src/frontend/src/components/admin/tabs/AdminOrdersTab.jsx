import React, { useState } from 'react';

export default function AdminOrdersTab({ pedidos, loading, onUpdate }) {
  const [filtroEstado, setFiltroEstado] = useState("todos");

  const pedidosFiltrados = (pedidos || []).filter(p => {
    if (filtroEstado !== "todos" && p.estado !== filtroEstado) return false;
    return true;
  });

  return (
    <div className="content-section">
      <div className="section-header">
        <h2>Gestión de Pedidos</h2>
      </div>

      <div className="filters-container">
        <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)} className="filter-select">
          <option value="todos">Todos los Estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="preparando">Preparando</option>
          <option value="en_transito">En Tránsito</option>
          <option value="entregado">Entregado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Tienda</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidosFiltrados.map(pedido => (
              <tr key={pedido.id}>
                <td>
                   <div className="item-cell">
                     <div className="item-icon">🧾</div>
                     <span style={{fontWeight: 'bold', color: '#4a5568'}}>#{pedido.id}</span>
                   </div>
                </td>
                <td>
                    <div className="item-info">
                        <span className="item-title">{pedido.usuario_nombre || 'Cliente'}</span>
                        <span className="item-subtitle">ID: {pedido.usuario || 'N/A'}</span>
                    </div>
                </td>
                <td>{pedido.tienda_nombre || 'Tienda'}</td>
                <td><strong style={{color: '#2d3748'}}>${Number(pedido.total).toLocaleString()}</strong></td>
                <td><span className={`badge badge-${pedido.estado}`} style={{textTransform: 'capitalize'}}>{pedido.estado.replace('_', ' ')}</span></td>
                <td>{new Date(pedido.fecha_creacion).toLocaleDateString()}</td>
                <td>
                  <div className="actions-cell">
                    <button className="btn-icon edit" onClick={() => onUpdate(pedido, true)} title="Ver Detalles">👁️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
