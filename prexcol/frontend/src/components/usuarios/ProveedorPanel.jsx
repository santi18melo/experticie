import React, { useEffect, useState } from 'react';
import api from '../../services/api.js';
import '../../styles/ProveedorPanel.css/';

function PanelProveedor() {
  const [productos, setProductos] = useState([]);
  const [cantidades, setCantidades] = useState({});
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState({});
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getProductos(token);
      setProductos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error cargando productos:', error);
      setError('No se pudieron cargar los productos.');
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  const ajustarStock = async (id, operacion) => {
    const cantidad = cantidades[id];
    if (!cantidad || cantidad <= 0) {
      setError('Ingresa una cantidad válida mayor a 0');
      return;
    }

    setError('');
    setMensaje('');
    setUpdating(prev => ({ ...prev, [id]: true }));
    try {
      const resultado = await api.ajustarStock(token, id, operacion, cantidad);
      // Si la API devuelve el producto actualizado úsalo, si no, aplica cambio optimista
      if (resultado && resultado.producto) {
        setProductos(prev => prev.map(p => p.id === id ? resultado.producto : p));
      } else {
        setProductos(prev => prev.map(p => {
          if (p.id !== id) return p;
          const nueva = { ...p };
          if (operacion === 'aumentar') nueva.stock = nueva.stock + Number(cantidad);
          if (operacion === 'reducir') nueva.stock = Math.max(0, nueva.stock - Number(cantidad));
          return nueva;
        }));
      }
      setMensaje(resultado.mensaje || 'Stock actualizado');
      setCantidades(prev => ({ ...prev, [id]: 0 }));

      // refrescar en background para obtener datos consistentes
      setTimeout(() => {
        cargarProductos();
        setMensaje('');
      }, 1200);
    } catch (error) {
      console.error('Error ajustando stock:', error);
      const errMsg = error.response?.data?.error || 'Error al ajustar stock';
      setError('❌ ' + errMsg);
    } finally {
      setUpdating(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleCantidadChange = (id, value) => {
    setCantidades(prev => ({
      ...prev,
      [id]: parseInt(value) || 0
    }));
  };

  const calcularValorTotal = () => {
    return productos.reduce((sum, p) => sum + (p.precio * p.stock), 0);
  };

  if (loading) return <div className="panel-proveedor"><p>Cargando...</p></div>;

  return (
    <div className="panel-proveedor">
      <h1>📦 Mi Inventario de Productos</h1>

      {error && <div className="alert alert-error">{error}</div>}
      {mensaje && <div className="alert alert-success">{mensaje}</div>}

      {productos.length > 0 ? (
        <>
          <div className="resumen-inventario">
            <div className="stat-card">
              <h3>{productos.length}</h3>
              <p>Productos</p>
            </div>
            <div className="stat-card">
              <h3>{productos.reduce((sum, p) => sum + p.stock, 0)}</h3>
              <p>Unidades en Stock</p>
            </div>
            <div className="stat-card">
              <h3>${calcularValorTotal().toFixed(2)}</h3>
              <p>Valor Inventario</p>

                      <div className="resumen-categorias">
                        <div className="categoria-card basicos">
                          <h4>🔹 Productos Básicos</h4>
                          <div className="stat-item">
                            <span className="label">Productos:</span>
                            <span className="valor">{productos.filter(p => p.es_basico).length}</span>
                          </div>
                          <div className="stat-item">
                            <span className="label">Stock:</span>
                            <span className="valor">{productos.filter(p => p.es_basico).reduce((s, p) => s + p.stock, 0)}</span>
                          </div>
                          <div className="stat-item">
                            <span className="label">Valor:</span>
                            <span className="valor">${productos.filter(p => p.es_basico).reduce((s, p) => s + (p.precio * p.stock), 0).toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="categoria-card no-basicos">
                          <h4>✨ Productos No Básicos</h4>
                          <div className="stat-item">
                            <span className="label">Productos:</span>
                            <span className="valor">{productos.filter(p => !p.es_basico).length}</span>
                          </div>
                          <div className="stat-item">
                            <span className="label">Stock:</span>
                            <span className="valor">{productos.filter(p => !p.es_basico).reduce((s, p) => s + p.stock, 0)}</span>
                          </div>
                          <div className="stat-item">
                            <span className="label">Valor:</span>
                            <span className="valor">${productos.filter(p => !p.es_basico).reduce((s, p) => s + (p.precio * p.stock), 0).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
            </div>
          </div>

          <div className="productos-grid">
            {productos.map(p => (
              <div key={p.id} className="producto-item">
                <div className="producto-header">
                  <h3>{p.nombre}</h3>
                  <span className="precio">${p.precio}</span>
                              <span className={`categoria-badge ${p.es_basico ? 'basico' : 'no-basico'}`}>
                                {p.es_basico ? '🔹 Básico' : '✨ No Básico'}
                              </span>
                </div>

                <p className="descripcion">{p.descripcion}</p>

                <div className="stock-info">
                  <p>Stock Actual: <strong>{p.stock} unidades</strong></p>
                  <div className="stock-bar">
                    <div className="stock-filled" style={{ width: `${Math.min((p.stock / 100) * 100, 100)}%` }}></div>
                  </div>
                </div>

                <div className="control-stock">
                  <div className="cantidad-quick">
                    <button className="quick-btn" onClick={() => handleCantidadChange(p.id, (cantidades[p.id] || 0) + 1)}>+1</button>
                    <button className="quick-btn" onClick={() => handleCantidadChange(p.id, Math.max(0, (cantidades[p.id] || 0) - 1))}>-1</button>
                    <input
                      type="number"
                      min="0"
                      value={cantidades[p.id] || ''}
                      onChange={e => handleCantidadChange(p.id, e.target.value)}
                      placeholder="Cantidad"
                      className="input-cantidad"
                    />
                  </div>

                  <div className="accion-buttons">
                    <button
                      onClick={() => ajustarStock(p.id, 'aumentar')}
                      className="btn btn-aumentar"
                      disabled={!cantidades[p.id] || updating[p.id]}
                    >
                      {updating[p.id] ? 'Actualizando...' : '➕ Aumentar'}
                    </button>

                    <button
                      onClick={() => ajustarStock(p.id, 'reducir')}
                      className="btn btn-reducir"
                      disabled={!cantidades[p.id] || updating[p.id] || p.stock === 0}
                    >
                      {updating[p.id] ? 'Actualizando...' : '➖ Reducir'}
                    </button>
                  </div>
                </div>

                <p className="tienda-info">Tienda: <strong>{p.tienda_nombre || 'N/A'}</strong></p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="sin-productos">
          <p>No tienes productos asignados</p>
        </div>
      )}
    </div>
  );
}

export default PanelProveedor;
