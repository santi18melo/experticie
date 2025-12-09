// frontend/src/pages/UnifiedDashboard.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getPedidosPendientes,
  getPedidosEnPreparacion,
  cambiarEstadoPedido,
} from "../services/productosService";
import { axiosInstance } from "../services/api";
import "../styles/CompradorDashboard.css"; // Reusing styles for now
import DashboardHeader from "../components/DashboardHeader";
import ModalDetallePedido from "../components/ModalDetallePedido";

export default function UnifiedDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  // Determine role for UI adjustments
  // Unified role: Logistica handles everything now
  const isLogistica = user?.rol === "logistica" || user?.rol === "admin";

  const [activeTab, setActiveTab] = useState("pendiente");
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedPedido, setSelectedPedido] = useState(null);

  // ==================== CARGAR PEDIDOS ====================
  const cargarPedidos = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      let data = [];
      // Fetch based on active tab
      if (activeTab === "pendiente") {
        const res = await getPedidosPendientes();
        data = res.results || res;
      } else if (activeTab === "preparando") {
        const res = await getPedidosEnPreparacion();
        data = res.results || res;
      } else if (activeTab === "en_transito") {
        const res = await axiosInstance.get("/productos/pedidos/");
        const allPedidos = res.data.results || res.data;
        data = allPedidos.filter(p => p.estado === "en_transito");
      } else if (activeTab === "entregado") {
         const res = await axiosInstance.get("/productos/pedidos/");
         const allPedidos = res.data.results || res.data;
         data = allPedidos.filter(p => p.estado === "entregado");
      }

      setPedidos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error cargando pedidos:", err);
      if (err.response?.status !== 403) {
          setError("Error al cargar pedidos. " + (err.response?.data?.detail || ""));
      } else {
          setPedidos([]); // Clear if no permission
      }
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

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

  // ==================== RENDER HELPERS ====================
  const renderActions = (pedido) => {
    if (pedido.estado === "pendiente" && isLogistica) {
      return (
        <button
          className="btn-action btn-preparar"
          onClick={() => handleCambiarEstado(pedido.id, "preparando")}
        >
          ⚙️ Iniciar Preparación
        </button>
      );
    }
    if (pedido.estado === "preparando" && isLogistica) {
      return (
        <button
          className="btn-action btn-listo"
          onClick={() => handleCambiarEstado(pedido.id, "en_transito")}
        >
          🚚 Iniciar Envío
        </button>
      );
    }
    if (pedido.estado === "en_transito" && isLogistica) {
      return (
        <button
          className="btn-action btn-entregado"
          onClick={() => handleCambiarEstado(pedido.id, "entregado")}
        >
          ✓ Marcar Entregado
        </button>
      );
    }
    return null;
  };

  return (
    <div className="comprador-dashboard"> {/* Reusing class for layout */}
      <DashboardHeader title="⚡ Centro de Operaciones" />

      {/* ALERTS */}
      {error && <div className="alert alert-error"><span>⚠️</span> {error}</div>}
      {success && <div className="alert alert-success"><span>✓</span> {success}</div>}

      {/* TABS */}
      <div className="tabs-container" style={{ marginTop: 20, padding: '0 40px' }}>
        <div className="tabs">
          {isLogistica && (
            <button
                className={`tab ${activeTab === "pendiente" ? "active" : ""}`}
                onClick={() => setActiveTab("pendiente")}
            >
                📋 Pendientes
            </button>
          )}
          <button
            className={`tab ${activeTab === "preparando" ? "active" : ""}`}
            onClick={() => setActiveTab("preparando")}
          >
            ⚙️ En Preparación
          </button>
          <button
            className={`tab ${activeTab === "en_transito" ? "active" : ""}`}
            onClick={() => setActiveTab("en_transito")}
          >
            🚚 En Tránsito
          </button>
          <button
            className={`tab ${activeTab === "entregado" ? "active" : ""}`}
            onClick={() => setActiveTab("entregado")}
          >
            ✅ Entregados
          </button>
        </div>
      </div>

      {/* LISTA DE PEDIDOS */}
      <div className="pedidos-container" style={{ marginTop: 20 }}>
        <div className="section-header">
            <h2>
                {activeTab === "pendiente" && "Pedidos Nuevos"}
                {activeTab === "preparando" && "Pedidos en Preparación"}
                {activeTab === "en_transito" && "Pedidos en Ruta"}
                {activeTab === "entregado" && "Historial de Entregas"}
            </h2>
            <button onClick={cargarPedidos} className="btn-refresh">
                🔄 Actualizar
            </button>
        </div>

        {loading ? (
             <div className="loading-container">
                <div className="spinner"></div>
                <p>Cargando...</p>
             </div>
        ) : pedidos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No hay pedidos en esta sección</h3>
          </div>
        ) : (
          <div className="pedidos-grid">
            {pedidos.map((pedido) => (
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
                  <button 
                    className="btn-action btn-detalle"
                    onClick={() => setSelectedPedido(pedido)}
                    style={{ background: '#64748b', color: 'white', marginRight: '8px' }}
                  >
                    👁️ Ver Detalle
                  </button>
                  {renderActions(pedido)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedPedido && (
        <ModalDetallePedido
          pedido={selectedPedido}
          onClose={() => setSelectedPedido(null)}
        />
      )}
    </div>
  );
}
