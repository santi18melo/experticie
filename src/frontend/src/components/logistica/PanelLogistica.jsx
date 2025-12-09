import React, { useEffect, useState } from 'react';
import OrderService from '../../services/orderService';
import '../../styles/PanelLogistica.css';
import DashboardHeader from '../DashboardHeader';
import Map from '../common/Map';
import axios from 'axios';

function PanelLogistica() {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [detalles, setDetalles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [mapMarkers, setMapMarkers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    cargarPedidos();
    cargarMapa();
  }, []);

  const cargarMapa = async () => {
    try {
        // In a real app, use a service. Direct axios for now to match the plan.
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/maps/logistica/`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data && response.data.features) {
            const markers = response.data.features.map(f => ({
                position: [f.geometry.coordinates[1], f.geometry.coordinates[0]], // GeoJSON is Lng, Lat. Leaflet is Lat, Lng
                title: f.properties.title,
                description: f.properties.description
            }));
            setMapMarkers(markers);
        }
    } catch (err) {
        console.error("Error loading map data", err);
    }
  };

  const cargarPedidos = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await OrderService.getPedidosEnPreparacion();
      const lista = Array.isArray(data) ? data : [];
      // Marcar categorías por pedido: si contienen básicos / no básicos (obtener detalles)
      const marcados = await Promise.all(lista.map(async p => {
        try {
          const detalles = await OrderService.getDetallesPedido(p.id);
          const dets = Array.isArray(detalles) ? detalles : [];
          const tiene_basicos = dets.some(d => d.es_basico);
          const tiene_no_basicos = dets.some(d => !d.es_basico);
          return { ...p, tiene_basicos, tiene_no_basicos };
} catch {
  return {
    ...p,
    tiene_basicos: false,
    tiene_no_basicos: false,
  };
}


      }));
      setPedidos(marcados);
    } catch (err) {
      console.error('Error cargando pedidos:', err);
      setError('Error al cargar pedidos para logística: ' + (err.response?.data?.detail || err.message));
      setPedidos([]);
    } finally {
      setLoading(false);
    }
  };

  const [filtroPedidos, setFiltroPedidos] = useState('todos'); // todos | basicos | no_basicos

  const cargarDetalles = async (pedidoId) => {
    try {
      const data = await OrderService.getDetallesPedido(pedidoId);
      setDetalles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error cargando detalles:', err);
      setError('Error al cargar detalles del pedido');
      setDetalles([]);
    }
  };

  const handleSeleccionarPedido = (pedido) => {
    setPedidoSeleccionado(pedido);
    cargarDetalles(pedido.id);
  };

  const cambiarEstadoPedido = async (pedidoId, nuevoEstado) => {
    setError('');
    setMensaje('');
    try {
      await OrderService.cambiarEstadoPedido(pedidoId, nuevoEstado);
      setMensaje(`✓ Pedido actualizado a ${nuevoEstado}`);
      
      setTimeout(() => {
        cargarPedidos();
        setPedidoSeleccionado(null);
        setDetalles([]);
        setMensaje('');
      }, 2000);
    } catch (err) {
      console.error('Error cambiando estado:', err);
      setError('Error al cambiar estado: ' + (err.response?.data?.error || err.message));
    }
  };

  if (loading) return <div className="panel-logistica"><p>Cargando...</p></div>;

  return (
    <div className="panel-logistica">
      <DashboardHeader title="🚚 Panel de Logística" />

      {error && <div className="alert alert-error">{error}</div>}
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      
      <div style={{ marginBottom: '20px' }}>
        <Map markers={mapMarkers} height="300px" />
      </div>

      <div className="contenido-principal">
        <div className="lista-pedidos">
          <h2>Pedidos en Preparación</h2>
          <div className="filtro-pedidos">
            <button className={`filtro-btn ${filtroPedidos === 'todos' ? 'activo' : ''}`} onClick={() => setFiltroPedidos('todos')}>Todos ({pedidos.length})</button>
            <button className={`filtro-btn ${filtroPedidos === 'basicos' ? 'activo' : ''}`} onClick={() => setFiltroPedidos('basicos')}>🔹 Contienen Básicos ({pedidos.filter(p => p.tiene_basicos).length})</button>
            <button className={`filtro-btn ${filtroPedidos === 'no_basicos' ? 'activo' : ''}`} onClick={() => setFiltroPedidos('no_basicos')}>✨ Contienen No Básicos ({pedidos.filter(p => p.tiene_no_basicos).length})</button>
          </div>
          
          {pedidos.length > 0 ? (
            <div className="pedidos-container">
              {pedidos
                .filter(p => {
                  if (filtroPedidos === 'basicos') return p.tiene_basicos;
                  if (filtroPedidos === 'no_basicos') return p.tiene_no_basicos;
                  return true;
                })
                .map(pedido => (
                <div
                  key={pedido.id}
                  className={`pedido-card ${pedidoSeleccionado?.id === pedido.id ? 'seleccionado' : ''}`}
                  onClick={() => handleSeleccionarPedido(pedido)}
                >
                  <div className="pedido-header">
                    <h3>Pedido #{pedido.id}</h3>
                    <span className="badge">{pedido.estado}</span>
                  </div>
                  <p className="cliente">Cliente: <strong>{pedido.cliente_nombre || 'N/A'}</strong></p>
                  <p className="tienda">Tienda: <strong>{pedido.tienda_nombre || 'N/A'}</strong></p>
                  <p className="total">Total: <strong>${pedido.total}</strong></p>
                  <p className="fecha">{new Date(pedido.fecha_creacion).toLocaleString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="sin-pedidos">
              <p>✓ No hay pedidos en preparación</p>
            </div>
          )}
        </div>

        {pedidoSeleccionado && (
          <div className="detalles-pedido">
            <h2>Detalles del Pedido #{pedidoSeleccionado.id}</h2>

            <div className="info-cliente">
              <h3>Información del Cliente</h3>
              <p><strong>Nombre:</strong> {pedidoSeleccionado.cliente_nombre}</p>
              <p><strong>Email:</strong> {pedidoSeleccionado.cliente_email || 'N/A'}</p>
              <p><strong>Dirección:</strong> {pedidoSeleccionado.cliente_direccion || 'N/A'}</p>
            </div>

            <div className="info-tienda">
              <h3>Información de la Tienda</h3>
              <p><strong>Nombre:</strong> {pedidoSeleccionado.tienda_nombre}</p>
              <p><strong>Dirección:</strong> {pedidoSeleccionado.tienda_direccion || 'N/A'}</p>
              <p><strong>Teléfono:</strong> {pedidoSeleccionado.tienda_telefono || 'N/A'}</p>
            </div>

            <div className="items-pedido">
              <h3>Artículos del Pedido</h3>
              {detalles.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio Unit.</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detalles.map((detalle, idx) => (
                      <tr key={idx}>
                        <td>{detalle.producto_nombre}</td>
                        <td>{detalle.cantidad}</td>
                        <td>${detalle.precio_unitario}</td>
                        <td>${detalle.subtotal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No hay detalles disponibles</p>
              )}
              
              {detalles.length > 0 && (
                <div className="resumen-categorias-pedido">
                  <div className="categoria-resumen">
                    <span>🔹 Básicos:</span>
                    <strong>{detalles.filter(d => d.es_basico).reduce((sum, d) => sum + d.cantidad, 0)} unidades</strong>
                  </div>
                  <div className="categoria-resumen">
                    <span>✨ No Básicos:</span>
                    <strong>{detalles.filter(d => !d.es_basico).reduce((sum, d) => sum + d.cantidad, 0)} unidades</strong>
                  </div>
                </div>
              )}
            </div>

            <div className="acciones">
              <h3>Cambiar Estado del Pedido</h3>
              <div className="botones-estado">
                <button
                  onClick={() => cambiarEstadoPedido(pedidoSeleccionado.id, 'en_transito')}
                  className="btn btn-en-transito"
                >
                  📦 Enviar (En Tránsito)
                </button>
                <button
                  onClick={() => cambiarEstadoPedido(pedidoSeleccionado.id, 'entregado')}
                  className="btn btn-entregado"
                >
                  ✓ Entregar (Entregado)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PanelLogistica;
