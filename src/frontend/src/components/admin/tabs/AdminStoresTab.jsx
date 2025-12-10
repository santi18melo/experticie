import React, { useState } from 'react';

export default function AdminStoresTab({ tiendas, loading, onDelete, onUpdate, onCreate }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ nombre: "", direccion: "", telefono: "" });
  const [filtroEstado, setFiltroEstado] = useState("todos");

  const resetForm = () => {
    setFormData({ nombre: "", direccion: "", telefono: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
        onUpdate({ ...formData, id: editingId });
    } else {
        onCreate(formData);
    }
    resetForm();
  };

  const handleEdit = (tienda) => {
      setFormData({
          nombre: tienda.nombre || "",
          direccion: tienda.direccion || "",
          telefono: tienda.telefono || ""
      });
      setEditingId(tienda.id);
      setShowForm(true);
  };

  const tiendasFiltradas = (tiendas || []).filter(t => {
    if (filtroEstado === "activas" && !t.activa) return false;
    if (filtroEstado === "inactivas" && t.activa) return false;
    return true;
  });

  return (
    <div className="content-section">
      <div className="section-header">
        <h2>Gestión de Tiendas</h2>
        <button className="btn-primary" onClick={() => { resetForm(); setShowForm(!showForm); }}>
          {showForm ? "✕ Cancelar" : "+ Nueva Tienda"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="form-card">
          <div className="form-head">
              <h3>{editingId ? 'Editar Tienda' : 'Crear Tienda'}</h3>
          </div>
          <div className="form-grid">
            <input type="text" placeholder="Nombre Tienda" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} required />
            <input type="text" placeholder="Dirección" value={formData.direccion} onChange={e => setFormData({...formData, direccion: e.target.value})} required />
            <input type="tel" placeholder="Teléfono" value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} required />
          </div>
          <button type="submit" className="btn-submit">{editingId ? 'Actualizar' : 'Crear Tienda'}</button>
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
                <td>
                  <div className="item-cell">
                    <div className="item-icon">🏪</div>
                    <div className="item-info">
                      <div className="item-title">{tienda.nombre}</div>
                      <div className="item-subtitle">{tienda.telefono}</div>
                    </div>
                  </div>
                </td>
                <td><div className="item-subtitle">{tienda.direccion}</div></td>
                <td>
                  <span className={`badge ${tienda.activa ? 'success' : 'danger'}`}>
                    {tienda.activa ? 'Activa' : 'Inactiva'}
                  </span>
                </td>
                <td>
                  <div className="actions-cell">
                    <button className="btn-icon edit" onClick={() => handleEdit(tienda)} title="Editar">✏️</button>
                    <button className="btn-icon delete" onClick={() => onDelete(tienda.id)} title="Eliminar">🗑️</button>
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
