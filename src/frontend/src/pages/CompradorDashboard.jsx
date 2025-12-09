// frontend/src/pages/CompradorDashboard.jsx - PROFESSIONAL & COMPLETE
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getPedidosPendientes,
  cambiarEstadoPedido,
} from "../services/productosService";
import "../styles/CompradorDashboard.css";
import DashboardHeader from "../components/DashboardHeader";

export default function CompradorDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");

  // ==================== CARGAR PEDIDOS ====================
  const cargarPedidos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPedidosPendientes();
      const pedidosData = data.results || data;
      setPedidos(Array.isArray(pedidosData) ? pedidosData : []);
      setError("");
    } catch (err) {
      console.error("Error cargando pedidos:", err);
      setError("Error al cargar pedidos pendientes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarPedidos();
  }, [cargarPedidos]);

  // ==================== CAMBIAR ESTADO ====================
  const handleCambiarEstado = async (pedidoId, nuevoEstado) => {
    if (!window.confirm(`¿Cambiar pedido #${pedidoId} a estado "${nuevoEstado}"?`)) {
      return;
    }

    try {
      await cambiarEstadoPedido(pedidoId, nuevoEstado);
      setSuccess(`✓ Pedido #${pedidoId} actualizado a ${nuevoEstado}`);
      await cargarPedidos();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Error al cambiar estado del pedido");
      setTimeout(() => setError(""), 5000);
    }
  };

  // ==================== LOGOUT ====================
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ==================== FILTRAR PEDIDOS ====================
  const pedidosFiltrados = pedidos.filter((pedido) => {
    if (filtroEstado === "todos") return true;
    return pedido.estado === filtroEstado;
  });

  // ==================== ESTADÍSTICAS ====================
  const stats = {
    totalPedidos: pedidos.length,
    pendientes: pedidos.filter((p) => p.estado === "pendiente").length,
    preparando: pedidos.filter((p) => p.estado === "preparando").length,
  };

  if (loading && pedidos.length === 0) {
    return (
      <div className="comprador-dashboard">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="comprador-dashboard">
      <DashboardHeader title="📦 Panel de Comprador" />

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
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>{stats.totalPedidos}</h3>
            <p>Total Pedidos</p>
            <span className="stat-detail">En gestión</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>{stats.pendientes}</h3>
            <p>Pendientes</p>
            <span className="stat-detail">Por procesar</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚙️</div>
          <div className="stat-content">
            <h3>{stats.preparando}</h3>
            <p>Preparando</p>
            <span className="stat-detail">En proceso</span>
          </div>
        </div>
      </div>

      {/* FILTROS */}
      <div className="filtros-container">
        <div className="filtros">
          <button
            className={`filtro-btn ${filtroEstado === "todos" ? "active" : ""}`}
            onClick={() => setFiltroEstado("todos")}
          >
            Todos ({pedidos.length})
          </button>
          <button
            className={`filtro-btn ${filtroEstado === "pendiente" ? "active" : ""}`}
            onClick={() => setFiltroEstado("pendiente")}
          >
            Pendientes ({stats.pendientes})
          </button>
          <button
            className={`filtro-btn ${filtroEstado === "preparando" ? "active" : ""}`}
            onClick={() => setFiltroEstado("preparando")}
          >
            Preparando ({stats.preparando})
          </button>
        </div>
      </div>

      {/* LISTA DE PEDIDOS */}
      <div className="pedidos-container">
        <div className="section-header">
          <h2>Pedidos para Procesar</h2>
          <button onClick={cargarPedidos} className="btn-refresh">
            🔄 Actualizar
          </button>
        </div>

        {pedidosFiltrados.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No hay pedidos {filtroEstado !== "todos" ? filtroEstado : ""}</h3>
            <p>Los pedidos aparecerán aquí cuando estén disponibles</p>
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
                  <span className={`badge badge-${pedido.estado}`}>
                    {pedido.estado}
                  </span>
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

                  <div className="info-row">
                    <span className="icon">📅</span>
                    <div className="info-content">
                      <span className="label">Fecha</span>
                      <span className="value">
                        {new Date(pedido.fecha_creacion).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {pedido.notas && (
                    <div className="info-row">
                      <span className="icon">📝</span>
                      <div className="info-content">
                        <span className="label">Notas</span>
                        <span className="value">{pedido.notas}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pedido-actions">
                  {pedido.estado === "pendiente" && (
                    <button
                      className="btn-action btn-preparar"
                      onClick={() => handleCambiarEstado(pedido.id, "preparando")}
                    >
                      ⚙️ Iniciar Preparación
                    </button>
                  )}
                  {pedido.estado === "preparando" && (
                    <button
                      className="btn-action btn-listo"
                      onClick={() => handleCambiarEstado(pedido.id, "en_transito")}
                    >
                      ✓ Listo para Envío
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