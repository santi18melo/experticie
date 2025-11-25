// src/pages/OrderHistory.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrderService from "../services/orderService";
import Loader from "../components/Loader";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await OrderService.getOrderHistory();
      setOrders(data);
    } catch (err) {
      console.error("Error loading orders:", err);
      setError("Error al cargar el historial de pedidos");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (orderId) => {
    try {
      const orderDetails = await OrderService.getOrder(orderId);
      setSelectedOrder(orderDetails);
    } catch (err) {
      console.error("Error loading order details:", err);
      alert("Error al cargar los detalles del pedido");
    }
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const getStatusColor = (status) => {
    const colors = {
      pendiente: "#ffc107",
      confirmado: "#17a2b8",
      en_preparacion: "#007bff",
      en_camino: "#6610f2",
      entregado: "#28a745",
      cancelado: "#dc3545",
    };
    return colors[status] || "#6c757d";
  };

  const getStatusText = (status) => {
    const texts = {
      pendiente: "Pendiente",
      confirmado: "Confirmado",
      en_preparacion: "En Preparación",
      en_camino: "En Camino",
      entregado: "Entregado",
      cancelado: "Cancelado",
    };
    return texts[status] || status;
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>{error}</div>
        <button onClick={loadOrders} style={styles.retryButton}>
          Reintentar
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.emptyState}>
          <h2>No tienes pedidos</h2>
          <p>Aún no has realizado ningún pedido</p>
          <button onClick={() => navigate("/productos")} style={styles.button}>
            Ver Productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2>Historial de Pedidos</h2>
          <button onClick={loadOrders} style={styles.refreshButton}>
            🔄 Actualizar
          </button>
        </div>

        <div style={styles.ordersList}>
          {orders.map((order) => (
            <div key={order.id} style={styles.orderItem}>
              <div style={styles.orderHeader}>
                <div>
                  <strong>Pedido #{order.id}</strong>
                  <p style={styles.orderDate}>
                    {new Date(order.fecha_creacion).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div
                  style={{
                    ...styles.statusBadge,
                    background: getStatusColor(order.estado),
                  }}
                >
                  {getStatusText(order.estado)}
                </div>
              </div>

              <div style={styles.orderInfo}>
                <p>
                  <strong>Total:</strong> ${parseFloat(order.total || 0).toFixed(2)}
                </p>
                {order.notas && (
                  <p>
                    <strong>Notas:</strong> {order.notas}
                  </p>
                )}
              </div>

              <button
                onClick={() => handleViewDetails(order.id)}
                style={styles.detailsButton}
              >
                Ver Detalles
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Order Details */}
      {selectedOrder && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3>Detalles del Pedido #{selectedOrder.id}</h3>
              <button onClick={closeModal} style={styles.closeButton}>
                ✕
              </button>
            </div>

            <div style={styles.modalContent}>
              <div style={styles.detailRow}>
                <strong>Estado:</strong>
                <span
                  style={{
                    ...styles.statusBadge,
                    background: getStatusColor(selectedOrder.estado),
                  }}
                >
                  {getStatusText(selectedOrder.estado)}
                </span>
              </div>

              <div style={styles.detailRow}>
                <strong>Fecha:</strong>
                <span>
                  {new Date(selectedOrder.fecha_creacion).toLocaleString("es-ES")}
                </span>
              </div>

              {selectedOrder.tienda && (
                <div style={styles.detailRow}>
                  <strong>Tienda:</strong>
                  <span>{selectedOrder.tienda.nombre}</span>
                </div>
              )}

              {selectedOrder.detalles && selectedOrder.detalles.length > 0 && (
                <>
                  <h4 style={styles.sectionTitle}>Productos:</h4>
                  <div style={styles.productsList}>
                    {selectedOrder.detalles.map((detalle, index) => (
                      <div key={index} style={styles.productItem}>
                        <span>{detalle.producto?.nombre || "Producto"}</span>
                        <span>x{detalle.cantidad}</span>
                        <span>${parseFloat(detalle.precio_unitario).toFixed(2)}</span>
                        <strong>
                          ${parseFloat(detalle.subtotal || 0).toFixed(2)}
                        </strong>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {selectedOrder.notas && (
                <div style={styles.detailRow}>
                  <strong>Notas:</strong>
                  <span>{selectedOrder.notas}</span>
                </div>
              )}

              <div style={styles.totalSection}>
                <strong>Total:</strong>
                <strong style={styles.totalAmount}>
                  ${parseFloat(selectedOrder.total || 0).toFixed(2)}
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "30px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    borderBottom: "2px solid #f0f0f0",
    paddingBottom: "15px",
  },
  refreshButton: {
    padding: "8px 16px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  ordersList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  orderItem: {
    padding: "20px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    background: "#f8f9fa",
  },
  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "15px",
  },
  orderDate: {
    color: "#666",
    fontSize: "14px",
    margin: "5px 0 0 0",
  },
  statusBadge: {
    padding: "6px 12px",
    borderRadius: "20px",
    color: "white",
    fontSize: "13px",
    fontWeight: "600",
  },
  orderInfo: {
    marginBottom: "15px",
  },
  detailsButton: {
    padding: "8px 16px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
  },
  button: {
    marginTop: "20px",
    padding: "12px 24px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    padding: "20px",
    background: "#f8d7da",
    color: "#721c24",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  retryButton: {
    padding: "10px 20px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "white",
    borderRadius: "12px",
    padding: "30px",
    maxWidth: "600px",
    width: "90%",
    maxHeight: "80vh",
    overflow: "auto",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "2px solid #f0f0f0",
    paddingBottom: "15px",
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#666",
  },
  modalContent: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #e0e0e0",
  },
  sectionTitle: {
    marginTop: "20px",
    marginBottom: "10px",
    fontSize: "18px",
  },
  productsList: {
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "15px",
  },
  productItem: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: "10px",
    padding: "10px 0",
    borderBottom: "1px solid #f0f0f0",
  },
  totalSection: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 0 10px",
    borderTop: "2px solid #333",
    fontSize: "20px",
  },
  totalAmount: {
    color: "#28a745",
  },
};
