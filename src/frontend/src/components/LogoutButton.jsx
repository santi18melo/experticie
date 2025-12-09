// src/components/LogoutButton.jsx
import React from "react";
import { useAuth } from "../hooks/useAuth";

export default function LogoutButton() {
const { logout } = useAuth();

return (
    <button
    onClick={logout}
    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
    >
    Cerrar sesión
    </button>
);
}
