// src/components/ResetPassword.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { resetPassword } from "../services/authservices";

export default function ResetPassword() {
const { uid, token } = useParams();
const [password, setPassword] = useState("");
const [msg, setMsg] = useState("");
const [error, setError] = useState("");

const handleReset = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    try {
    await resetPassword(uid, token, password);
    setMsg("✅ Contraseña restablecida correctamente.");
    } catch (err) {
    setError(err.error || "Error al restablecer contraseña");
    }
};

return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
    <h2 className="text-xl font-bold mb-4">Restablecer contraseña</h2>

    <form onSubmit={handleReset} className="flex flex-col gap-3">
        <input
        type="password"
        placeholder="Nueva contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border p-2 rounded"
        />
        <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded"
        >
        Guardar nueva contraseña
        </button>
    </form>

    {msg && <p className="text-green-600 mt-3">{msg}</p>}
    {error && <p className="text-red-600 mt-3">{error}</p>}
    </div>
);
}
