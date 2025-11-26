// frontend/src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!email || !password) {
      setLocalError("Por favor ingresa email y contraseña.");
      return;
    }

    try {
      const res = await login(email.trim(), password);
      if (res && res.ok) {
        const user = res.user || JSON.parse(localStorage.getItem("user") || "null");
        
        // Redirect based on user role
        if (user && user.rol) {
          switch(user.rol) {
            case 'admin':
              navigate("/admin");
              break;
            case 'cliente':
              navigate("/cliente");
              break;
            case 'comprador':
              navigate("/comprador");
              break;
            case 'proveedor':
              navigate("/proveedor");
              break;
            case 'logistica':
              navigate("/logistica");
              break;
            default:
              navigate("/dashboard");
          }
        } else {
          // Fallback to general dashboard
          navigate("/dashboard");
        }
      } else {
        setLocalError(res?.error || "Credenciales incorrectas o error de servidor.");
      }
    } catch (err) {
      console.error("Login unexpected error:", err);
      setLocalError("Error inesperado al iniciar sesión.");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2 style={{textAlign:'center', marginBottom:16}}>Iniciar sesión</h2>

      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: 8 }}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 6, boxSizing: "border-box" }}
            data-testid="login-email"
            required
          />
        </label>

        <label style={{ display: "block", marginBottom: 8 }}>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 6, boxSizing: "border-box" }}
            data-testid="login-password"
            required
          />
        </label>

        <div style={{ marginTop: 12 }}>
          <button
            type="submit"
            disabled={loading}
            data-testid="login-submit"
            style={{
              width: "100%",
              padding: 10,
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </div>

        <div style={{ marginTop: 12, minHeight: 20 }}>
          {localError && <div style={{ color: "crimson" }}>{localError}</div>}
          {!localError && error && <div style={{ color: "crimson" }}>{error}</div>}
        </div>

        <div style={{ marginTop: 12, textAlign: "center" }}>
          <a href="/register">¿No tienes cuenta? Regístrate</a> · <a href="/forgot-password">Olvidé mi contraseña</a>
        </div>
      </form>
    </div>
  );
}
