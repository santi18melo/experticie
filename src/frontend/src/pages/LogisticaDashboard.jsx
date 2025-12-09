// frontend/src/pages/LogisticaDashboard.jsx - PROFESSIONAL & COMPLETE
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getPedidosEnPreparacion,
  cambiarEstadoPedido,
} from "../services/productosService";
import "../styles/LogisticaDashboard.css";

export default function LogisticaDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");

  const cargarPedidos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPedidosEnPreparacion();
      const pedidosData = data.results || data;
      setPedidos(Array.isArray(pedidosData) ? pedidosData : []);
      setError("");
    } catch (err) {
      console.error("Error cargando pedidos:", err);
      setError("Error al cargar pedidos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarPedidos();
  }, [cargarPedidos]);

  const handleCambiarEstado = async (pedidoId, nuevoEstado) => {
    if (!window.confirm(`¿Cambiar pedido #${pedidoId} a "${nuevoEstado}"?`)) return;

    try {
      await cambiarEstadoPedido(pedidoId, nuevoEstado);
      setSuccess(`✓ Pedido #${pedidoId} actualizado`);
      await cargarPedidos();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Error al cambiar estado");
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const pedidosFiltrados = pedidos.filter((p) => {
    if (filtroEstado === "todos") return true;
    return p.estado === filtroEstado;
  });

  const stats = {
    total: pedidos.length,
    preparando: pedidos.filter((p) => p.estado === "preparando").length,
    enTransito: pedidos.filter((p) => p.estado === "en_transito").length,
  };

  if (loading && pedidos.length === 0) {
    return (
      <div className="logistica-dashboard">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando entregas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="logistica-dashboard">
      <div className="logistica-header">
        <div className="header-content">
          <div className="header-left">
            <h1>🚚 Panel de Logística</h1>
            <p>Bienvenido, <strong>{user?.nombre}</strong></p>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            🚪 Cerrar Sesión
          </button>
        </div>
      </div>

      {error && <div className="alert alert-error"><span>⚠️</span> {error}</div>}
      {success && <div className="alert alert-success"><span>✓</span> {success}</div>}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total Entregas</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚙️</div>
          <div className="stat-content">
            <h3>{stats.preparando}</h3>
            <p>Preparando</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚚</div>
          <div className="stat-content">
            <h3>{stats.enTransito}</h3>
            <p>En Tránsito</p>
          </div>
        </div>
      </div>

      <div className="filtros-container">
        <div className="filtros">
          <button className={`filtro-btn ${filtroEstado === "todos" ? "active" : ""}`} onClick={() => setFiltroEstado("todos")}>
            Todos ({pedidos.length})
          </button>
          <button className={`filtro-btn ${filtroEstado === "preparando" ? "active" : ""}`} onClick={() => setFiltroEstado("preparando")}>
            Preparando ({stats.preparando})
          </button>
          <button className={`filtro-btn ${filtroEstado === "en_transito" ? "active" : ""}`} onClick={() => setFiltroEstado("en_transito")}>
            En Tránsito ({stats.enTransito})
          </button>
        </div>
      </div>

      <div className="pedidos-container">
        <div className="section-header">
          <h2>Entregas para Gestionar</h2>
          <button onClick={cargarPedidos} className="btn-refresh">🔄 Actualizar</button>
        </div>

        {pedidosFiltrados.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No hay entregas pendientes</h3>
          </div>
        ) : (
          <div className="pedidos-grid">
            {pedidosFiltrados.map((pedido) => (
              <div key={pedido.id} className="pedido-card">
                <div className="pedido-header">
                  <div className="pedido-id">
                    <span className="label">Pedido</span>
                    <span className="value">#{pedido.id}</span>
                  </div>
                  <span className={`badge badge-${pedido.estado}`}>{pedido.estado}</span>
                </div>
                <div className="pedido-body">
                  <div className="info-row">
                    <span className="icon">👤</span>
                    <div className="info-content">
                      <span className="label">Cliente</span>
                      <span className="value">{pedido.cliente_nombre || "N/A"}</span>
                    </div>
                  </div>
                  <div className="info-row">
                    <span className="icon">🏪</span>
                    <div className="info-content">
                      <span className="label">Tienda</span>
                      <span className="value">{pedido.tienda_nombre || "N/A"}</span>
                    </div>
                  </div>
                  <div className="info-row">
                    <span className="icon">💰</span>
                    <div className="info-content">
                      <span className="label">Total</span>
                      <span className="value total">${Number(pedido.total).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="pedido-actions">
                  {pedido.estado === "preparando" && (
                    <button className="btn-action btn-transito" onClick={() => handleCambiarEstado(pedido.id, "en_transito")}>
                      🚚 Iniciar Envío
                    </button>
                  )}
                  {pedido.estado === "en_transito" && (
                    <button className="btn-action btn-entregado" onClick={() => handleCambiarEstado(pedido.id, "entregado")}>
                      ✓ Marcar Entregado
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
