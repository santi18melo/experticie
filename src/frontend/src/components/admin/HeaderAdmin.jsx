import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function HeaderAdmin({
title = "Panel Prexcol",
role = "Admin",
}) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

return (
    <header className="adm-header">

    <div className="adm-header-left">
        <button className="hamburger" aria-label="toggle sidebar">☰</button>
        <h1 className="adm-title">{title}</h1>
    </div>

    <div className="adm-header-right">
        <div className="adm-role">
        Rol: <strong>{role}</strong>
        </div>

        <button
        className="adm-logout"
        onClick={handleLogout}
        style={{
            padding: "10px 18px",
            background: "#d9534f",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: "bold",
        }}
        >
        🔒 Cerrar sesión
        </button>
    </div>

    </header>
);
}
