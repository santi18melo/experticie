import React, { useState } from 'react';

export default function AdminStoresTab({ tiendas, loading, onDelete, onUpdate, onCreate }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ nombre: "", direccion: "", telefono: "" });
  const [filtroEstado, setFiltroEstado] = useState("todos");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
    setShowForm(false);
    setFormData({ nombre: "", direccion: "", telefono: "" });
  };

  const tiendasFiltradas = tiendas.filter(t => {
    if (filtroEstado === "activas" && !t.activa) return false;
    if (filtroEstado === "inactivas" && t.activa) return false;
    return true;
  });

  return (
    <div className="content-section">
      <div className="section-header">
        <h2>Gestión de Tiendas</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Cancelar" : "+ Nueva Tienda"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="form-card">
          <div className="form-grid">
            <input type="text" placeholder="Nombre Tienda" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} required />
            <input type="text" placeholder="Dirección" value={formData.direccion} onChange={e => setFormData({...formData, direccion: e.target.value})} required />
            <input type="tel" placeholder="Teléfono" value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} required />
          </div>
          <button type="submit" className="btn-submit">Crear Tienda</button>
        </form>
      )}

      <div className="filters-container">
        <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)} className="filter-select">
          <option value="todos">Todas</option>
          <option value="activas">Activas</option>
          <option value="inactivas">Inactivas</option>
        </select>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tiendasFiltradas.map(tienda => (
              <tr key={tienda.id}>
                <td>#{tienda.id}</td>
                <td>{tienda.nombre}</td>
                <td>{tienda.direccion}</td>
                <td>
                  <span className={`badge ${tienda.activa ? 'success' : 'danger'}`}>
                    {tienda.activa ? 'Activa' : 'Inactiva'}
                  </span>
                </td>
                <td>
                  <div className="actions-cell">
                    <button className="btn-icon edit" onClick={() => onUpdate(tienda, true)}>✏️</button>
                    <button className="btn-icon delete" onClick={() => onDelete(tienda.id)}>🗑️</button>
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
