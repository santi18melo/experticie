import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formValues, setFormValues] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    direccion: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = React.useCallback(async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccess("");

    try {
      await api.register(formValues);
      setSuccess("Registro exitoso. Redirigiendo...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      // Error logged to monitoring service (TODO: implement Sentry)

      const backendError =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Ocurrió un error en el registro.";

      setErrorMsg(backendError);
    }
  }, [formValues, navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Crear una cuenta</h2>

        {errorMsg && <p style={styles.error}>{errorMsg}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Nombre completo"
            value={formValues.nombre}
            onChange={(e) =>
              setFormValues({ ...formValues, nombre: e.target.value })
            }
            required
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            value={formValues.email}
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={formValues.password}
            onChange={(e) =>
              setFormValues({ ...formValues, password: e.target.value })
            }
            required
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Teléfono"
            value={formValues.telefono}
            onChange={(e) =>
              setFormValues({ ...formValues, telefono: e.target.value })
            }
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Dirección"
            value={formValues.direccion}
            onChange={(e) =>
              setFormValues({ ...formValues, direccion: e.target.value })
            }
            style={styles.input}
          />

          <button type="submit" style={styles.buttonPrimary}>
            Registrar
          </button>
        </form>

        <p style={styles.loginText}>
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" style={styles.linkInline}>
            Iniciar sesión
          </a>
        </p>

        <button onClick={() => navigate("/")} style={styles.homeButton}>
          Volver al Inicio
        </button>
      </div>
    </div>
  );
}

// ========================================================
//                      ESTILOS PROFESIONALES
// ========================================================

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
    maxWidth: "460px",
    padding: "35px",
    background: "#fff",
    borderRadius: "14px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },

  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },

  buttonPrimary: {
    marginTop: "10px",
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

  loginText: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#444",
  },

  linkInline: {
    color: "#2e7d32",
    fontWeight: "600",
    textDecoration: "none",
  },

  homeButton: {
    marginTop: "20px",
    padding: "10px 15px",
    backgroundColor: "#555",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    fontWeight: "600",
  },

  error: {
    color: "red",
    marginBottom: "10px",
  },

  success: {
    color: "green",
    marginBottom: "10px",
  },
};
