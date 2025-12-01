// frontend/src/pages/ProveedorDashboard.jsx - PROFESSIONAL & COMPLETE
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getProductos,
  crearProducto,
  actualizarProducto,
  getTiendas,
} from "../services/productosService";
import { axiosInstance } from "../services/api";
import "../styles/ProveedorDashboard.css";

export default function ProveedorDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [tiendas, setTiendas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [productoForm, setProductoForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    tienda: "",
    es_basico: true,
    categoria: "general",
  });

  // Filtros de productos
  const [filtros, setFiltros] = useState({
    busqueda: '',
    categoria: 'todos',
    precioMin: '',
    precioMax: '',
    stockBajo: false
  });

  // ==================== CARGAR DATOS ====================
  const cargarProductos = useCallback(async () => {
    try {
      const data = await getProductos();
      const productosData = data.results || data;
      // Filtrar solo productos del proveedor actual
      const misProductos = productosData.filter(
        (p) => p.proveedor === user?.id || p.proveedor_nombre === user?.nombre
      );
      setProductos(Array.isArray(misProductos) ? misProductos : []);
    } catch (err) {
      console.error("Error cargando productos:", err);
      setError("Error al cargar productos");
    }
  }, [user]);

  const cargarTiendas = useCallback(async () => {
    try {
      const data = await getTiendas();
      const tiendasData = data.results || data;
      setTiendas(Array.isArray(tiendasData) ? tiendasData : []);
    } catch (err) {
      console.error("Error cargando tiendas:", err);
    }
  }, []);

  const cargarDatos = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all([cargarProductos(), cargarTiendas()]);
    } catch (err) {
      console.error("Error cargando datos:", err);
    } finally {
      setLoading(false);
    }
  }, [cargarProductos, cargarTiendas]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  // ==================== CREAR/EDITAR PRODUCTO ====================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const dataToSend = {
        ...productoForm,
        proveedor: user.id,
      };

      if (editingId) {
        await actualizarProducto(editingId, dataToSend);
        setSuccess("✓ Producto actualizado exitosamente");
      } else {
        await crearProducto(dataToSend);
        setSuccess("✓ Producto creado exitosamente");
      }

      setShowForm(false);
      setEditingId(null);
      resetForm();
      await cargarProductos();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || "Error al guardar producto");
      setTimeout(() => setError(""), 5000);
    }
  };

  // ==================== EDITAR ====================
  const handleEdit = (producto) => {
    setProductoForm({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      tienda: producto.tienda,
      es_basico: producto.es_basico,
      categoria: producto.categoria || "general",
    });
    setEditingId(producto.id);
    setShowForm(true);
  };

  // ==================== AJUSTAR STOCK ====================
  const handleAjustarStock = async (productoId, operacion) => {
    const cantidad = prompt(`¿Cuántas unidades deseas ${operacion}?`);
    if (!cantidad || isNaN(cantidad) || cantidad <= 0) {
      setError("Cantidad inválida");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      await axiosInstance.post(`/productos/productos/${productoId}/ajustar_stock/`, {
        cantidad: parseInt(cantidad),
        operacion,
      });
      setSuccess(`✓ Stock ${operacion === "aumentar" ? "aumentado" : "reducido"}`);
      await cargarProductos();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Error al ajustar stock");
      setTimeout(() => setError(""), 5000);
    }
  };

  // ==================== RESET FORM ====================
  const resetForm = () => {
    setProductoForm({
      nombre: "",
      descripcion: "",
      precio: "",
      stock: "",
      tienda: "",
      es_basico: true,
      categoria: "general",
    });
    setEditingId(null);
  };

  // ==================== LOGOUT ====================
  const handleLogout = () => {
    logout();
    setTimeout(() => window.location.replace('/login'), 150);
  };

  // ==================== ESTADÍSTICAS ====================
  const stats = {
    totalProductos: productos.length,
    stockTotal: productos.reduce((sum, p) => sum + (p.stock || 0), 0),
    stockBajo: productos.filter((p) => p.stock < 10).length,
    productosBasicos: productos.filter((p) => p.es_basico).length,
  };

  if (loading && productos.length === 0) {
    return (
      <div className="proveedor-dashboard">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando productos...</p>
        </div>
      </div>
    );
  }

  // ==================== CARGAR VENTAS ====================
  const [ventas, setVentas] = useState([]);
  const [totalVendido, setTotalVendido] = useState(0);

  const cargarVentas = useCallback(async () => {
    try {
      const res = await axiosInstance.get('/ventas/mis_ventas_proveedor/');
      setVentas(res.data.ventas || []);
      setTotalVendido(res.data.total_historico || 0);
    } catch (err) {
      console.error("Error cargando ventas:", err);
    }
  }, []);

  useEffect(() => {
    cargarVentas();
  }, [cargarVentas]);

  return (
    <div className="proveedor-dashboard">
      {/* HEADER */}
      <div className="proveedor-header">
        <div className="header-content">
          <div className="header-left">
            <h1>📦 Panel de Proveedor</h1>
            <p>
              Bienvenido, <strong>{user?.nombre}</strong>
            </p>
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
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>{stats.totalProductos}</h3>
            <p>Mis Productos</p>
            <span className="stat-detail">En catálogo</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>${Number(totalVendido).toLocaleString('es-CO')}</h3>
            <p>Ventas Totales</p>
            <span className="stat-detail">Ingresos históricos</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <h3>{stats.stockBajo}</h3>
            <p>Stock Bajo</p>
            <span className="stat-detail">Menos de 10 unidades</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>{stats.productosBasicos}</h3>
            <p>Productos Básicos</p>
            <span className="stat-detail">Necesidad básica</span>
          </div>
        </div>
      </div>

      {/* SECCIÓN VENTAS */}
      <div className="main-container" style={{ marginBottom: '30px' }}>
        <div className="section-header">
          <h2>📊 Mis Ventas Recientes</h2>
        </div>
        <div className="table-container" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Producto</th>
                <th>Cliente</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {ventas.length === 0 ? (
                <tr><td colSpan="5" style={{textAlign: 'center'}}>No hay ventas registradas</td></tr>
              ) : ventas.map(v => (
                <tr key={v.id}>
                  <td>{new Date(v.fecha).toLocaleDateString()}</td>
                  <td>{v.producto}</td>
                  <td>{v.cliente}</td>
                  <td>{v.cantidad}</td>
                  <td style={{fontWeight: 'bold', color: '#10b981'}}>${Number(v.subtotal).toLocaleString('es-CO')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECCIÓN PRINCIPAL */}
      <div className="main-container">
        <div className="section-header">
          <h2>Gestión de Productos</h2>
          <button
            className="btn-primary"
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) {
                resetForm();
              }
            }}
          >
            {showForm ? "✕ Cancelar" : "+ Nuevo Producto"}
          </button>
        </div>

        {/* FORMULARIO */}
        {showForm && (
          <form onSubmit={handleSubmit} className="form-card">
            <h3>{editingId ? "Editar Producto" : "Nuevo Producto"}</h3>
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
                  setProductoForm({ ...productoForm, descripcion: e.target.value })
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
                min="0"
              />
              <input
                type="number"
                placeholder="Stock inicial"
                value={productoForm.stock}
                onChange={(e) =>
                  setProductoForm({ ...productoForm, stock: e.target.value })
                }
                required
                min="0"
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
              <input
                type="text"
                placeholder="Categoría"
                value={productoForm.categoria}
                onChange={(e) =>
                  setProductoForm({ ...productoForm, categoria: e.target.value })
                }
              />
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={productoForm.es_basico}
                  onChange={(e) =>
                    setProductoForm({ ...productoForm, es_basico: e.target.checked })
                  }
                />
                Producto de necesidad básica
              </label>
            </div>
            <button type="submit" className="btn-submit">
              {editingId ? "Actualizar Producto" : "Crear Producto"}
            </button>
          </form>
        )}

        {/* FILTROS DE PRODUCTOS */}
        <div style={{ 
          marginBottom: '20px', 
          padding: '15px', 
          background: '#f8fafc', 
          borderRadius: '12px', 
          border: '1px solid #e2e8f0' 
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '14px', textTransform: 'uppercase' }}>
            🔍 Filtros de Búsqueda
          </h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Búsqueda con lupa */}
            <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
              <input 
                type="text" 
                placeholder="Buscar producto..." 
                value={filtros.busqueda}
                onChange={e => setFiltros({...filtros, busqueda: e.target.value})}
                style={{ 
                  padding: '8px 35px 8px 12px', 
                  borderRadius: '6px', 
                  border: '1px solid #cbd5e1', 
                  width: '100%',
                  fontSize: '14px'
                }}
              />
              <span style={{ 
                position: 'absolute', 
                right: '10px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                fontSize: '16px',
                color: '#64748b',
                pointerEvents: 'none'
              }}>
                🔍
              </span>
            </div>

            {/* Categoría */}
            <select
              value={filtros.categoria}
              onChange={e => setFiltros({...filtros, categoria: e.target.value})}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
            >
              <option value="todos">Todas las Categorías</option>
              {[...new Set(productos.map(p => p.categoria))].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Rango de precios */}
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <input 
                type="number" 
                placeholder="Min $" 
                value={filtros.precioMin}
                onChange={e => setFiltros({...filtros, precioMin: e.target.value})}
                style={{ width: '90px', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
              />
              <span style={{ color: '#94a3b8' }}>-</span>
              <input 
                type="number" 
                placeholder="Max $" 
                value={filtros.precioMax}
                onChange={e => setFiltros({...filtros, precioMax: e.target.value})}
                style={{ width: '90px', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
              />
            </div>

            {/* Stock bajo */}
            <button
              onClick={() => setFiltros({...filtros, stockBajo: !filtros.stockBajo})}
              style={{
                padding: '8px 16px',
                background: filtros.stockBajo ? '#ef4444' : 'white',
                color: filtros.stockBajo ? 'white' : '#334155',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px'
              }}
            >
              {filtros.stockBajo ? '⚠️ Stock Bajo' : 'Mostrar Stock Bajo'}
            </button>

            {/* Limpiar */}
            <button 
              onClick={() => setFiltros({busqueda: '', categoria: 'todos', precioMin: '', precioMax: '', stockBajo: false})}
              style={{ 
                padding: '8px 16px', 
                background: '#ef4444', 
                border: 'none', 
                borderRadius: '6px', 
                cursor: 'pointer', 
                color: 'white',
                fontWeight: '500',
                fontSize: '14px'
              }}
            >
              🗑️ Limpiar
            </button>
          </div>
        </div>

        {/* LISTA DE PRODUCTOS */}
        {(() => {
          // Aplicar filtros
          let productosFiltrados = productos.filter(p => {
            if (filtros.busqueda && !p.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase())) return false;
            if (filtros.categoria !== 'todos' && p.categoria !== filtros.categoria) return false;
            if (filtros.precioMin && parseFloat(p.precio) < parseFloat(filtros.precioMin)) return false;
            if (filtros.precioMax && parseFloat(p.precio) > parseFloat(filtros.precioMax)) return false;
            if (filtros.stockBajo && p.stock >= 10) return false;
            return true;
          });

          return productosFiltrados.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>No tienes productos aún</h3>
            <p>Crea tu primer producto para empezar</p>
          </div>
        ) : (
          <div className="productos-grid">
            {productosFiltrados.map((producto) => (
              <div key={producto.id} className="producto-card">
                <div className="producto-header">
                  <h3>{producto.nombre}</h3>
                  <span
                    className={`badge ${
                      producto.es_basico ? "badge-basico" : "badge-normal"
                    }`}
                  >
                    {producto.es_basico ? "Básico" : "Normal"}
                  </span>
                </div>

                <div className="producto-body">
                  <p className="descripcion">{producto.descripcion}</p>

                  <div className="info-row">
                    <span className="label">Precio:</span>
                    <span className="value precio">${Number(producto.precio).toFixed(2)}</span>
                  </div>

                  <div className="info-row">
                    <span className="label">Stock:</span>
                    <span
                      className={`value stock ${
                        producto.stock < 10 ? "bajo" : "normal"
                      }`}
                    >
                      {producto.stock} unidades
                    </span>
                  </div>

                  <div className="info-row">
                    <span className="label">Tienda:</span>
                    <span className="value">{producto.tienda_nombre || "N/A"}</span>
                  </div>

                  <div className="info-row">
                    <span className="label">Categoría:</span>
                    <span className="value">{producto.categoria || "General"}</span>
                  </div>
                </div>

                <div className="producto-actions">
                  <button
                    className="btn-action btn-edit"
                    onClick={() => handleEdit(producto)}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    className="btn-action btn-stock-add"
                    onClick={() => handleAjustarStock(producto.id, "aumentar")}
                  >
                    ➕ Stock
                  </button>
                  <button
                    className="btn-action btn-stock-remove"
                    onClick={() => handleAjustarStock(producto.id, "reducir")}
                  >
                    ➖ Stock
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
        })()}
      </div>
    </div>
  );
}
