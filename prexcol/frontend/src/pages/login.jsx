import React, { useState } from "react";
import { login } from "../services/authservices";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llamada a la API de login
      const data = await login(email, password);

      // Redirige según el rol del usuario
      switch (data.role) {
        case "admin":
          navigate("/admin");
          break;
        case "comprador":
          navigate("/comprador");
          break;
        case "proveedor":
          navigate("/proveedor");
          break;
        case "logistica":
          navigate("/logistica");
          break;
        case "cliente":
          navigate("/cliente");
          break;
        default:
          navigate("/"); // fallback
      }
    } catch (error) {
      console.error("Error en el login:", error);
      alert("Error en el inicio de sesión. Verifica tus credenciales.");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      <p>
        ¿No tienes cuenta? <a href="/register">Regístrate</a>
      </p>
    </div>
  );
}
