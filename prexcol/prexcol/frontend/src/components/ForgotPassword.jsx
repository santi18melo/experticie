import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [startCountdown, setStartCountdown] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.requestPasswordReset(email);

      setMessage("Se ha enviado un enlace a tu correo.");
      setStartCountdown(true);

    } catch (error) {
      console.error("Error:", error);
      setMessage("Hubo un error. Inténtalo de nuevo.");
    }
  };

  // Barra de progreso profesional animada
  useEffect(() => {
    if (!startCountdown) return;

    let time = 0;
    const interval = setInterval(() => {
      time += 100;
      setProgress((time / 3000) * 100);

      if (time >= 3000) {
        clearInterval(interval);
        navigate("/login");
      }
    }, 100);

    return () => clearInterval(interval);
  }, [startCountdown, navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Recuperar contraseña</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            disabled={startCountdown}
          />

          <button type="submit" style={styles.button} disabled={startCountdown}>
            Enviar enlace
          </button>
        </form>

        {message && (
          <p style={{ ...styles.message, color: startCountdown ? "#4CAF50" : "red" }}>
            {message}
          </p>
        )}

        {/* Barra de Progreso Profesional */}
        {startCountdown && (
          <div style={styles.progressBarContainer}>
            <div
              style={{
                ...styles.progressBarFill,
                width: `${progress}%`,
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}

// ===================== ESTILOS PROFESIONALES =====================
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f3f4f7",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "30px",
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },

  title: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#333",
    textAlign: "center",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #d0d0d0",
    fontSize: "15px",
    outline: "none",
    transition: "0.2s",
  },

  button: {
    padding: "12px",
    background: "linear-gradient(135deg, #4CAF50, #2e7d32)",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(76,175,80,0.3)",
    transition: "0.3s",
  },

  message: {
    textAlign: "center",
    marginTop: "10px",
    fontWeight: "500",
  },

  progressBarContainer: {
    marginTop: "18px",
    width: "100%",
    height: "10px",
    background: "#e6e6e6",
    borderRadius: "50px",
    overflow: "hidden",
  },

  progressBarFill: {
    height: "100%",
    background: "linear-gradient(90deg, #4CAF50, #66bb6a)",
    borderRadius: "50px",
    transition: "width 0.1s linear",
    boxShadow: "0 4px 10px rgba(76,175,80,0.4)",
  },
};
