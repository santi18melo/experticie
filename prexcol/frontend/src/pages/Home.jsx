// src/components/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
const navigate = useNavigate();

return (
    <div style={styles.container}>
    <div style={styles.card}>
        <h1 style={styles.title}>Bienvenido a PREXCOL</h1>

        <p style={styles.subtitle}>
        Plataforma centralizada de gestión y procesos empresariales.
        </p>

        <button
        onClick={() => navigate("/login")}
        style={styles.buttonPrimary}
        >
        Iniciar sesión
        </button>

        <p style={styles.registerText}>
        ¿No tienes cuenta?{" "}
        <a href="/register" style={styles.linkInline}>Regístrate</a>
        </p>
    </div>
    </div>
);
}

// ===================== ESTILOS PROFESIONALES =====================

const styles = {
container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f3f4f7",
    padding: "20px",
},

card: {
    width: "100%",
    maxWidth: "440px",
    padding: "35px",
    background: "#fff",
    borderRadius: "14px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
},

title: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "12px",
},

subtitle: {
    fontSize: "15px",
    color: "#555",
    marginBottom: "25px",
},

buttonPrimary: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    background: "linear-gradient(135deg, #4CAF50, #2e7d32)",
    boxShadow: "0 4px 12px rgba(76,175,80,0.25)",
    transition: "0.3s",
},

registerText: {
    marginTop: "25px",
    fontSize: "14px",
    color: "#444",
},

linkInline: {
    color: "#2e7d32",
    fontWeight: "600",
    textDecoration: "none",
},
};
