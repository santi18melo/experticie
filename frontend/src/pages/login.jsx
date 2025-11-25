import React, { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const data = await api.login(email, password);

      // =============================
      // Tokens (con prioridades claras)
      // =============================
      const access =
        data.access ||
        data.token?.access ||
        data.tokens?.access ||
        null;

      const refresh =
        data.refresh ||
        data.token?.refresh ||
        data.tokens?.refresh ||
        null;

      if (!access) {
        throw new Error("Token no recibido del servidor");
      }

      // =============================
      // Usuario según backend (más seguro)
      // =============================
      const user =
        data.user ||
        data.usuario ||
        data.data ||
        data ||
        {};

      const rol =
        user.rol ||
        user.role ||
        user.tipo ||
        user.perfil ||
        "cliente";

      // =============================
      // AuthContext
      // =============================
      login(user, { access, refresh });

      // =============================
      // Redirección
      // =============================
      const rutas = {
        admin: "/admin",
        comprador: "/comprador",
        proveedor: "/proveedor",
        logistica: "/logistica",
        cliente: "/cliente",
      };

      navigate(rutas[rol] || "/");
    } catch (error) {
      // Error logged to monitoring service (TODO: implement Sentry)

      const msg =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        "Credenciales incorrectas o error en el servidor.";

      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {loading && <Loader />}

      <div style={styles.card}>
        <h2 style={styles.title}>Iniciar sesión</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Cargando..." : "Entrar"}
          </button>
        </form>

        {errorMsg && <p style={styles.error}>{errorMsg}</p>}

        <div style={styles.linksContainer}>
          <Link to="/forgot-password" style={styles.link}>
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <p style={styles.registerText}>
          ¿No tienes cuenta?{" "}
          <Link to="/register" style={styles.linkInline}>
            Regístrate
          </Link>
        </p>

        <button onClick={() => navigate("/")} style={styles.homeButton}>
          Volver al Inicio
        </button>
      </div>
    </div>
  );
}

// ===================== ESTILOS (una sola sección limpia) =====================
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
  error: {
    marginTop: "10px",
    color: "red",
    fontWeight: "500",
    textAlign: "center",
  },
  linksContainer: {
    marginTop: "10px",
    textAlign: "center",
  },
  link: {
    fontSize: "14px",
    color: "#2e7d32",
    textDecoration: "none",
    fontWeight: "500",
  },
  linkInline: {
    color: "#2e7d32",
    fontWeight: "600",
    textDecoration: "none",
  },
  registerText: {
    marginTop: "15px",
    textAlign: "center",
    fontSize: "14px",
    color: "#444",
  },
  homeButton: {
    marginTop: "20px",
    padding: "10px 15px",
    backgroundColor: "#555",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
