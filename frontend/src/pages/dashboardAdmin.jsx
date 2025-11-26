// frontend/src/pages/DashboardAdmin.jsx - PROFESSIONAL & COMPLETE
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getTiendas,
  crearTienda,
  getProductos,
  crearProducto,
  getPedidos,
} from "../services/productosService";
import { axiosInstance } from "../services/api";
import "../styles/DashboardAdmin.css";

export default function DashboardAdmin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Estados
  const [activeTab, setActiveTab] = useState("usuarios");
  const [usuarios, setUsuarios] = useState([]);
  const [tiendas, setTiendas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Formularios
  const [showUserForm, setShowUserForm] = useState(false);
  const [showTiendaForm, setShowTiendaForm] = useState(false);
  const [showProductoForm, setShowProductoForm] = useState(false);

  const [userForm, setUserForm] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "cliente",
    telefono: "",
    direccion: "",
  });

  const [tiendaForm, setTiendaForm] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
  });

  const [productoForm, setProductoForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    tienda: "",
    proveedor: "",
    es_basico: true,
    categoria: "general",
  });

  // ==================== CARGAR DATOS ====================
  const cargarUsuarios = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/usuarios/");
      const data = res.data.results || res.data;
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
      setError("Error al cargar usuarios");
    }
  }, []);

  const cargarTiendas = useCallback(async () => {
    try {
      const data = await getTiendas();
      const tiendasData = data.results || data;
      setTiendas(Array.isArray(tiendasData) ? tiendasData : []);
    } catch (err) {
      console.error("Error cargando tiendas:", err);
      setError("Error al cargar tiendas");
    }
  }, []);

  const cargarProductos = useCallback(async () => {
    try {
      const data = await getProductos();
      const productosData = data.results || data;
      setProductos(Array.isArray(productosData) ? productosData : []);
    } catch (err) {
      console.error("Error cargando productos:", err);
      setError("Error al cargar productos");
    }
  }, []);

  const cargarPedidos = useCallback(async () => {
    try {
      const data = await getPedidos();
      const pedidosData = data.results || data;
      setPedidos(Array.isArray(pedidosData) ? pedidosData : []);
    } catch (err) {
      console.error("Error cargando pedidos:", err);
      setError("Error al cargar pedidos");
    }
  }, []);

  const cargarDatos = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all([
        cargarUsuarios(),
        cargarTiendas(),
        cargarProductos(),
        cargarPedidos(),
      ]);
    } catch (err) {
      console.error("Error cargando datos:", err);
    } finally {
      setLoading(false);
    }
  }, [cargarUsuarios, cargarTiendas, cargarProductos, cargarPedidos]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  // ==================== CREAR USUARIO ====================
  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axiosInstance.post("/usuarios/", userForm);
      setSuccess("✓ Usuario creado exitosamente");
      setShowUserForm(false);
      setUserForm({
        nombre: "",
        email: "",
        password: "",
        rol: "cliente",
        telefono: "",
        direccion: "",
      });
      await cargarUsuarios();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.response?.data?.email?.[0] ||
          "Error al crear usuario"
      );
    }
  };

  // ==================== CREAR TIENDA ====================
  const handleCrearTienda = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await crearTienda({
        ...tiendaForm,
        administrador: user.id,
      });
      setSuccess("✓ Tienda creada exitosamente");
      setShowTiendaForm(false);
      setTiendaForm({ nombre: "", direccion: "", telefono: "" });
      await cargarTiendas();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || "Error al crear tienda");
    }
  };

  // ==================== CREAR PRODUCTO ====================
  const handleCrearProducto = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await crearProducto(productoForm);
      setSuccess("✓ Producto creado exitosamente");
      setShowProductoForm(false);
      setProductoForm({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        tienda: "",
        proveedor: "",
        es_basico: true,
        categoria: "general",
      });
      await cargarProductos();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || "Error al crear producto");
    }
  };

  // ==================== ELIMINAR USUARIO ====================
  const handleEliminarUsuario = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      await axiosInstance.delete(`/usuarios/${id}/`);
      setSuccess("✓ Usuario eliminado");
      await cargarUsuarios();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Error al eliminar usuario");
    }
  };

  // ==================== LOGOUT ====================
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ==================== ESTADÍSTICAS ====================
  const stats = {
    totalUsuarios: usuarios.length,
    totalTiendas: tiendas.length,
    totalProductos: productos.length,
    totalPedidos: pedidos.length,
    pedidosPendientes: pedidos.filter((p) => p.estado === "pendiente").length,
    usuariosActivos: usuarios.filter((u) => u.estado).length,
  };

  if (loading && usuarios.length === 0) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando panel de administración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* HEADER */}
      <div className="admin-header">
        <div className="header-content">
          <div className="header-left">
            <h1>⚡ Panel de Administración</h1>
            <p>Bienvenido, <strong>{user?.nombre}</strong></p>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            🚪 Cerrar Sesión
          </button>
        </div>
      </div>

      {/* ALERTS */}
      {error && (
        <div className="alert alert-error">
          <span>⚠️</span> {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success">
          <span>✓</span> {success}
        </div>
      )}

      {/* ESTADÍSTICAS */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats.totalUsuarios}</h3>
            <p>Usuarios</p>
            <span className="stat-detail">{stats.usuariosActivos} activos</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏪</div>
          <div className="stat-content">
            <h3>{stats.totalTiendas}</h3>
            <p>Tiendas</p>
            <span className="stat-detail">Activas</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>{stats.totalProductos}</h3>
            <p>Productos</p>
            <span className="stat-detail">En catálogo</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-content">
            <h3>{stats.totalPedidos}</h3>
            <p>Pedidos</p>
            <span className="stat-detail">{stats.pedidosPendientes} pendientes</span>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="tabs-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === "usuarios" ? "active" : ""}`}
            onClick={() => setActiveTab("usuarios")}
          >
            👥 Usuarios
          </button>
          <button
            className={`tab ${activeTab === "tiendas" ? "active" : ""}`}
            onClick={() => setActiveTab("tiendas")}
          >
            🏪 Tiendas
          </button>
          <button
            className={`tab ${activeTab === "productos" ? "active" : ""}`}
            onClick={() => setActiveTab("productos")}
          >
            📦 Productos
          </button>
          <button
            className={`tab ${activeTab === "pedidos" ? "active" : ""}`}
            onClick={() => setActiveTab("pedidos")}
          >
            🛒 Pedidos
          </button>
        </div>
      </div>

      {/* CONTENIDO DE TABS */}
      <div className="tab-content">
        {/* TAB USUARIOS */}
        {activeTab === "usuarios" && (
          <div className="content-section">
            <div className="section-header">
              <h2>Gestión de Usuarios</h2>
              <button
                className="btn-primary"
                onClick={() => setShowUserForm(!showUserForm)}
              >
                {showUserForm ? "✕ Cancelar" : "+ Nuevo Usuario"}
              </button>
            </div>

            {showUserForm && (
              <form onSubmit={handleCrearUsuario} className="form-card">
                <div className="form-grid">
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    value={userForm.nombre}
                    onChange={(e) =>
                      setUserForm({ ...userForm, nombre: e.target.value })
                    }
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={userForm.email}
                    onChange={(e) =>
                      setUserForm({ ...userForm, email: e.target.value })
                    }
                    required
                  />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={userForm.password}
                    onChange={(e) =>
                      setUserForm({ ...userForm, password: e.target.value })
                    }
                    required
                  />
                  <select
                    value={userForm.rol}
                    onChange={(e) =>
                      setUserForm({ ...userForm, rol: e.target.value })
                    }
                  >
                    <option value="cliente">Cliente</option>
                    <option value="comprador">Comprador</option>
                    <option value="proveedor">Proveedor</option>
                    <option value="logistica">Logística</option>
                    <option value="admin">Admin</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={userForm.telefono}
                    onChange={(e) =>
                      setUserForm({ ...userForm, telefono: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Dirección"
                    value={userForm.direccion}
                    onChange={(e) =>
                      setUserForm({ ...userForm, direccion: e.target.value })
                    }
                  />
                </div>
                <button type="submit" className="btn-submit">
                  Crear Usuario
                </button>
              </form>
            )}

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.id}</td>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.email}</td>
                      <td>
                        <span className={`badge badge-${usuario.rol}`}>
                          {usuario.rol}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`status ${
                            usuario.estado ? "active" : "inactive"
                          }`}
                        >
                          {usuario.estado ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn-delete-small"
                          onClick={() => handleEliminarUsuario(usuario.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB TIENDAS */}
        {activeTab === "tiendas" && (
          <div className="content-section">
            <div className="section-header">
              <h2>Gestión de Tiendas</h2>
              <button
                className="btn-primary"
                onClick={() => setShowTiendaForm(!showTiendaForm)}
              >
                {showTiendaForm ? "✕ Cancelar" : "+ Nueva Tienda"}
              </button>
            </div>

            {showTiendaForm && (
              <form onSubmit={handleCrearTienda} className="form-card">
                <div className="form-grid">
                  <input
                    type="text"
                    placeholder="Nombre de la tienda"
                    value={tiendaForm.nombre}
                    onChange={(e) =>
                      setTiendaForm({ ...tiendaForm, nombre: e.target.value })
                    }
                    required
                  />
                  <input
                    type="text"
                    placeholder="Dirección"
                    value={tiendaForm.direccion}
                    onChange={(e) =>
                      setTiendaForm({ ...tiendaForm, direccion: e.target.value })
                    }
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={tiendaForm.telefono}
                    onChange={(e) =>
                      setTiendaForm({ ...tiendaForm, telefono: e.target.value })
                    }
                  />
                </div>
                <button type="submit" className="btn-submit">
                  Crear Tienda
                </button>
              </form>
            )}

            <div className="grid-cards">
              {tiendas.map((tienda) => (
                <div key={tienda.id} className="info-card">
                  <h3>{tienda.nombre}</h3>
                  <p>📍 {tienda.direccion}</p>
                  <p>📞 {tienda.telefono || "Sin teléfono"}</p>
                  <p className="admin-name">
                    👤 Admin: {tienda.administrador_nombre || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB PRODUCTOS */}
        {activeTab === "productos" && (
          <div className="content-section">
            <div className="section-header">
              <h2>Gestión de Productos</h2>
              <button
                className="btn-primary"
                onClick={() => setShowProductoForm(!showProductoForm)}
              >
                {showProductoForm ? "✕ Cancelar" : "+ Nuevo Producto"}
              </button>
            </div>

            {showProductoForm && (
              <form onSubmit={handleCrearProducto} className="form-card">
                <div className="form-grid">
                  <input
                    type="text"
                    placeholder="Nombre del producto"
                    value={productoForm.nombre}
                    onChange={(e) =>
                      setProductoForm({ ...productoForm, nombre: e.target.value })
                    }
                    required
                  />
                  <textarea
                    placeholder="Descripción"
                    value={productoForm.descripcion}
                    onChange={(e) =>
                      setProductoForm({
                        ...productoForm,
                        descripcion: e.target.value,
                      })
                    }
                    required
                  />
                  <input
                    type="number"
                    placeholder="Precio"
                    value={productoForm.precio}
                    onChange={(e) =>
                      setProductoForm({ ...productoForm, precio: e.target.value })
                    }
                    required
                    step="0.01"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={productoForm.stock}
                    onChange={(e) =>
                      setProductoForm({ ...productoForm, stock: e.target.value })
                    }
                    required
                  />
                  <select
                    value={productoForm.tienda}
                    onChange={(e) =>
                      setProductoForm({ ...productoForm, tienda: e.target.value })
                    }
                    required
                  >
                    <option value="">Seleccionar tienda</option>
                    {tiendas.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.nombre}
                      </option>
                    ))}
                  </select>
                  <select
                    value={productoForm.proveedor}
                    onChange={(e) =>
                      setProductoForm({
                        ...productoForm,
                        proveedor: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Seleccionar proveedor</option>
                    {usuarios
                      .filter((u) => u.rol === "proveedor")
                      .map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.nombre}
                        </option>
                      ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Categoría"
                    value={productoForm.categoria}
                    onChange={(e) =>
                      setProductoForm({
                        ...productoForm,
                        categoria: e.target.value,
                      })
                    }
                  />
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={productoForm.es_basico}
                      onChange={(e) =>
                        setProductoForm({
                          ...productoForm,
                          es_basico: e.target.checked,
                        })
                      }
                    />
                    Producto básico
                  </label>
                </div>
                <button type="submit" className="btn-submit">
                  Crear Producto
                </button>
              </form>
            )}

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Tienda</th>
                    <th>Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.id}</td>
                      <td>{producto.nombre}</td>
                      <td>${Number(producto.precio).toFixed(2)}</td>
                      <td>{producto.stock}</td>
                      <td>{producto.tienda_nombre || "N/A"}</td>
                      <td>
                        <span
                          className={`badge ${
                            producto.es_basico ? "badge-basico" : "badge-normal"
                          }`}
                        >
                          {producto.es_basico ? "Básico" : "Normal"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB PEDIDOS */}
        {activeTab === "pedidos" && (
          <div className="content-section">
            <div className="section-header">
              <h2>Gestión de Pedidos</h2>
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Tienda</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map((pedido) => (
                    <tr key={pedido.id}>
                      <td>#{pedido.id}</td>
                      <td>{pedido.cliente_nombre || "N/A"}</td>
                      <td>{pedido.tienda_nombre || "N/A"}</td>
                      <td>${Number(pedido.total).toFixed(2)}</td>
                      <td>
                        <span className={`badge badge-${pedido.estado}`}>
                          {pedido.estado}
                        </span>
                      </td>
                      <td>
                        {new Date(pedido.fecha_creacion).toLocaleDateString()}
                      </td>
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
