// src/pages/PaymentStatus.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PaymentStatus() {
  const { paymentId } = useParams();
  const navigate = useNavigate();
  
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPaymentStatus();
  }, [paymentId]);

  const loadPaymentStatus = async () => {
    try {
      // Simulated API call - replace with actual PaymentService
      setLoading(true);
      
      // Mock payment data
      const mockPayment = {
        id: paymentId || "1",
        orderId: "ORD-001",
        amount: 150000,
        status: "completed", // completed, pending, failed
        method: "Tarjeta de Crédito",
        transactionId: "TRX-" + Date.now(),
        date: new Date().toISOString(),
        details: {
          cardLast4: "4242",
          cardBrand: "Visa",
          email: "user@prexcol.com"
        }
      };

      setTimeout(() => {
        setPayment(mockPayment);
        setLoading(false);
      }, 1000);

    } catch (error) {
      console.error("Error loading payment:", error);
      setLoading(false);
    }
  };

  const getStatusConfig = () => {
    switch (payment?.status) {
      case "completed":
        return {
          icon: "✓",
          title: "Pago Completado",
          message: "Tu pago se ha procesado exitosamente",
          color: "#28a745",
          bgColor: "#d4edda"
        };
      case "pending":
        return {
          icon: "⏳",
          title: "Pago Pendiente",
          message: "Estamos procesando tu pago",
          color: "#ffc107",
          bgColor: "#fff3cd"
        };
      case "failed":
        return {
          icon: "✕",
          title: "Pago Fallido",
          message: "Hubo un problema con tu pago",
          color: "#dc3545",
          bgColor: "#f8d7da"
        };
      default:
        return {
          icon: "?",
          title: "Estado Desconocido",
          message: "No pudimos verificar el estado del pago",
          color: "#6c757d",
          bgColor: "#e2e3e5"
        };
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p>Verificando estado del pago...</p>
        </div>
      </div>
    );
  }

  if (!payment) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>
          <h2>Pago no encontrado</h2>
          <p>No pudimos encontrar información sobre este pago</p>
          <button onClick={() => navigate("/orders")} style={styles.button}>
            Ver Mis Pedidos
          </button>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Status Header */}
        <div style={{
          ...styles.statusHeader,
          backgroundColor: statusConfig.bgColor
        }}>
          <div style={{
            ...styles.statusIcon,
            color: statusConfig.color
          }}>
            {statusConfig.icon}
          </div>
          <h1 style={{
            ...styles.statusTitle,
            color: statusConfig.color
          }}>
            {statusConfig.title}
          </h1>
          <p style={styles.statusMessage}>{statusConfig.message}</p>
        </div>

        {/* Payment Details */}
        <div style={styles.details}>
          <h2 style={styles.detailsTitle}>Detalles del Pago</h2>
          
          <div style={styles.detailsGrid}>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>ID de Pago:</span>
              <span style={styles.detailValue}>{payment.id}</span>
            </div>
            
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>ID de Pedido:</span>
              <span style={styles.detailValue}>{payment.orderId}</span>
            </div>
            
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Monto:</span>
              <span style={styles.detailValue}>
                ${payment.amount.toLocaleString("es-CO")} COP
              </span>
            </div>
            
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Método de Pago:</span>
              <span style={styles.detailValue}>{payment.method}</span>
            </div>
            
            {payment.details?.cardLast4 && (
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Tarjeta:</span>
                <span style={styles.detailValue}>
                  {payment.details.cardBrand} **** {payment.details.cardLast4}
                </span>
              </div>
            )}
            
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>ID de Transacción:</span>
              <span style={styles.detailValue}>{payment.transactionId}</span>
            </div>
            
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Fecha:</span>
              <span style={styles.detailValue}>
                {new Date(payment.date).toLocaleString("es-CO")}
              </span>
            </div>
            
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Estado:</span>
              <span style={{
                ...styles.statusBadge,
                backgroundColor: statusConfig.bgColor,
                color: statusConfig.color
              }}>
                {payment.status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={styles.actions}>
          {payment.status === "completed" && (
            <>
              <button
                onClick={() => navigate("/orders")}
                style={styles.primaryButton}
              >
                Ver Mis Pedidos
              </button>
              <button
                onClick={() => navigate("/productos")}
                style={styles.secondaryButton}
              >
                Continuar Comprando
              </button>
            </>
          )}
          
          {payment.status === "pending" && (
            <button
              onClick={loadPaymentStatus}
              style={styles.primaryButton}
            >
              Actualizar Estado
            </button>
          )}
          
          {payment.status === "failed" && (
            <>
              <button
                onClick={() => navigate("/checkout")}
                style={styles.primaryButton}
              >
                Intentar de Nuevo
              </button>
              <button
                onClick={() => navigate("/cart")}
                style={styles.secondaryButton}
              >
                Volver al Carrito
              </button>
            </>
          )}
        </div>

        {/* Help */}
        <div style={styles.help}>
          <p style={styles.helpText}>
            ¿Tienes problemas con tu pago?{" "}
            <a href="mailto:soporte@prexcol.com" style={styles.helpLink}>
              Contacta con soporte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    minHeight: "80vh",
  },
  loading: {
    textAlign: "center",
    padding: "60px 20px",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid #f3f3f3",
    borderTop: "5px solid #28a745",
    borderRadius: "50%",
    margin: "0 auto 20px",
    animation: "spin 1s linear infinite",
  },
  error: {
    textAlign: "center",
    padding: "60px 20px",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  statusHeader: {
    padding: "40px 30px",
    textAlign: "center",
  },
  statusIcon: {
    fontSize: "64px",
    marginBottom: "15px",
  },
  statusTitle: {
    fontSize: "32px",
    marginBottom: "10px",
  },
  statusMessage: {
    fontSize: "16px",
    color: "#666",
  },
  details: {
    padding: "30px",
  },
  detailsTitle: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  detailItem: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  detailLabel: {
    fontSize: "14px",
    color: "#888",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: "16px",
    color: "#333",
    fontWeight: "600",
  },
  statusBadge: {
    display: "inline-block",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600",
  },
  actions: {
    padding: "0 30px 30px",
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },
  primaryButton: {
    flex: 1,
    minWidth: "200px",
    padding: "14px 28px",
    background: "linear-gradient(135deg, #28a745, #20c997)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  },
  secondaryButton: {
    flex: 1,
    minWidth: "200px",
    padding: "14px 28px",
    background: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
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
  help: {
    padding: "20px 30px",
    borderTop: "1px solid #e0e0e0",
    textAlign: "center",
  },
  helpText: {
    fontSize: "14px",
    color: "#666",
  },
  helpLink: {
    color: "#28a745",
    textDecoration: "none",
    fontWeight: "600",
  },
};
