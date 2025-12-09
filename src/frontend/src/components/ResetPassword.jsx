// src/components/ResetPassword.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ResetPassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    if (pass1 !== pass2) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);
      await api.resetPassword(uid, token, pass1);

      setMsg("✅ Contraseña restablecida. Redirigiendo...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err?.error || "Error al restablecer contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="
        w-full max-w-md p-8 rounded-2xl shadow-xl
        bg-white/10 backdrop-blur-xl border border-white/20
        animate-fadeIn
      ">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Restablecer contraseña
        </h2>

        <form onSubmit={handleReset} className="flex flex-col gap-4">
          
          <div className="flex flex-col">
            <label className="text-white text-sm mb-1">Nueva contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={pass1}
              onChange={(e) => setPass1(e.target.value)}
              required
              className="
                w-full p-3 rounded-lg bg-white/20 text-white 
                focus:outline-none focus:ring-2 focus:ring-green-400
                placeholder-gray-300
              "
            />
          </div>

          <div className="flex flex-col">
            <label className="text-white text-sm mb-1">Repetir contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={pass2}
              onChange={(e) => setPass2(e.target.value)}
              required
              className="
                w-full p-3 rounded-lg bg-white/20 text-white 
                focus:outline-none focus:ring-2 focus:ring-green-400
                placeholder-gray-300
              "
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              bg-green-500 hover:bg-green-600 transition-all
              text-white font-semibold py-3 rounded-lg shadow-lg
              disabled:opacity-40 disabled:cursor-not-allowed
            "
          >
            {loading ? "Procesando..." : "Guardar nueva contraseña"}
          </button>

        </form>

        {/* mensaje de éxito */}
        {msg && (
          <p className="text-green-400 text-center mt-4 text-sm animate-pulse">
            {msg}
          </p>
        )}

        {/* mensaje de error */}
        {error && (
          <p className="text-red-400 text-center mt-4 text-sm">
            {error}
          </p>
        )}

        {/* Botón volver */}
        <button
          onClick={() => navigate("/login")}
          className="
            block mx-auto mt-6 text-blue-300 hover:text-blue-400 text-sm
            transition-all underline
          "
        >
          Volver al login
        </button>
      </div>
    </div>
  );
}
