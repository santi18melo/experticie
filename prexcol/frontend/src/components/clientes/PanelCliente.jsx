import React, { useEffect, useState } from 'react';
import api from '../../services/api.js';
import './PanelCliente.css';

function PanelCliente() {
  const [pedidos, setPedidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [tiendas, setTiendas] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [tiendaSeleccionada, setTiendaSeleccionada] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const resPedidos = await api.getMisPedidos(token);
      setPedidos(Array.isArray(resPedidos) ? resPedidos : []);
      
      const resTiendas = await api.getTiendas(token);
      const tiendas = resTiendas.results ? resTiendas.results : resTiendas;
      setTiendas(Array.isArray(tiendas) ? tiendas : []);
      
      if (tiendas.length > 0) {
        cargarProductosPorTienda(tiendas[0].id);
        setTiendaSeleccionada(tiendas[0].id);
      }
    } catch (err) {
      console.error('Error cargando datos:', err);
      setError('Error al cargar datos: ' + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  const cargarProductosPorTienda = async (tiendaId) => {
    try {
      const data = await api.getProductosPorTienda(token, tiendaId);
      setProductos(Array.isArray(data) ? data : []);
      setCarrito([]);
    } catch (err) {
      console.error('Error cargando productos:', err);
    }
  };

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find(p => p.id === producto.id);
    if (existe) {
      if (existe.cantidad < producto.stock) {
        setCarrito(carrito.map(p => 
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        ));
      }
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const eliminarDelCarrito = (productoId) => {
    setCarrito(carrito.filter(p => p.id !== productoId));
  };

  const crearPedido = async () => {
    if (carrito.length === 0) {
      setError('El carrito está vacío');
      return;
    }

    try {
      const detalles = carrito.map(p => ({ producto: p.id, cantidad: p.cantidad }));
      const response = await api.crearPedido(token, {
        tienda_id: tiendaSeleccionada,
        detalles,
        notas: 'Pedido desde panel cliente'
      });

      setExito(`✓ Pedido #${response.id} creado exitosamente`);
      setCarrito([]);
      setMostrarFormulario(false);
      setTimeout(() => {
        cargarDatos();
        setExito("");
      }, 2000);
    } catch (err) {
      setError('Error al crear pedido: ' + (err.response?.data?.error || err.message));
    }
  };

  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  if (loading) return <div className="panel-cliente"><p>Cargando...</p></div>;

  return (
    <div className="panel-cliente">
      <h1>👤 Mi Panel Cliente</h1>

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
                    <td>${pedido.total}</td>
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
                      <p className="precio">${producto.precio}</p>
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
            </div>

            {/* Carrito */}
            <div className="carrito-seccion">
              <h3>Tu Carrito ({carrito.length})</h3>
              {carrito.length > 0 ? (
                <>
                  <div className="carrito-items">
                    {carrito.map(item => (
                      <div key={item.id} className="carrito-item">
                        <div>
                          <h5>{item.nombre}</h5>
                          <p>${item.precio} x {item.cantidad}</p>
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
                  <div className="carrito-resumen">
                    <h4>Total: ${total.toFixed(2)}</h4>
                    <button onClick={crearPedido} className="btn-finalizar">
                      ✓ Finalizar Pedido
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
