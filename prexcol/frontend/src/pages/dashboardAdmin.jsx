import React, { useEffect, useState } from "react";
import { authAxios } from "../services/authservices";
import "./dashboardAdmin.css";

export default function AdminDashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formValues, setFormValues] = useState({
    id: null,
    nombre: "",
    email: "",
    password: "",
    rol: "cliente",
    telefono: "",
    direccion: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [productos, setProductos] = useState([]);
  const [showProductos, setShowProductos] = useState(false);
  const [filtroProductos, setFiltroProductos] = useState('todos');

  const fetchUsuarios = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await authAxios.get("/usuarios/");
      const data = res.data.results ? res.data.results : res.data;
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching usuarios:", err);
      if (err.response?.status === 403) {
        setError("❌ No tienes permisos para ver usuarios. Debes estar logueado como admin.");
      } else if (err.response?.status === 401) {
        setError("⚠️ Tu sesión expiró. Recarga la página y vuelve a loguearte.");
      } else {
        setError("Error al cargar usuarios: " + (err.response?.data?.detail || err.message));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (isEditing) {
        const payload = { ...formValues };
        if (!payload.password) delete payload.password;
        const response = await authAxios.patch(`/usuarios/${formValues.id}/`, payload);
        console.log("Usuario actualizado:", response.data);
        setSuccess("Usuario actualizado exitosamente");
      } else {
        if (!formValues.password) {
          setError("La contraseña es requerida para crear nuevo usuario");
          return;
        }
        // Validar que nombre no esté vacío
        if (!formValues.nombre.trim()) {
          setError("El nombre es requerido");
          return;
        }
        if (!formValues.email.trim()) {
          setError("El email es requerido");
          return;
        }
        const response = await authAxios.post("/usuarios/", formValues);
        console.log("Usuario creado:", response.data);
        setSuccess("Usuario creado exitosamente");
      }
      setTimeout(() => {
        fetchUsuarios();
        resetForm();
      }, 500);
    } catch (err) {
      console.error("Error en handleSubmit:", err);
      console.error("Response data:", err.response?.data);
      const errorMsg = err.response?.data?.detail || 
                      err.response?.data?.email?.[0] || 
                      err.response?.data?.nombre?.[0] ||
                      err.response?.data?.non_field_errors?.[0] ||
                      err.message;
      setError("❌ Error: " + errorMsg);
    }
  };

  const handleEdit = (user) => {
    setFormValues({ ...user, password: "" });
    setIsEditing(true);
    setError("");
    setSuccess("");
    console.log("Editando usuario:", user);
    // Scroll to form
    document.querySelector('.form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      setError("");
      setSuccess("");
      try {
        const response = await authAxios.delete(`/usuarios/${id}/`);
        console.log("Usuario eliminado:", response.status);
        setSuccess("Usuario eliminado exitosamente");
        setTimeout(() => {
          fetchUsuarios();
        }, 500);
      } catch (err) {
        console.error("Error al eliminar:", err);
        const errorMsg = err.response?.data?.detail || err.message;
        setError("❌ Error al eliminar: " + errorMsg);
      }
    }
  };

  const toggleEstado = async (id, currentEstado) => {
    setError("");
    setSuccess("");
    try {
      const newEstado = !currentEstado;
      const response = await authAxios.patch(`/usuarios/${id}/`, { estado: newEstado });
      console.log("Estado actualizado:", response.data);
      setSuccess(currentEstado ? "✓ Usuario desactivado" : "✓ Usuario activado");
      setTimeout(() => {
        fetchUsuarios();
      }, 500);
    } catch (err) {
      console.error("Error al cambiar estado:", err);
      console.error("Response data:", err.response?.data);
      const errorMsg = err.response?.data?.detail || err.message;
      setError("❌ Error al cambiar estado: " + errorMsg);
    }
  };

  const resetForm = () => {
    setFormValues({
      id: null,
      nombre: "",
      email: "",
      password: "",
      rol: "cliente",
      telefono: "",
      direccion: "",
    });
    setIsEditing(false);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchProductos = async () => {
    try {
      const res = await authAxios.get('/productos/');
      const data = res.data.results ? res.data.results : res.data;
      setProductos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching productos:', err);
      setProductos([]);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>📊 Panel de Administración</h1>
        <p>Gestiona usuarios, roles y permisos</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="form-section">
        <h2>{isEditing ? "✏️ Editar Usuario" : "➕ Crear Nuevo Usuario"}</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-row">
            <input
              type="text"
              placeholder="Nombre completo"
              value={formValues.nombre}
              onChange={(e) => setFormValues({ ...formValues, nombre: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={formValues.email}
              onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
              required
              disabled={isEditing}
            />
          </div>

          <div className="form-row">
            <input
              type="password"
              placeholder="Contraseña (opcional en edición)"
              value={formValues.password}
              onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
              required={!isEditing}
            />
            <select
              value={formValues.rol}
              onChange={(e) => setFormValues({ ...formValues, rol: e.target.value })}
            >
              <option value="admin">Administrador</option>
              <option value="cliente">Cliente</option>
              <option value="comprador">Comprador</option>
              <option value="proveedor">Proveedor</option>
              <option value="logistica">Logística</option>
            </select>
          </div>

          <div className="form-row">
            <input
              type="tel"
              placeholder="Teléfono (opcional)"
              value={formValues.telefono}
              onChange={(e) => setFormValues({ ...formValues, telefono: e.target.value })}
            />
            <input
              type="text"
              placeholder="Dirección (opcional)"
              value={formValues.direccion}
              onChange={(e) => setFormValues({ ...formValues, direccion: e.target.value })}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {isEditing ? "Actualizar Usuario" : "Crear Usuario"}
            </button>
            {isEditing && (
              <button type="button" onClick={resetForm} className="btn btn-secondary">
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="users-section">
        <h2>👥 Listado de Usuarios ({usuarios.length})</h2>
        {loading ? (
          <p className="loading">Cargando usuarios...</p>
        ) : usuarios.length === 0 ? (
          <p className="no-data">No hay usuarios registrados</p>
        ) : (
          <div className="table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                  <th>Creación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user) => (
                  <tr key={user.id} className={!user.estado ? "inactive-row" : ""}>
                    <td className="user-name">{user.nombre}</td>
                    <td className="user-email">{user.email}</td>
                    <td>
                      <span className={`badge badge-${user.rol}`}>
                        {user.rol}
                      </span>
                    </td>
                    <td>
                      <span className={`status ${user.estado ? "active" : "inactive"}`}>
                        {user.estado ? "✓ Activo" : "✗ Inactivo"}
                      </span>
                    </td>
                    <td>{user.telefono || "-"}</td>
                    <td className="address">{user.direccion || "-"}</td>
                    <td className="date">
                      {user.fecha_creacion ? new Date(user.fecha_creacion).toLocaleDateString() : "-"}
                    </td>
                    <td className="actions">
                      <button
                        onClick={() => handleEdit(user)}
                        className="btn-action btn-edit"
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => toggleEstado(user.id, user.estado)}
                        className="btn-action btn-toggle"
                        title={user.estado ? "Desactivar" : "Activar"}
                      >
                        {user.estado ? "🔒" : "🔓"}
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="btn-action btn-delete"
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="admin-productos">
        <h2>🛍️ Catálogo (Administrador)</h2>
        <button className="btn" onClick={() => { setShowProductos(!showProductos); if(!showProductos) fetchProductos(); }}>
          {showProductos ? 'Ocultar Productos' : 'Ver Productos'}
        </button>
        {showProductos && (
          <div className="productos-admin">
            <div className="filtros-admin">
              <button className={`filtro-btn ${filtroProductos === 'todos' ? 'activo' : ''}`} onClick={() => setFiltroProductos('todos')}>Todos ({productos.length})</button>
              <button className={`filtro-btn ${filtroProductos === 'basicos' ? 'activo' : ''}`} onClick={() => setFiltroProductos('basicos')}>🔹 Básicos ({productos.filter(p => p.es_basico).length})</button>
              <button className={`filtro-btn ${filtroProductos === 'no_basicos' ? 'activo' : ''}`} onClick={() => setFiltroProductos('no_basicos')}>✨ No Básicos ({productos.filter(p => !p.es_basico).length})</button>
            </div>
            <div className="productos-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Tienda</th>
                    <th>Proveedor</th>
                    <th>Categoria</th>
                    <th>Stock</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {productos
                    .filter(p => {
                      if (filtroProductos === 'basicos') return p.es_basico;
                      if (filtroProductos === 'no_basicos') return !p.es_basico;
                      return true;
                    })
                    .map(p => (
                      <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.nombre}</td>
                        <td>{p.tienda_nombre || p.tienda}</td>
                        <td>{p.proveedor_nombre || '-'}</td>
                        <td>{p.es_basico ? 'Básico' : 'No Básico'}</td>
                        <td>{p.stock}</td>
                        <td>${p.precio}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
