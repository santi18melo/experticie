import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../services/api';

export default function StockConfigTab() {
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [config, setConfig] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingConfig, setLoadingConfig] = useState(false);
  
  // Form state
  const [stockMinimo, setStockMinimo] = useState(10);
  const [cantidadRecarga, setCantidadRecarga] = useState(50);
  const [autoRecarga, setAutoRecarga] = useState(true);

  useEffect(() => {
    fetchProductos();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      fetchConfigAndHistory(selectedProduct.id);
    }
  }, [selectedProduct]);

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/productos/productos/?page_size=1000');
      setProductos(res.data.results || res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchConfigAndHistory = async (productId) => {
    setLoadingConfig(true);
    try {
      // Fetch Config
      try {
        const resConfig = await axiosInstance.get(`/productos/${productId}/config_stock/`);
        setConfig(resConfig.data);
        setStockMinimo(resConfig.data.stock_minimo);
        setCantidadRecarga(resConfig.data.cantidad_recarga);
        setAutoRecarga(resConfig.data.recarga_automatica_activa);
      } catch (e) {
        // No config exists yet
        setConfig(null);
        setStockMinimo(10);
        setCantidadRecarga(50);
        setAutoRecarga(true);
      }

      // Fetch History
      const resHistory = await axiosInstance.get(`/productos/${productId}/historial_recargas/`);
      setHistory(resHistory.data);

    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setLoadingConfig(false);
    }
  };

  const handleSaveConfig = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      await axiosInstance.post(`/productos/${selectedProduct.id}/config_stock/`, {
        stock_minimo: stockMinimo,
        cantidad_recarga: cantidadRecarga,
        recarga_automatica_activa: autoRecarga
      });
      alert("Configuración guardada exitosamente");
      fetchConfigAndHistory(selectedProduct.id);
    } catch (error) {
      console.error("Error saving config:", error);
      alert("Error al guardar configuración");
    }
  };

  const handleManualRecharge = async () => {
    if (!selectedProduct || !window.confirm("¿Ejecutar recarga manual ahora?")) return;

    try {
      await axiosInstance.post(`/productos/${selectedProduct.id}/ejecutar_recarga/`);
      alert("Recarga ejecutada exitosamente");
      fetchConfigAndHistory(selectedProduct.id);
      fetchProductos(); // Update stock in list
    } catch (error) {
      console.error("Error executing recharge:", error);
      alert("Error al ejecutar recarga");
    }
  };

  return (
    <div className="content-section" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
      
      {/* Product List */}
      <div className="card" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <h3>📦 Productos</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {loading ? <p>Cargando...</p> : productos.map(p => (
            <div 
              key={p.id}
              onClick={() => setSelectedProduct(p)}
              style={{
                padding: '10px',
                border: selectedProduct?.id === p.id ? '2px solid #667eea' : '1px solid #eee',
                borderRadius: '8px',
                cursor: 'pointer',
                background: p.stock < 10 ? '#fff1f2' : 'white'
              }}
            >
              <div style={{ fontWeight: 'bold' }}>{p.nombre}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                Stock: <span style={{ color: p.stock < 10 ? 'red' : 'green', fontWeight: 'bold' }}>{p.stock}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configuration Panel */}
      <div className="card">
        {selectedProduct ? (
          <>
            <div className="section-header">
              <h2>⚙️ Configuración: {selectedProduct.nombre}</h2>
            </div>

            {loadingConfig ? <p>Cargando detalles...</p> : (
              <>
                <form onSubmit={handleSaveConfig} style={{ background: '#f8fafc', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                  <div className="form-group">
                    <label>Stock Mínimo (Umbral)</label>
                    <input 
                      type="number" 
                      value={stockMinimo} 
                      onChange={e => setStockMinimo(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Cantidad a Recargar</label>
                    <input 
                      type="number" 
                      value={cantidadRecarga} 
                      onChange={e => setCantidadRecarga(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                    <input 
                      type="checkbox" 
                      checked={autoRecarga} 
                      onChange={e => setAutoRecarga(e.target.checked)}
                      id="autoRecarga"
                    />
                    <label htmlFor="autoRecarga" style={{marginBottom: 0}}>Activar Recarga Automática</label>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button type="submit" className="btn-primary">Guardar Configuración</button>
                    <button type="button" onClick={handleManualRecharge} className="btn-secondary" style={{ background: '#10b981', color: 'white' }}>
                      ⚡ Recargar Ahora
                    </button>
                  </div>
                </form>

                <h3>📜 Historial de Recargas</h3>
                <div className="table-container" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Tipo</th>
                        <th>Cant.</th>
                        <th>Stock Antes</th>
                        <th>Stock Nuevo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.length === 0 ? (
                        <tr><td colSpan="5">Sin historial</td></tr>
                      ) : history.map(h => (
                        <tr key={h.id}>
                          <td>{new Date(h.fecha_creacion).toLocaleString()}</td>
                          <td>
                            <span className={`badge ${h.tipo === 'automatica' ? 'badge-info' : 'badge-success'}`}>
                              {h.tipo}
                            </span>
                          </td>
                          <td>+{h.cantidad}</td>
                          <td>{h.stock_anterior}</td>
                          <td>{h.stock_nuevo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '50px', color: '#999' }}>
            Selecciona un producto para configurar su stock
          </div>
        )}
      </div>
    </div>
  );
}
