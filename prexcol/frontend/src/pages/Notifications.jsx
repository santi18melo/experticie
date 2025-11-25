// src/pages/Notifications.jsx
import React, { useState, useEffect } from "react";
import NotificationService from "../services/notificationService";
import Loader from "../components/Loader";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // all, unread, read

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await NotificationService.getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error("Error loading notifications:", err);
      setError("Error al cargar las notificaciones");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await NotificationService.markAsRead(notificationId);
      // Update local state
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notificationId ? { ...notif, leida: true } : notif
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
      alert("Error al marcar la notificación como leída");
    }
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.leida;
    if (filter === "read") return notif.leida;
    return true; // all
  });

  const unreadCount = notifications.filter((n) => !n.leida).length;

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>{error}</div>
        <button onClick={loadNotifications} style={styles.retryButton}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2>
            Notificaciones
            {unreadCount > 0 && (
              <span style={styles.badge}>{unreadCount} nuevas</span>
            )}
          </h2>
          <button onClick={loadNotifications} style={styles.refreshButton}>
            🔄 Actualizar
          </button>
        </div>

        <div style={styles.filters}>
          <button
            onClick={() => setFilter("all")}
            style={filter === "all" ? styles.filterActive : styles.filterButton}
          >
            Todas ({notifications.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            style={filter === "unread" ? styles.filterActive : styles.filterButton}
          >
            No leídas ({unreadCount})
          </button>
          <button
            onClick={() => setFilter("read")}
            style={filter === "read" ? styles.filterActive : styles.filterButton}
          >
            Leídas ({notifications.length - unreadCount})
          </button>
        </div>

        {filteredNotifications.length === 0 ? (
          <div style={styles.emptyState}>
            <p>No hay notificaciones para mostrar</p>
          </div>
        ) : (
          <div style={styles.notificationsList}>
            {filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                style={
                  notif.leida ? styles.notificationRead : styles.notificationUnread
                }
              >
                <div style={styles.notificationHeader}>
                  <div style={styles.notificationTitle}>
                    {!notif.leida && <span style={styles.unreadDot}>●</span>}
                    <strong>{notif.tipo?.nombre || "Notificación"}</strong>
                  </div>
                  <div style={styles.notificationDate}>
                    {new Date(notif.fecha_creacion).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>

                <p style={styles.notificationMessage}>{notif.mensaje}</p>

                {notif.destino && (
                  <p style={styles.notificationDestination}>
                    Enviado a: {notif.destino}
                  </p>
                )}

                {!notif.leida && (
                  <button
                    onClick={() => handleMarkAsRead(notif.id)}
                    style={styles.markReadButton}
                  >
                    Marcar como leída
                  </button>
                )}

                {notif.fecha_lectura && (
                  <p style={styles.readDate}>
                    Leída el{" "}
                    {new Date(notif.fecha_lectura).toLocaleDateString("es-ES")}
                  </p>
                )}
              </div>
            ))}
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
    marginBottom: "20px",
    borderBottom: "2px solid #f0f0f0",
    paddingBottom: "15px",
  },
  badge: {
    marginLeft: "10px",
    padding: "4px 12px",
    background: "#dc3545",
    color: "white",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "normal",
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
  filters: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  filterButton: {
    padding: "8px 16px",
    background: "#f8f9fa",
    border: "1px solid #ddd",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s",
  },
  filterActive: {
    padding: "8px 16px",
    background: "#007bff",
    color: "white",
    border: "1px solid #007bff",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },
  notificationsList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  notificationUnread: {
    padding: "20px",
    border: "2px solid #007bff",
    borderRadius: "8px",
    background: "#f0f8ff",
    transition: "all 0.2s",
  },
  notificationRead: {
    padding: "20px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    background: "#fff",
    opacity: 0.8,
  },
  notificationHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "10px",
  },
  notificationTitle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "16px",
  },
  unreadDot: {
    color: "#007bff",
    fontSize: "20px",
  },
  notificationDate: {
    fontSize: "13px",
    color: "#666",
  },
  notificationMessage: {
    marginBottom: "10px",
    color: "#333",
    lineHeight: "1.5",
  },
  notificationDestination: {
    fontSize: "13px",
    color: "#666",
    fontStyle: "italic",
    marginBottom: "10px",
  },
  markReadButton: {
    padding: "6px 12px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
    marginTop: "10px",
  },
  readDate: {
    fontSize: "12px",
    color: "#999",
    marginTop: "10px",
  },
  emptyState: {
    textAlign: "center",
    padding: "40px 20px",
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
    borderRadius: "6px",
    cursor: "pointer",
  },
};
