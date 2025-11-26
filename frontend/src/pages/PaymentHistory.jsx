// src/pages/PaymentHistory.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaymentService from "../services/paymentService";

export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const data = await PaymentService.getPaymentHistory();
      setPayments(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error("Error loading payments:", err);
      setError("Error al cargar el historial de pagos");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (estado) => {
    const colors = {
      "Pendiente": "#ffc107",
      "Aprobado": "#28a745",
      "Rechazado": "#dc3545",
      "Cancelado": "#6c757d",
    };
    return colors[estado] || "#6c757d";
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Cargando historial de pagos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>{error}</div>
        <button onClick={loadPayments} style={styles.retryButton}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Historial de Pagos</h2>
          <button onClick={() => navigate("/orders")} style={styles.backButton}>
            ← Volver a Pedidos
          </button>
        </div>

        {payments.length === 0 ? (
          <div style={styles.emptyState}>
            <p>No tienes pagos registrados</p>
          </div>
        ) : (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Pedido</th>
                  <th style={styles.th}>Monto</th>
                  <th style={styles.th}>Método</th>
                  <th style={styles.th}>Estado</th>
                  <th style={styles.th}>Fecha</th>
                  <th style={styles.th}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} style={styles.tr}>
                    <td style={styles.td}>#{payment.id}</td>
                    <td style={styles.td}>Pedido #{payment.pedido}</td>
                    <td style={styles.td}>
                      <strong>${parseFloat(payment.monto).toFixed(2)}</strong>
                    </td>
                    <td style={styles.td}>{payment.metodo_nombre || "N/A"}</td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.statusBadge,
                          backgroundColor: getStatusColor(payment.estado_nombre),
                        }}
                      >
                        {payment.estado_nombre}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {new Date(payment.fecha_creacion).toLocaleDateString()}
                    </td>
                    <td style={styles.td}>
                      <button
                        onClick={() => navigate(`/payments/${payment.id}`)}
                        style={styles.detailButton}
                      >
                        Ver Detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
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
  title: {
    fontSize: "28px",
    color: "#333",
    margin: 0,
  },
  backButton: {
    padding: "10px 20px",
    background: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  loading: {
    textAlign: "center",
    padding: "40px",
    fontSize: "18px",
    color: "#666",
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
    borderRadius: "8px",
    cursor: "pointer",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#666",
    fontSize: "18px",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    padding: "12px",
    textAlign: "left",
    borderBottom: "2px solid #dee2e6",
    background: "#f8f9fa",
    fontWeight: "600",
    color: "#495057",
  },
  tr: {
    borderBottom: "1px solid #dee2e6",
  },
  td: {
    padding: "12px",
  },
  statusBadge: {
    padding: "4px 12px",
    borderRadius: "12px",
    color: "white",
    fontSize: "12px",
    fontWeight: "600",
    display: "inline-block",
  },
  detailButton: {
    padding: "6px 12px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },
};
