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
import OrderService from "../services/orderService";
import { axiosInstance } from "../services/api";
import ModalEdicion from "../components/ModalEdicion";
import "../styles/DashboardAdmin.css";
import DashboardHeader from "../components/DashboardHeader";
import Pagination from "../components/Pagination";


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

  // Paginación y Filtros
  const [paginaUsuarios, setPaginaUsuarios] = useState(1);
  const [paginaTiendas, setPaginaTiendas] = useState(1);
  const [paginaProductos, setPaginaProductos] = useState(1);
  const [paginaPedidos, setPaginaPedidos] = useState(1);
  const ITEMS_POR_PAGINA = 10;

  // Filtros
  const [filtroRol, setFiltroRol] = useState("todos");
  const [filtroEstadoUsuario, setFiltroEstadoUsuario] = useState("todos");
  const [filtroTienda, setFiltroTienda] = useState("todos");
  const [filtroEstadoPedido, setFiltroEstadoPedido] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");

  // Modal de Edición
  const [modalEdicion, setModalEdicion] = useState({
    visible: false,
    tipo: '',
    datos: null
  });

  // ==================== CARGAR DATOS ====================
  const cargarUsuarios = useCallback(async () => {
    try {
      // Obtener todos los usuarios (límite: 10,000)
      const res = await axiosInstance.get("/usuarios/?page_size=10000");
      console.log("[DEBUG] Usuarios - Count:", res.data.count, "Results:", res.data.results?.length);
      const data = res.data.results || res.data;
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
      setError("Error al cargar usuarios");
    }
  }, []);

  const cargarTiendas = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/productos/tiendas/?page_size=10000");
      console.log("[DEBUG] Tiendas - Count:", res.data.count, "Results:", res.data.results?.length);
      const data = res.data.results || res.data;
      setTiendas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error cargando tiendas:", err);
      setError("Error al cargar tiendas");
    }
  }, []);

  const cargarProductos = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/productos/productos/?page_size=10000");
      console.log("[DEBUG] Productos - Count:", res.data.count, "Results:", res.data.results?.length);
      const data = res.data.results || res.data;
      setProductos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error cargando productos:", err);
      setError("Error al cargar productos");
    }
  }, []);

  const cargarPedidos = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/productos/pedidos/?page_size=10000");
      console.log("[DEBUG] Pedidos - Count:", res.data.count, "Results:", res.data.results?.length);
      const data = res.data.results || res.data;
      setPedidos(Array.isArray(data) ? data : []);
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
    
    if (!window.confirm("¿Estás seguro de crear este nuevo usuario?")) {
      return;
    }
    
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append('nombre', userForm.nombre);
      formData.append('email', userForm.email);
      formData.append('password', userForm.password);
      formData.append('rol', userForm.rol);
      formData.append('telefono', userForm.telefono);
      formData.append('direccion', userForm.direccion);
      if (userForm.imagen) {
        formData.append('imagen', userForm.imagen);
      }

      await axiosInstance.post("/usuarios/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess("✓ Usuario creado exitosamente");
      setShowUserForm(false);
      setUserForm({
        nombre: "",
        email: "",
        password: "",
        rol: "cliente",
        telefono: "",
        direccion: "",
        imagen: null,
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
    
    if (!window.confirm("¿Estás seguro de crear esta nueva tienda?")) {
      return;
    }
    
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
    
    if (!window.confirm("¿Estás seguro de crear este nuevo producto?")) {
      return;
    }
    
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
      console.error("Error eliminando usuario:", err.response?.data);
      const errorMsg = err.response?.data?.detail || 
                       err.response?.data?.error ||
                       (err.response?.status === 403 ? "No tienes permisos para eliminar este usuario" :
                        err.response?.status === 404 ? "Usuario no encontrado" :
                        "Error al eliminar usuario. Puede tener datos asociados.");
      setError(errorMsg);
      setTimeout(() => setError(""), 5000);
    }
  };

  // ==================== ELIMINAR TIENDA ====================
  const handleEliminarTienda = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta tienda?")) return;

    try {
      await axiosInstance.delete(`/productos/tiendas/${id}/`);
      setSuccess("✓ Tienda eliminada");
      await cargarTiendas();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error eliminando tienda:", err.response?.data);
      const errorMsg = err.response?.data?.detail || 
                       err.response?.data?.error ||
                       (err.response?.status === 403 ? "No tienes permisos para eliminar esta tienda" :
                        err.response?.status === 404 ? "Tienda no encontrada" :
                        "Error al eliminar tienda. Puede tener productos asociados.");
      setError(errorMsg);
      setTimeout(() => setError(""), 5000);
    }
  };

  // ==================== ELIMINAR PRODUCTO ====================
  const handleEliminarProducto = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;

    try {
      await axiosInstance.delete(`/productos/productos/${id}/`);
      setSuccess("✓ Producto eliminado");
      await cargarProductos();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error eliminando producto:", err.response?.data);
      const errorMsg = err.response?.data?.detail || 
                       err.response?.data?.error ||
                       (err.response?.status === 403 ? "No tienes permisos para eliminar este producto" :
                        err.response?.status === 404 ? "Producto no encontrado" :
                        "Error al eliminar producto. Puede estar en pedidos activos.");
      setError(errorMsg);
      setTimeout(() => setError(""), 5000);
    }
  };

  // ==================== LOGOUT ====================
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ==================== TOGGLE ESTADO USUARIO ====================
  const handleToggleEstadoUsuario = async (usuario) => {
    const nuevoEstado = !usuario.estado;
    const accion = nuevoEstado ? "activar" : "desactivar";
    
    if (!window.confirm(`¿Estás seguro de ${accion} al usuario ${usuario.nombre}?`)) {
      return;
    }

    try {
      await axiosInstance.patch(`/usuarios/${usuario.id}/`, {
        estado: nuevoEstado
      });
      setSuccess(`✓ Usuario ${nuevoEstado ? 'activado' : 'desactivado'} correctamente`);
      await cargarUsuarios();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error cambiando estado del usuario:", err.response?.data);
      setError("Error al cambiar el estado del usuario");
      setTimeout(() => setError(""), 5000);
    }
  };

  // ==================== ACTUALIZAR (UPDATE) ====================
  const handleActualizarUsuario = async (formData) => {
    if (!window.confirm("¿Estás seguro de actualizar este usuario?")) {
      return;
    }
    
    try {
      const dataToSend = new FormData();
      dataToSend.append('nombre', formData.nombre);
      dataToSend.append('email', formData.email);
      dataToSend.append('rol', formData.rol);
      dataToSend.append('telefono', formData.telefono || '');
      dataToSend.append('direccion', formData.direccion || '');
      dataToSend.append('estado', formData.estado);

      if (formData.password && formData.password.trim() !== '') {
        dataToSend.append('password', formData.password);
      }
      
      // Si hay una nueva imagen (objeto File), la enviamos
      if (formData.imagen && typeof formData.imagen !== 'string') {
        dataToSend.append('imagen', formData.imagen);
      }
      
      await axiosInstance.patch(`/usuarios/${formData.id}/`, dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess("✓ Usuario actualizado correctamente");
      await cargarUsuarios();
      setModalEdicion({ visible: false, tipo: '', datos: null });
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error actualizando usuario:", err.response?.data);
      setError(err.response?.data?.detail || "Error al actualizar usuario");
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleActualizarTienda = async (formData) => {
    if (!window.confirm("¿Estás seguro de actualizar esta tienda?")) {
      return;
    }
    
    try {
      await axiosInstance.patch(`/productos/tiendas/${formData.id}/`, {
        nombre: formData.nombre,
        direccion: formData.direccion,
        telefono: formData.telefono,
        activa: formData.activa
      });
      setSuccess("✓ Tienda actualizada correctamente");
      await cargarTiendas();
      setModalEdicion({ visible: false, tipo: '', datos: null });
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error actualizando tienda:", err.response?.data);
      setError(err.response?.data?.detail || "Error al actualizar tienda");
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleActualizarProducto = async (formData) => {
    if (!window.confirm("¿Estás seguro de actualizar este producto?")) {
      return;
    }
    
    try {
      await axiosInstance.patch(`/productos/productos/${formData.id}/`, {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: formData.precio,
        stock: formData.stock,
        tienda: formData.tienda,
        proveedor: formData.proveedor,
        es_basico: formData.es_basico,
        categoria: formData.categoria,
        activo: formData.activo
      });
      setSuccess("✓ Producto actualizado correctamente");
      await cargarProductos();
      setModalEdicion({ visible: false, tipo: '', datos: null });
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error actualizando producto:", err.response?.data);
      setError(err.response?.data?.detail || "Error al actualizar producto");
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleActualizarPedido = async (formData) => {
    if (!window.confirm(`¿Estás seguro de cambiar el estado del pedido #${formData.id} a "${formData.estado}"?`)) {
      return;
    }

    try {
      await OrderService.updateOrderStatus(formData.id, formData.estado);
      setSuccess(`✓ Pedido #${formData.id} actualizado a ${formData.estado}`);
      await cargarPedidos();
      setModalEdicion({ visible: false, tipo: '', datos: null });
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error actualizando pedido:", err);
      const errorMsg = err.response?.data?.error || "Error al actualizar el pedido";
      setError(errorMsg);
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleSubmitEdicion = (formData) => {
    switch (modalEdicion.tipo) {
      case 'Usuario':
        handleActualizarUsuario(formData);
        break;
      case 'Tienda':
        handleActualizarTienda(formData);
        break;
      case 'Producto':
        handleActualizarProducto(formData);
        break;
      case 'Pedido':
        handleActualizarPedido(formData);
        break;
      default:
        break;
    }
  };

  // ==================== FILTRADO Y PAGINACIÓN ====================
  // Orden de prioridad de roles
  const ordenRoles = { admin: 1, proveedor: 2, cliente: 3, comprador: 4, logistica: 5 };

  // Filtrar y ordenar usuarios
  const usuariosFiltrados = usuarios
    .filter((u) => {
      if (filtroRol !== "todos" && u.rol !== filtroRol) return false;
      if (filtroEstadoUsuario !== "todos") {
        if (filtroEstadoUsuario === "activo" && !u.estado) return false;
        if (filtroEstadoUsuario === "inactivo" && u.estado) return false;
      }
      return true;
    })
    .sort((a, b) => {
      // Primero ordenar por rol
      const ordenA = ordenRoles[a.rol] || 99;
      const ordenB = ordenRoles[b.rol] || 99;
      if (ordenA !== ordenB) return ordenA - ordenB;
      // Luego por nombre
      return a.nombre.localeCompare(b.nombre);
    });

  // Filtrar tiendas
  const tiendasFiltradas = tiendas.filter((t) => {
    if (filtroTienda !== "todos") {
      if (filtroTienda === "activas" && !t.activa) return false;
      if (filtroTienda === "inactivas" && t.activa) return false;
    }
    return true;
  });

  // Filtrar productos
  const productosFiltrados = productos.filter((p) => {
    if (filtroTienda !== "todos" && filtroTienda !== "activas" && filtroTienda !== "inactivas") {
      if (p.tienda !== parseInt(filtroTienda)) return false;
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const nombre = p.nombre?.toLowerCase() || "";
      const descripcion = p.descripcion?.toLowerCase() || "";
      if (!nombre.includes(term) && !descripcion.includes(term)) return false;
    }

    return true;
  });

  // Filtrar pedidos
  const pedidosFiltrados = pedidos.filter((p) => {
    if (filtroEstadoPedido !== "todos" && p.estado !== filtroEstadoPedido) return false;
    return true;
  });

  // Paginación
  const paginarDatos = (datos, pagina) => {
    const inicio = (pagina - 1) * ITEMS_POR_PAGINA;
    const fin = inicio + ITEMS_POR_PAGINA;
    return datos.slice(inicio, fin);
  };

  const usuariosPaginados = paginarDatos(usuariosFiltrados, paginaUsuarios);
  const tiendasPaginadas = paginarDatos(tiendasFiltradas, paginaTiendas);
  const productosPaginados = paginarDatos(productosFiltrados, paginaProductos);
  const pedidosPaginados = paginarDatos(pedidosFiltrados, paginaPedidos);

  const totalPaginasUsuarios = Math.ceil(usuariosFiltrados.length / ITEMS_POR_PAGINA);
  const totalPaginasTiendas = Math.ceil(tiendasFiltradas.length / ITEMS_POR_PAGINA);
  const totalPaginasProductos = Math.ceil(productosFiltrados.length / ITEMS_POR_PAGINA);
  const totalPaginasPedidos = Math.ceil(pedidosFiltrados.length / ITEMS_POR_PAGINA);

  // ==================== ESTADÍSTICAS ====================
  const stats = {
    // Usuarios
    totalUsuarios: usuarios.length,
    usuariosActivos: usuarios.filter((u) => u.estado).length,
    usuariosInactivos: usuarios.filter((u) => !u.estado).length,
    adminCount: usuarios.filter((u) => u.rol === 'admin').length,
    proveedorCount: usuarios.filter((u) => u.rol === 'proveedor').length,
    clienteCount: usuarios.filter((u) => u.rol === 'cliente').length,
    
    // Tiendas
    totalTiendas: tiendas.length,
    tiendasActivas: tiendas.filter((t) => t.activa).length,
    tiendasInactivas: tiendas.filter((t) => !t.activa).length,
    
    // Productos
    totalProductos: productos.length,
    productosActivos: productos.filter((p) => p.activo !== false).length,
    productosBasicos: productos.filter((p) => p.es_basico).length,
    productosNormales: productos.filter((p) => !p.es_basico).length,
    stockTotal: productos.reduce((sum, p) => sum + (p.stock || 0), 0),
    
    // Pedidos
    totalPedidos: pedidos.length,
    pedidosPendientes: pedidos.filter((p) => p.estado === "pendiente").length,
    pedidosPreparando: pedidos.filter((p) => p.estado === "preparando").length,
    pedidosEnTransito: pedidos.filter((p) => p.estado === "en_transito").length,
    pedidosEntregados: pedidos.filter((p) => p.estado === "entregado").length,
    pedidosCancelados: pedidos.filter((p) => p.estado === "cancelado").length,
    
    // Valores monetarios
    valorTotalPedidos: pedidos.reduce((sum, p) => sum + (parseFloat(p.total) || 0), 0),
    valorPedidosPendientes: pedidos
      .filter((p) => p.estado === "pendiente")
      .reduce((sum, p) => sum + (parseFloat(p.total) || 0), 0),
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
      <DashboardHeader title="⚡ Panel de Administración" />

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
            <span className="stat-detail">
              {stats.usuariosActivos} Activos • {stats.adminCount} Admins
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏪</div>
          <div className="stat-content">
            <h3>{stats.totalTiendas}</h3>
            <p>Tiendas</p>
            <span className="stat-detail">
              {stats.tiendasActivas} Activas • {stats.tiendasInactivas} Inactivas
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>{stats.totalProductos}</h3>
            <p>Productos</p>
            <span className="stat-detail">
              Stock Total: {stats.stockTotal} u.
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-content">
            <h3>{stats.totalPedidos}</h3>
            <p>Pedidos</p>
            <span className="stat-detail">
              {stats.pedidosPendientes} Pendientes (${stats.valorPedidosPendientes.toLocaleString('es-CO')})
            </span>
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
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label style={{display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666'}}>Foto de Perfil</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setUserForm({ ...userForm, imagen: e.target.files[0] })}
                      style={{ padding: '8px', width: '100%', border: '2px solid #e2e8f0', borderRadius: '10px' }}
                    />
                  </div>
                  <select
                    value={userForm.rol}
                    onChange={(e) =>
                      setUserForm({ ...userForm, rol: e.target.value })
                    }
                  >
                    <option value="cliente">Cliente</option>
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

            {/* FILTROS */}
            <div className="filters-container" style={{ marginBottom: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <div className="filter-group">
                <label style={{ marginRight: '8px', fontWeight: '600' }}>Rol:</label>
                <select 
                  value={filtroRol} 
                  onChange={(e) => { setFiltroRol(e.target.value); setPaginaUsuarios(1); }}
                  style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ddd' }}
                >
                  <option value="todos">Todos</option>
                  <option value="admin">Admin</option>
                  <option value="proveedor">Proveedor</option>
                  <option value="cliente">Cliente</option>
                  <option value="logistica">Logística</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label style={{ marginRight: '8px', fontWeight: '600' }}>Estado:</label>
                <select 
                  value={filtroEstadoUsuario} 
                  onChange={(e) => { setFiltroEstadoUsuario(e.target.value); setPaginaUsuarios(1); }}
                  style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ddd' }}
                >
                  <option value="todos">Todos</option>
                  <option value="activo">Activos</option>
                  <option value="inactivo">Inactivos</option>
                </select>
              </div>

              <div style={{ marginLeft: 'auto', color: '#666', fontWeight: '500' }}>
                Mostrando {usuariosPaginados.length} de {usuariosFiltrados.length} usuarios
              </div>
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosPaginados.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.id}</td>
                      <td>
                        {usuario.imagen ? (
                          <img 
                            src={usuario.imagen} 
                            alt={usuario.nombre} 
                            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} 
                          />
                        ) : (
                          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                            👤
                          </div>
                        )}
                      </td>
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
                          className="btn-edit-small"
                          onClick={() => setModalEdicion({
                            visible: true,
                            tipo: 'Usuario',
                            datos: usuario
                          })}
                          style={{ marginRight: '8px' }}
                        >
                          ✏️
                        </button>
                        <button
                          className={usuario.estado ? "btn-warning-small" : "btn-success-small"}
                          onClick={() => handleToggleEstadoUsuario(usuario)}
                          style={{ marginRight: '8px' }}
                          title={usuario.estado ? "Desactivar usuario" : "Activar usuario"}
                        >
                          {usuario.estado ? '🔒' : '🔓'}
                        </button>
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

            {/* PAGINACIÓN */}
            <Pagination
              currentPage={paginaUsuarios}
              totalPages={totalPaginasUsuarios}
              onPageChange={setPaginaUsuarios}
              itemsPerPage={ITEMS_POR_PAGINA}
              totalItems={usuariosFiltrados.length}
              currentItems={usuariosPaginados.length}
            />
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
              {tiendasPaginadas.map((tienda) => (
                <div key={tienda.id} className="info-card">
                  <h3>{tienda.nombre}</h3>
                  <p>📍 {tienda.direccion}</p>
                  <p>📞 {tienda.telefono || "Sin teléfono"}</p>
                  <p className="admin-name">
                    👤 Admin: {tienda.administrador?.nombre || "N/A"}
                  </p>
                  <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                    <button
                      className="btn-edit-small"
                      onClick={() => setModalEdicion({
                        visible: true,
                        tipo: 'Tienda',
                        datos: tienda
                      })}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="btn-delete-small"
                      onClick={() => handleEliminarTienda(tienda.id)}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINACIÓN */}
            <Pagination
              currentPage={paginaTiendas}
              totalPages={totalPaginasTiendas}
              onPageChange={setPaginaTiendas}
              itemsPerPage={ITEMS_POR_PAGINA}
              totalItems={tiendas.length}
              currentItems={tiendasPaginadas.length}
            />
          </div>
        )}

        {/* TAB PRODUCTOS */}
        {activeTab === "productos" && (
          <div className="content-section">
            <div className="section-header">
              <h2>Gestión de Productos</h2>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="btn-secondary"
                  onClick={() => navigate('/admin/asignar-productos')}
                  style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                >
                  🔗 Asignar Productos
                </button>
                <button
                  className="btn-primary"
                  onClick={() => setShowProductoForm(!showProductoForm)}
                >
                  {showProductoForm ? "✕ Cancelar" : "+ Nuevo Producto"}
                </button>
              </div>
            </div>

            <div className="search-bar" style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="🔍 Buscar productos..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPaginaProductos(1);
                }}
                style={{
                  width: '100%',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '16px'
                }}
              />
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
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productosPaginados.map((producto) => (
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
                      <td>
                        <button
                          className="btn-edit-small"
                          onClick={() => setModalEdicion({
                            visible: true,
                            tipo: 'Producto',
                            datos: producto
                          })}
                          style={{ marginRight: '8px' }}
                        >
                          ✏️
                        </button>
                        <button
                          className="btn-delete-small"
                          onClick={() => handleEliminarProducto(producto.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINACIÓN */}
            <Pagination
              currentPage={paginaProductos}
              totalPages={totalPaginasProductos}
              onPageChange={setPaginaProductos}
              itemsPerPage={ITEMS_POR_PAGINA}
              totalItems={productosFiltrados.length}
              currentItems={productosPaginados.length}
            />
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
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidosPaginados.map((pedido) => (
                    <tr key={pedido.id}>
                      <td>#{pedido.id}</td>
                      <td>{pedido.cliente?.nombre || "N/A"}</td>
                      <td>{pedido.tienda?.nombre || "N/A"}</td>
                      <td>${Number(pedido.total).toFixed(2)}</td>
                      <td>
                        <span className={`badge badge-${pedido.estado}`}>
                          {pedido.estado}
                        </span>
                      </td>
                      <td>
                        {new Date(pedido.fecha_creacion).toLocaleDateString()}
                      </td>
                      <td>
                        <button
                          className="btn-edit-small"
                          onClick={() => setModalEdicion({
                            visible: true,
                            tipo: 'Pedido',
                            datos: pedido
                          })}
                        >
                          ✏️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINACIÓN */}
            <Pagination
              currentPage={paginaPedidos}
              totalPages={totalPaginasPedidos}
              onPageChange={setPaginaPedidos}
              itemsPerPage={ITEMS_POR_PAGINA}
              totalItems={pedidosFiltrados.length}
              currentItems={pedidosPaginados.length}
            />
          </div>
        )}
      </div>

      {/* MODAL DE EDICIÓN */}
      <ModalEdicion
        visible={modalEdicion.visible}
        tipo={modalEdicion.tipo}
        datos={modalEdicion.datos}
        onClose={() => setModalEdicion({ visible: false, tipo: '', datos: null })}
        onSubmit={handleSubmitEdicion}
        usuarios={usuarios}
        tiendas={tiendas}
      />
    </div>
  );
}
