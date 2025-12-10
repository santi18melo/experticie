// frontend/src/components/ModalDetallePedido.jsx
import React, { useEffect, useState } from 'react';
import { getDetallesPedido } from '../services/productosService';
import '../styles/ModalEdicion.css'; // Reusing modal styles

export default function ModalDetallePedido({ pedido, onClose, showStatusChange = false, onStatusChange }) {
  const [detalles, setDetalles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentStatus, setCurrentStatus] = useState(pedido?.estado);

  useEffect(() => {
    if (pedido) {
      cargarDetalles();
      setCurrentStatus(pedido.estado);
    }
  }, [pedido]);

  const cargarDetalles = async () => {
    setLoading(true);
    try {
      const data = await getDetallesPedido(pedido.id);
      setDetalles(data);
    } catch (err) {
      console.error("Error cargando detalles:", err);
      setError("Error al cargar los detalles del pedido");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (e) => {
      const newStatus = e.target.value;
      setCurrentStatus(newStatus);
      if (onStatusChange) {
          onStatusChange(pedido.id, newStatus);
      }
  };

  if (!pedido) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        <div className="modal-header">
          <h2>📦 Detalle Pedido #{pedido.id}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body" style={{ padding: '20px' }}>
          {/* Info General */}
          <div style={{ marginBottom: '20px', padding: '15px', background: '#f8fafc', borderRadius: '8px' }}>
             <p><strong>Cliente:</strong> {pedido.cliente_nombre}</p>
             <p><strong>Tienda:</strong> {pedido.tienda_nombre}</p>
             <p><strong>Fecha:</strong> {new Date(pedido.fecha_creacion).toLocaleString()}</p>
             <p>
                 <strong>Estado:</strong> 
                 {showStatusChange ? (
                     <select 
                        value={currentStatus} 
                        onChange={handleStatusChange}
                        style={{marginLeft: '10px', padding: '4px', borderRadius: '4px', border: '1px solid #cbd5e1'}}
                     >
                        <option value="pendiente">Pendiente</option>
                        <option value="preparando">Preparando</option>
                        <option value="en_transito">En Tránsito</option>
                        <option value="entregado">Entregado</option>
                        <option value="cancelado">Cancelado</option>
                     </select>
                 ) : (
                    <span className={`badge badge-${pedido.estado}`} style={{marginLeft: '5px'}}>{pedido.estado}</span>
                 )}
             </p>
             {pedido.notas && <p><strong>Notas:</strong> {pedido.notas}</p>}
          </div>

          {/* Lista de Productos */}
          <h3>Productos</h3>
          {loading ? (
            <p>Cargando productos...</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : (
            <div className="detalles-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                    <th style={{ padding: '10px' }}>Producto</th>
                    <th style={{ padding: '10px' }}>Cant.</th>
                    <th style={{ padding: '10px' }}>Precio Unit.</th>
                    <th style={{ padding: '10px' }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {detalles.map((detalle) => (
                    <tr key={detalle.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px' }}>{detalle.producto_nombre}</td>
                      <td style={{ padding: '10px' }}>{detalle.cantidad}</td>
                      <td style={{ padding: '10px' }}>${Number(detalle.precio_unitario).toFixed(2)}</td>
                      <td style={{ padding: '10px' }}>${(Number(detalle.precio_unitario) * detalle.cantidad).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                    <tr style={{ borderTop: '2px solid #e2e8f0', fontWeight: 'bold' }}>
                        <td colSpan="3" style={{ padding: '10px', textAlign: 'right' }}>Total:</td>
                        <td style={{ padding: '10px' }}>${Number(pedido.total).toFixed(2)}</td>
                    </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
