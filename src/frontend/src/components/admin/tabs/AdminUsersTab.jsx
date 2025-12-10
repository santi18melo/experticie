import React, { useState } from 'react';

export default function AdminUsersTab({ 
  usuarios, 
  loading, 
  onDelete, 
  onUpdate, 
  onCreate, 
  roles 
}) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "cliente",
    telefono: "",
    direccion: "",
    imagen: null
  });
  const [filtroRol, setFiltroRol] = useState("todos");
  const [filtroEstado, setFiltroEstado] = useState("todos");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
    setShowForm(false);
    setFormData({
      nombre: "", email: "", password: "", rol: "cliente", telefono: "", direccion: "", imagen: null
    });
  };

  const usuariosFiltrados = (usuarios || []).filter(u => {
    if (filtroRol !== "todos" && u.rol !== filtroRol) return false;
    if (filtroEstado !== "todos") {
      if (filtroEstado === "activo" && !u.estado) return false;
      if (filtroEstado === "inactivo" && u.estado) return false;
    }
    return true;
  });

  return (
    <div className="content-section">
      <div className="section-header">
        <h2>Gestión de Usuarios</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Cancelar" : "+ Nuevo Usuario"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="form-card">
          <div className="form-grid">
            <input type="text" placeholder="Nombre" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} required />
            <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
            <input type="password" placeholder="Contraseña" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
            <select value={formData.rol} onChange={e => setFormData({...formData, rol: e.target.value})}>
              <option value="cliente">Cliente</option>
              <option value="proveedor">Proveedor</option>
              <option value="logistica">Logística</option>
              <option value="admin">Admin</option>
            </select>
            <input type="tel" placeholder="Teléfono" value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} />
            <input type="text" placeholder="Dirección" value={formData.direccion} onChange={e => setFormData({...formData, direccion: e.target.value})} />
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Foto de Perfil</label>
                <input type="file" accept="image/*" onChange={e => setFormData({...formData, imagen: e.target.files[0]})} />
            </div>
          </div>
          <button type="submit" className="btn-submit">Crear Usuario</button>
        </form>
      )}

      <div className="filters-container">
        <select value={filtroRol} onChange={e => setFiltroRol(e.target.value)} className="filter-select">
          <option value="todos">Todos los Roles</option>
          <option value="admin">Admin</option>
          <option value="proveedor">Proveedor</option>
          <option value="cliente">Cliente</option>
          <option value="logistica">Logística</option>
        </select>
        <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)} className="filter-select">
          <option value="todos">Todos los Estados</option>
          <option value="activo">Activos</option>
          <option value="inactivo">Inactivos</option>
        </select>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map(usuario => (
              <tr key={usuario.id}>
                <td>
                  <div className="user-cell">
                    {usuario.imagen && <img src={usuario.imagen} alt="" className="user-avatar-small" />}
                    <div>
                      <div className="user-name">{usuario.nombre}</div>
                      <div className="user-email">{usuario.email}</div>
                    </div>
                  </div>
                </td>
                <td><span className={`badge role-${usuario.rol}`}>{usuario.rol}</span></td>
                <td>
                  <button 
                    className={`status-toggle ${usuario.estado ? 'active' : 'inactive'}`}
                    onClick={() => onUpdate({...usuario, estado: !usuario.estado})}
                  >
                    {usuario.estado ? 'Activo' : 'Inactivo'}
                  </button>
                </td>
                <td>
                  <div className="actions-cell">
                    <button className="btn-icon edit" onClick={() => onUpdate(usuario, true)}>✏️</button>
                    <button className="btn-icon delete" onClick={() => onDelete(usuario.id)}>🗑️</button>
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
