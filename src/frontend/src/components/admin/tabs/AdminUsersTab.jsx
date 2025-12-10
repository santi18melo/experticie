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
  const [editingId, setEditingId] = useState(null);
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

  const resetForm = () => {
      setFormData({
        nombre: "", email: "", password: "", rol: "cliente", telefono: "", direccion: "", imagen: null
      });
      setEditingId(null);
      setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
        // Update
        onUpdate({ ...formData, id: editingId });
    } else {
        // Create
        onCreate(formData);
    }
    resetForm();
  };

  const handleEdit = (user) => {
      setFormData({
          nombre: user.nombre || "",
          email: user.email || "",
          password: "", // Don't pre-fill password
          rol: user.rol || "cliente",
          telefono: user.telefono || "",
          direccion: user.direccion || "",
          imagen: null // Don't pre-fill file input
      });
      setEditingId(user.id);
      setShowForm(true);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    return `${API_URL}${imagePath}`;
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
        <button className="btn-primary" onClick={() => { resetForm(); setShowForm(!showForm); }}>
          {showForm ? "✕ Cancelar" : "+ Nuevo Usuario"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="form-card">
          <div className="form-head">
              <h3>{editingId ? 'Editar Usuario' : 'Crear Usuario'}</h3>
          </div>
          <div className="form-grid">
            <input type="text" placeholder="Nombre" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} required />
            <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
            <input type="password" placeholder={editingId ? "Contraseña (dejar en blanco para mantener)" : "Contraseña"} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required={!editingId} />
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
          <button type="submit" className="btn-submit">{editingId ? 'Actualizar' : 'Crear Usuario'}</button>
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
              <th>Permisos</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map(usuario => (
              <tr key={usuario.id}>
                <td>
                  <div className="user-cell">
                    {usuario.imagen ? (
                      <img src={getImageUrl(usuario.imagen)} alt="" className="user-avatar-small" />
                    ) : (
                      <div className="user-avatar-placeholder">{usuario.nombre.charAt(0)}</div>
                    )}
                    <div>
                      <div className="user-name">{usuario.nombre}</div>
                      <div className="user-email">{usuario.email}</div>
                    </div>
                  </div>
                </td>
                <td><span className={`badge role-${usuario.rol}`}>{usuario.rol}</span></td>
                <td>
                    {usuario.is_superuser && <span className="badge" style={{backgroundColor: '#ff4757', marginRight: '4px'}}>Superuser</span>}
                    {usuario.is_staff && <span className="badge" style={{backgroundColor: '#5352ed'}}>Staff</span>}
                    {!usuario.is_superuser && !usuario.is_staff && <span className="text-muted">-</span>}
                </td>
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
                    <button className="btn-icon edit" onClick={() => handleEdit(usuario)}>✏️</button>
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
