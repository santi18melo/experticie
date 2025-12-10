import React, { useState } from 'react';

export default function AdminProductsTab({ productos, loading, onDelete, onUpdate, onCreate, tiendas, proveedores }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "", descripcion: "", precio: "", stock: "", tienda: "", es_basico: true, categoria: "general"
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
    setShowForm(false);
    setFormData({
        nombre: "", descripcion: "", precio: "", stock: "", tienda: "", es_basico: true, categoria: "general"
    });
  };

  const productosFiltrados = (productos || []).filter(p => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return p.nombre.toLowerCase().includes(term) || p.descripcion.toLowerCase().includes(term);
    }
    return true;
  });

  return (
    <div className="content-section">
      <div className="section-header">
        <h2>Gestión de Productos</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Cancelar" : "+ Nuevo Producto"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="form-card">
          <div className="form-grid">
            <input type="text" placeholder="Nombre" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} required />
            <input type="number" placeholder="Precio" value={formData.precio} onChange={e => setFormData({...formData, precio: e.target.value})} required />
            <input type="number" placeholder="Stock" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required />
            <select value={formData.tienda} onChange={e => setFormData({...formData, tienda: e.target.value})} required>
              <option value="">Seleccionar Tienda</option>
              {(tiendas || []).map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
            </select>
            <select value={formData.proveedor} onChange={e => setFormData({...formData, proveedor: e.target.value})} required>
              <option value="">Seleccionar Proveedor</option>
              {(proveedores || []).map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
            </select>
            <textarea placeholder="Descripción" value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})} />
            <div className="checkbox-group">
              <label>
                <input type="checkbox" checked={formData.es_basico} onChange={e => setFormData({...formData, es_basico: e.target.checked})} />
                Es Producto Básico
              </label>
            </div>
          </div>
          <button type="submit" className="btn-submit">Crear Producto</button>
        </form>
      )}

      <div className="filters-container">
        <input 
          type="text" 
          placeholder="Buscar productos..." 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
          className="search-input"
        />
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Tienda</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map(producto => (
              <tr key={producto.id}>
                <td>
                  <div className="item-cell">
                    <div className="item-icon">📦</div>
                    <div className="item-info">
                        <div className="item-title">{producto.nombre}</div>
                        <div className="item-subtitle">{producto.descripcion?.substring(0, 30)}...</div>
                    </div>
                  </div>
                </td>
                <td>{(tiendas || []).find(t => t.id === producto.tienda)?.nombre || producto.tienda}</td>
                <td><strong style={{color: '#2d3748'}}>${Number(producto.precio).toLocaleString()}</strong></td>
                <td>
                  <span className={`badge ${producto.stock < 10 ? 'danger' : 'success'}`}>
                    {producto.stock} u.
                  </span>
                </td>
                <td>
                    <span className={`badge ${producto.es_basico ? 'info' : 'warning'}`} style={{background: producto.es_basico ? '#ebf8ff' : '#fff5f5', color: producto.es_basico ? '#2b6cb0' : '#c53030'}}>
                        {producto.es_basico ? 'Básico' : 'Premium'}
                    </span>
                </td>
                <td>
                  <div className="actions-cell">
                    <button className="btn-icon edit" onClick={() => onUpdate(producto, true)} title="Editar">✏️</button>
                    <button className="btn-icon delete" onClick={() => onDelete(producto.id)} title="Eliminar">🗑️</button>
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
