import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Helper function for API calls - could be moved to a separate service file for larger applications
const sendPasswordResetEmail = async (email) => {
  const response = await fetch("http://localhost:8000/api/auth/forgot-password/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: "No se pudo parsear la respuesta del servidor." }));
    throw new Error(errorData.detail || "Error en la API");
  }

  return response.json();
};

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [startCountdown, setStartCountdown] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const data = await sendPasswordResetEmail(email);
      setMessage(data.message);
      setStartCountdown(true);
    } catch (error) {
      console.error("Error:", error.message);
      setMessage(error.message || "Hubo un error. Inténtalo de nuevo.");
    }
  }, [email]); // Recreate handleSubmit only if email changes

  // Animación barra de progreso
  useEffect(() => {
    if (!startCountdown) return;

    let time = 0;
    // Define countdown duration as a constant for easier modification
    const COUNTDOWN_DURATION = 3000; // milliseconds
    const INTERVAL_STEP = 100; // milliseconds

    const interval = setInterval(() => {
      time += INTERVAL_STEP;
      setProgress((time / COUNTDOWN_DURATION) * 100);

      if (time >= COUNTDOWN_DURATION) {
        clearInterval(interval);
        navigate("/login");
      }
    }, INTERVAL_STEP);

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

        {startCountdown && (
          <div style={styles.progressBarContainer}>
            <div
              style={{
                ...styles.progressBarFill,
                width: `${progress}%`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: "400px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px",
    backgroundColor: "#4CAF50",
    border: "none",
    color: "white",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    marginTop: "15px",
    fontSize: "14px",
  },
  progressBarContainer: {
    marginTop: "20px",
    width: "100%",
    height: "8px",
    backgroundColor: "#ddd",
    borderRadius: "4px",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    transition: "width 0.1s linear",
  },
};
