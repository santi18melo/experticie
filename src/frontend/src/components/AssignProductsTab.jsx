import React, { useEffect, useState, useCallback } from 'react';
import { axiosInstance } from '../services/api';
import '../styles/AssignProductsTab.css';

export default function AssignProductsTab() {
  const [providers, setProviders] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [expandedProductId, setExpandedProductId] = useState(null);

  // Load providers
  const loadProviders = useCallback(async () => {
    try {
      const res = await axiosInstance.get('/usuarios/?page_size=1000');
      const data = res.data.results || res.data;
      setAllUsers(data);
      const prov = data.filter(u => u.rol && u.rol.toLowerCase() === 'proveedor');
      setProviders(prov);
    } catch (e) {
      console.error('Error loading providers', e);
      setMessage({ text: 'Error al cargar proveedores', type: 'error' });
    }
  }, []);

  // Load products
  const loadProducts = useCallback(async () => {
    try {
      const res = await axiosInstance.get('/productos/productos/?page_size=1000');
      const data = res.data.results || res.data;
      setProducts(data);
    } catch (e) {
      console.error('Error loading products', e);
      setMessage({ text: 'Error al cargar productos', type: 'error' });
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    loadProviders();
    loadProducts();
  }, [loadProviders, loadProducts]);

  const toggleProductSelection = (id, e) => {
    // Prevent triggering selection when clicking "View Details"
    if (e && e.stopPropagation) e.stopPropagation();
    
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
    if (message.text) setMessage({ text: '', type: '' });
  };

  const toggleProductDetails = (id, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setExpandedProductId(expandedProductId === id ? null : id);
  };

  const handleAssign = async () => {
    if (!selectedProvider) {
      setMessage({ text: '⚠️ Por favor seleccione un proveedor', type: 'info' });
      return;
    }
    if (selectedProducts.length === 0) {
      setMessage({ text: '⚠️ Por favor seleccione al menos un producto', type: 'info' });
      return;
    }
    
    setLoading(true);
    setMessage({ text: '', type: '' });
    
    try {
      const promises = selectedProducts.map(pid =>
        axiosInstance.patch(`/productos/productos/${pid}/`, { proveedor: selectedProvider })
      );
      
      const results = await Promise.allSettled(promises);
      const successes = results.filter(r => r.status === 'fulfilled').length;
      const failures = results.filter(r => r.status === 'rejected').length;

      if (failures === 0) {
        setMessage({ text: `✓ ${successes} producto(s) asignado(s) exitosamente`, type: 'success' });
        setSelectedProducts([]);
      } else if (successes > 0) {
        setMessage({ text: `⚠️ ${successes} asignados, pero ${failures} fallaron.`, type: 'warning' });
        setSelectedProducts([]); 
      } else {
        setMessage({ text: '✗ Error al asignar productos.', type: 'error' });
      }
      
      await loadProducts();
      if (failures === 0) setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    } catch (e) {
      console.error('Error assigning products', e);
      setMessage({ text: '✗ Error crítico al asignar productos.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const clearSelection = () => {
    setSelectedProducts([]);
    setMessage({ text: '', type: '' });
  };

  const getProviderDetails = (providerId) => {
    if (!providerId) return null;
    return allUsers.find(u => u.id === providerId);
  };

  // Helper to generate initials
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  // Helper to get random color for avatar based on name
  const getAvatarColor = (name) => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };

  if (loadingData) {
    return <div className="assign-loading"><div className="assign-spinner"></div></div>;
  }

  return (
    <div className="assign-products-container">
      <div className="assign-products-header">
        <span className="icon">🔗</span>
        <h2>Asignación de Productos</h2>
      </div>

      {message.text && <div className={`assign-alert ${message.type}`}>{message.text}</div>}

      <div className="assign-layout">
        {/* Left Panel: Provider Selection & Actions */}
        <div className="assign-sidebar">
          <div className="provider-selection-card">
            <label>Proveedor Destino</label>
            <select
              value={selectedProvider}
              onChange={e => setSelectedProvider(e.target.value)}
              className="provider-select"
            >
              <option value="">-- Seleccionar --</option>
              {providers.map(p => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
            
            {selectedProvider && (
              <div className="selected-provider-preview">
                <div className="provider-avatar-large" style={{ background: getAvatarColor(getProviderDetails(selectedProvider)?.nombre || '') }}>
                  {getInitials(getProviderDetails(selectedProvider)?.nombre)}
                </div>
                <div className="provider-info">
                  <h4>{getProviderDetails(selectedProvider)?.nombre}</h4>
                  <p>{getProviderDetails(selectedProvider)?.email}</p>
                </div>
              </div>
            )}

            <div className="action-buttons">
              <button
                className="assign-btn assign-btn-primary full-width"
                onClick={handleAssign}
                disabled={loading || selectedProducts.length === 0 || !selectedProvider}
              >
                {loading ? 'Asignando...' : `Asignar (${selectedProducts.length})`}
              </button>
              {selectedProducts.length > 0 && (
                <button className="assign-btn assign-btn-secondary full-width" onClick={clearSelection}>
                  Limpiar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel: Product Grid */}
        <div className="assign-content">
          {products.length === 0 ? (
            <div className="assign-empty-state">
              <div className="icon">📦</div>
              <h3>No hay productos</h3>
            </div>
          ) : (
            <div className="assign-products-grid">
              {products.map(prod => {
                const isSelected = selectedProducts.includes(prod.id);
                const isExpanded = expandedProductId === prod.id;
                const provider = getProviderDetails(prod.proveedor);
                const assignedProviders = provider ? [provider] : []; // Simulating list for future M2M
                
                return (
                  <div
                    key={prod.id}
                    className={`assign-product-card ${isSelected ? 'selected' : ''} ${isExpanded ? 'expanded' : ''}`}
                    onClick={(e) => toggleProductSelection(prod.id, e)}
                  >
                    {/* Header Image & Check */}
                    <div className="card-top">
                      <div className="product-image-placeholder">
                        {prod.imagen1 ? (
                           <img src={prod.imagen1} alt={prod.nombre} />
                        ) : (
                           <span>{getInitials(prod.nombre)}</span>
                        )}
                      </div>
                      <div className={`checkbox-circle ${isSelected ? 'checked' : ''}`}>
                        {isSelected && '✓'}
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div className="card-info">
                      <h4 className="product-name">{prod.nombre}</h4>
                      <p className="product-cat">{prod.categoria}</p>
                      
                      <div className="product-stats-row">
                        <span className="stock-badge">📦 {prod.stock}</span>
                        <span className="price-badge">${parseFloat(prod.precio).toLocaleString('es-CO')}</span>
                      </div>

                      {/* Providers Avatars */}
                      <div className="providers-avatars">
                        {assignedProviders.length > 0 ? (
                          assignedProviders.slice(0, 3).map((p, idx) => (
                            <div 
                              key={p.id} 
                              className="provider-avatar-small" 
                              style={{ 
                                background: getAvatarColor(p.nombre),
                                zIndex: 10 - idx,
                                marginLeft: idx > 0 ? '-10px' : '0'
                              }}
                              title={p.nombre}
                            >
                              {getInitials(p.nombre)}
                            </div>
                          ))
                        ) : (
                          <span className="no-provider-text">Sin asignar</span>
                        )}
                        {assignedProviders.length > 3 && (
                          <div className="provider-avatar-more">+{assignedProviders.length - 3}</div>
                        )}
                      </div>
                    </div>

                    {/* Expand Button */}
                    <button 
                      className="expand-btn"
                      onClick={(e) => toggleProductDetails(prod.id, e)}
                    >
                      {isExpanded ? '▲' : '▼'}
                    </button>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="product-expanded-details" onClick={e => e.stopPropagation()}>
                        <div className="detail-section">
                          <h5>Descripción</h5>
                          <p>{prod.descripcion}</p>
                        </div>
                        {prod.caracteristicas && (
                          <div className="detail-section">
                            <h5>Características</h5>
                            <p>{prod.caracteristicas}</p>
                          </div>
                        )}
                        
                        <div className="detail-section">
                          <h5>Proveedores Asignados</h5>
                          {assignedProviders.length > 0 ? (
                            <div className="provider-list">
                              {assignedProviders.map(p => (
                                <div key={p.id} className="provider-list-item">
                                  <div className="provider-avatar-medium" style={{ background: getAvatarColor(p.nombre) }}>
                                    {getInitials(p.nombre)}
                                  </div>
                                  <div className="provider-list-info">
                                    <span className="name">{p.nombre}</span>
                                    <span className="email">{p.email}</span>
                                  </div>
                                  <div className="provider-stats">
                                    <span className="tag">Principal</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted">Ningún proveedor asignado.</p>
                          )}
                        </div>

                        <div className="detail-stats-grid">
                          <div className="stat-box">
                            <span className="label">Disponibles</span>
                            <span className="value">{prod.stock}</span>
                          </div>
                          <div className="stat-box">
                            <span className="label">Vendidas</span>
                            <span className="value">-</span> {/* Placeholder */}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
