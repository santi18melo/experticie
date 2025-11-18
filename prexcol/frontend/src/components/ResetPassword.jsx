// src/components/ResetPassword.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authservices";

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
    await resetPassword(uid, token, pass1);

    setMsg("✅ Contraseña restablecida correctamente. Redirigiendo...");

      // Redirigir al login después de 1.5s
    setTimeout(() => {
        navigate("/login");
    }, 1500);

    } catch (err) {
    setError(err?.error || "Error al restablecer contraseña");
    } finally {
    setLoading(false);
    }
};

return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
    <h2 className="text-xl font-bold mb-4">Restablecer contraseña</h2>

    <form onSubmit={handleReset} className="flex flex-col gap-3">
        <input
        type="password"
        placeholder="Nueva contraseña"
        value={pass1}
        onChange={(e) => setPass1(e.target.value)}
        required
        className="border p-2 rounded"
        />

        <input
        type="password"
        placeholder="Repetir contraseña"
        value={pass2}
        onChange={(e) => setPass2(e.target.value)}
        required
        className="border p-2 rounded"
        />

        <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-white p-2 rounded disabled:opacity-50"
        >
        {loading ? "Procesando..." : "Guardar nueva contraseña"}
        </button>
    </form>

      {/* mensaje de éxito */}
    {msg && <p className="text-green-600 mt-3">{msg}</p>}

      {/* mensaje de error */}
    {error && <p className="text-red-600 mt-3">{error}</p>}

      {/* Botón volver */}
    <button
        onClick={() => navigate("/login")}
        className="mt-4 text-blue-600 underline"
    >
        Volver al login
    </button>
    </div>
);
}
