import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  getTiendas,
  getProductosPorTienda,
  getMisPedidos,
  crearPedido,
  getMetodosPago
} from '../../services/productosService';
import '../../styles/PanelCliente.css';
import DashboardHeader from '../DashboardHeader';

function PanelCliente() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const [pedidos, setPedidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [tiendas, setTiendas] = useState([]);
  const [metodosPago, setMetodosPago] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [tiendaSeleccionada, setTiendaSeleccionada] = useState(null);
  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // =============================
  // CARGAR PRODUCTOS POR TIENDA
  // =============================
  const cargarProductosPorTienda = useCallback(async (tiendaId) => {
    try {
      setLoading(true);
      const data = await getProductosPorTienda(tiendaId);
      setProductos(Array.isArray(data) ? data : []);
      setCarrito([]);
      setError("");
    } catch (err) {
      console.error('Error cargando productos:', err);
      setError('Error cargando productos: ' + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  }, []);

  // =============================
  // CARGAR DATOS INICIALES
  // =============================
  const cargarDatos = useCallback(async () => {
    setLoading(true);
    try {
      // Cargar pedidos del cliente
      const resPedidos = await getMisPedidos();
      setPedidos(Array.isArray(resPedidos) ? resPedidos : []);

      // Cargar tiendas disponibles
      const resTiendas = await getTiendas();
      const tiendasData = resTiendas.results || resTiendas;
      setTiendas(Array.isArray(tiendasData) ? tiendasData : []);

      // Cargar métodos de pago
      try {
        const resMetodos = await getMetodosPago();
        const metodosData = resMetodos.results || resMetodos;
        setMetodosPago(Array.isArray(metodosData) ? metodosData : []);
        if (metodosData.length > 0) {
          setMetodoPagoSeleccionado(metodosData[0].nombre);
        }
      } catch (err) {
        console.warn('Métodos de pago no disponibles, usando efectivo por defecto');
        setMetodosPago([{ id: 1, nombre: 'Efectivo' }]);
        setMetodoPagoSeleccionado('Efectivo');
      }

      // Cargar productos de la primera tienda
      if (tiendasData.length > 0) {
        await cargarProductosPorTienda(tiendasData[0].id);
        setTiendaSeleccionada(tiendasData[0].id);
      }

      setError("");
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError('Error al cargar datos: ' + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  }, [cargarProductosPorTienda]);

  // =============================
  // AGREGAR AL CARRITO
  // =============================
  const agregarAlCarrito = (producto) => {
    const existente = carrito.find(item => item.id === producto.id);

    if (existente) {
      if (existente.cantidad >= producto.stock) {
        setError(`No hay suficiente stock de ${producto.nombre}`);
        setTimeout(() => setError(""), 3000);
        return;
      }
      setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
    setExito(`✓ ${producto.nombre} agregado al carrito`);
    setTimeout(() => setExito(""), 2000);
  };

  // =============================
  // ELIMINAR DEL CARRITO
  // =============================
  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  // =============================
  // ACTUALIZAR CANTIDAD EN CARRITO
  // =============================
  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) {
      eliminarDelCarrito(id);
      return;
    }
    
    const producto = productos.find(p => p.id === id);
    if (producto && nuevaCantidad > producto.stock) {
      setError(`Solo hay ${producto.stock} unidades disponibles`);
      setTimeout(() => setError(""), 3000);
      return;
    }

    setCarrito(carrito.map(item =>
      item.id === id ? { ...item, cantidad: nuevaCantidad } : item
    ));
  };

  // =============================
  // CALCULAR TOTAL
  // =============================
  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  // =============================
  // CREAR PEDIDO
  // =============================
  const crearNuevoPedido = async () => {
    if (carrito.length === 0) {
      setError('El carrito está vacío');
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (!metodoPagoSeleccionado) {
      setError('Selecciona un método de pago');
      setTimeout(() => setError(""), 3000);
      return;
    }

    setLoading(true);
    try {
      const detalles = carrito.map(item => ({
        producto: item.id,
        cantidad: item.cantidad,
      }));

      const pedidoData = {
        tienda_id: tiendaSeleccionada,
        detalles: detalles,
        metodo_pago: metodoPagoSeleccionado,
        monto_pago: total.toFixed(2),
        notas: ''
      };

      await crearPedido(pedidoData);

      setExito('✓ Pedido creado exitosamente');
      setCarrito([]);
      setMostrarFormulario(false);
      await cargarDatos();

      setTimeout(() => setExito(''), 3000);
    } catch (err) {
      console.error('Error al crear pedido:', err);
      const errorMsg = err.response?.data?.error || err.response?.data?.detail || err.message;
      setError('Error al crear pedido: ' + errorMsg);
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // MANEJAR LOGOUT
  // =============================
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  if (loading && pedidos.length === 0) {
    return (
      <div className="panel-cliente">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="panel-cliente">
      {/* Header con información del usuario y logout */}
      {/* Header con información del usuario y logout */}
      <DashboardHeader title="👤 Mi Panel Cliente" />

      {error && <div className="alert alert-error">{error}</div>}
      {exito && <div className="alert alert-success">{exito}</div>}

      {/* Sección de Pedidos Anteriores */}
      <div className="seccion-pedidos">
        <h2>📋 Mis Pedidos</h2>
        {pedidos.length > 0 ? (
          <div className="tabla-pedidos">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tienda</th>
                  <th>Estado</th>
                  <th>Total</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map(pedido => (
                  <tr key={pedido.id} className={`estado-${pedido.estado}`}>
                    <td>#{pedido.id}</td>
                    <td>{pedido.tienda_nombre || 'N/A'}</td>
                    <td><span className={`badge estado-${pedido.estado}`}>{pedido.estado}</span></td>
                    <td>${Number(pedido.total).toFixed(2)}</td>
                    <td>{new Date(pedido.fecha_creacion).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="sin-pedidos">No tienes pedidos aún. ¡Crea uno!</p>
        )}
      </div>

      {/* Botón para crear nuevo pedido */}
      <div className="boton-crear">
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="btn-crear-nuevo"
        >
          {mostrarFormulario ? '✕ Cancelar' : '+ Crear Nuevo Pedido'}
        </button>
      </div>

      {/* Formulario de Nuevo Pedido */}
      {mostrarFormulario && (
        <div className="formulario-pedido">
          <h2>🛒 Hacer un Nuevo Pedido</h2>

          <div className="selector-tienda">
            <label>Selecciona la tienda:</label>
            <select
              value={tiendaSeleccionada || ""}
              onChange={(e) => {
                const id = parseInt(e.target.value);
                setTiendaSeleccionada(id);
                cargarProductosPorTienda(id);
              }}
              disabled={loading}
            >
              {tiendas.map(t => (
                <option key={t.id} value={t.id}>{t.nombre}</option>
              ))}
            </select>
          </div>

          <div className="filtro-categoria">
            <label>Filtrar por:</label>
            <div className="filtro-botones">
              <button className={`filtro-btn ${filtroCategoria === 'todos' ? 'activo' : ''}`} onClick={() => setFiltroCategoria('todos')}>Todos ({productos.length})</button>
              <button className={`filtro-btn ${filtroCategoria === 'basicos' ? 'activo' : ''}`} onClick={() => setFiltroCategoria('basicos')}>🔹 Básicos ({productos.filter(p => p.es_basico).length})</button>
              <button className={`filtro-btn ${filtroCategoria === 'no_basicos' ? 'activo' : ''}`} onClick={() => setFiltroCategoria('no_basicos')}>✨ No Básicos ({productos.filter(p => !p.es_basico).length})</button>
            </div>
          </div>

          <div className="contenedor-compra">
            {/* Grid de Productos */}
            <div className="productos-seccion">
              <h3>Productos Disponibles</h3>
              {loading ? (
                <p>Cargando productos...</p>
              ) : (
                <div className="grid-productos">
                  {productos.length > 0 ? (
                    productos
                      .filter(p => {
                        if (filtroCategoria === 'basicos') return p.es_basico;
                        if (filtroCategoria === 'no_basicos') return !p.es_basico;
                        return true;
                      })
                      .map(producto => (
                        <div key={producto.id} className="producto-card">
                          <h4>{producto.nombre}</h4>
                          <p className="descripcion">{producto.descripcion}</p>
                          <p className="precio">${Number(producto.precio).toFixed(2)}</p>
                          <p className={`categoria ${producto.es_basico ? 'basico' : 'no-basico'}`}>
                            {producto.es_basico ? '🔹 Necesidad Básica' : '✨ No Básico'}
                          </p>
                          <p className={`stock ${producto.stock > 0 ? 'disponible' : 'agotado'}`}>
                            Stock: {producto.stock}
                          </p>
                          <button
                            onClick={() => agregarAlCarrito(producto)}
                            disabled={producto.stock === 0}
                            className="btn-agregar"
                          >
                            {producto.stock > 0 ? 'Agregar' : 'Agotado'}
                          </button>
                        </div>
                      ))
                  ) : (
                    <p>No hay productos en esta tienda</p>
                  )}
                </div>
              )}
            </div>

            {/* Carrito */}
            <div className="carrito-seccion">
              <h3>Tu Carrito ({carrito.length})</h3>
              {carrito.length > 0 ? (
                <>
                  <div className="carrito-items">
                    {carrito.map(item => (
                      <div key={item.id} className="carrito-item">
                        <div className="item-info">
                          <h5>{item.nombre}</h5>
                          <p className="item-precio">${Number(item.precio).toFixed(2)}</p>
                        </div>
                        <div className="item-controls">
                          <button
                            onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                            className="btn-cantidad"
                          >
                            -
                          </button>
                          <span className="cantidad">{item.cantidad}</span>
                          <button
                            onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                            className="btn-cantidad"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => eliminarDelCarrito(item.id)}
                          className="btn-eliminar"
                        >
                          ✕
                        </button>
                        <span className="subtotal">${(item.precio * item.cantidad).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="metodo-pago-selector">
                    <label>Método de Pago:</label>
                    <select
                      value={metodoPagoSeleccionado}
                      onChange={(e) => setMetodoPagoSeleccionado(e.target.value)}
                    >
                      {metodosPago.map(metodo => (
                        <option key={metodo.id} value={metodo.nombre}>
                          {metodo.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="carrito-resumen">
                    <h4>Total: ${total.toFixed(2)}</h4>
                    <button 
                      onClick={crearNuevoPedido} 
                      className="btn-finalizar"
                      disabled={loading}
                    >
                      {loading ? 'Procesando...' : '✓ Finalizar Pedido'}
                    </button>
                  </div>
                </>
              ) : (
                <p className="carrito-vacio">Carrito vacío</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PanelCliente;
