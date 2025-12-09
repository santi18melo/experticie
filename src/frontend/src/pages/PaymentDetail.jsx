// src/pages/PaymentDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PaymentService from "../services/paymentService";

export default function PaymentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPaymentDetail();
  }, [id]);

  const loadPaymentDetail = async () => {
    try {
      setLoading(true);
      const data = await PaymentService.getPayment(id);
      setPayment(data);
    } catch (err) {
      console.error("Error loading payment detail:", err);
      setError("Error al cargar los detalles del pago");
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
        <div style={styles.loading}>Cargando detalles del pago...</div>
      </div>
    );
  }

  if (error || !payment) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>{error || "Pago no encontrado"}</div>
        <button onClick={() => navigate("/payments")} style={styles.backButton}>
          ← Volver al Historial
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Detalles del Pago #{payment.id}</h2>
          <button onClick={() => navigate("/payments")} style={styles.backButton}>
            ← Volver al Historial
          </button>
        </div>

        <div style={styles.detailsGrid}>
          <div style={styles.detailItem}>
            <span style={styles.label}>ID de Pago:</span>
            <span style={styles.value}>#{payment.id}</span>
          </div>

          <div style={styles.detailItem}>
            <span style={styles.label}>Pedido Asociado:</span>
            <span style={styles.value}>
              <button
                onClick={() => navigate(`/orders/${payment.pedido}`)}
                style={styles.linkButton}
              >
                Ver Pedido #{payment.pedido}
              </button>
            </span>
          </div>

          <div style={styles.detailItem}>
            <span style={styles.label}>Monto:</span>
            <span style={{...styles.value, fontSize: "24px", fontWeight: "700", color: "#28a745"}}>
              ${parseFloat(payment.monto).toFixed(2)}
            </span>
          </div>

          <div style={styles.detailItem}>
            <span style={styles.label}>Método de Pago:</span>
            <span style={styles.value}>{payment.metodo_nombre || "N/A"}</span>
          </div>

          <div style={styles.detailItem}>
            <span style={styles.label}>Estado:</span>
            <span
              style={{
                ...styles.statusBadge,
                backgroundColor: getStatusColor(payment.estado_nombre),
              }}
            >
              {payment.estado_nombre}
            </span>
          </div>

          <div style={styles.detailItem}>
            <span style={styles.label}>Fecha de Creación:</span>
            <span style={styles.value}>
              {new Date(payment.fecha_creacion).toLocaleString()}
            </span>
          </div>

          <div style={styles.detailItem}>
            <span style={styles.label}>Última Actualización:</span>
            <span style={styles.value}>
              {new Date(payment.fecha_actualizacion).toLocaleString()}
            </span>
          </div>
        </div>

        {payment.transacciones && payment.transacciones.length > 0 && (
          <div style={styles.transactionsSection}>
            <h3 style={styles.sectionTitle}>Transacciones</h3>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Referencia Externa</th>
                    <th style={styles.th}>Monto</th>
                    <th style={styles.th}>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {payment.transacciones.map((transaction) => (
                    <tr key={transaction.id} style={styles.tr}>
                      <td style={styles.td}>#{transaction.id}</td>
                      <td style={styles.td}>{transaction.referencia_externa || "N/A"}</td>
                      <td style={styles.td}>${parseFloat(transaction.monto).toFixed(2)}</td>
                      <td style={styles.td}>{transaction.estado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {payment.comprobante && (
          <div style={styles.receiptSection}>
            <h3 style={styles.sectionTitle}>Comprobante</h3>
            <a
              href={payment.comprobante}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.downloadButton}
            >
              📄 Descargar Comprobante
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "900px",
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
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  detailItem: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    color: "#666",
    fontWeight: "600",
  },
  value: {
    fontSize: "16px",
    color: "#333",
    fontWeight: "500",
  },
  statusBadge: {
    padding: "6px 16px",
    borderRadius: "12px",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
    display: "inline-block",
    width: "fit-content",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#007bff",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "16px",
    padding: 0,
  },
  transactionsSection: {
    marginTop: "30px",
    paddingTop: "30px",
    borderTop: "2px solid #f0f0f0",
  },
  sectionTitle: {
    fontSize: "20px",
    marginBottom: "20px",
    color: "#333",
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
  receiptSection: {
    marginTop: "30px",
    paddingTop: "30px",
    borderTop: "2px solid #f0f0f0",
  },
  downloadButton: {
    display: "inline-block",
    padding: "12px 24px",
    background: "#28a745",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
  },
};
