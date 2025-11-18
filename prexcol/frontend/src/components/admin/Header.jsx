// src/components/Header.jsx
import React from "react";

export default function HeaderAdmin({ title = 'Panel Prexcol', role = 'Admin', onLogout }) {
return (
<header className="adm-header">
<div className="adm-header-left">
<button className="hamburger" aria-label="toggle sidebar">☰</button>
<h1 className="adm-title">{title}</h1>
</div>


<div className="adm-header-right">
<div className="adm-role">Rol: <strong>{role}</strong></div>
<button className="adm-logout" onClick={onLogout}>🔐 Cerrar sesión</button>
</div>
</header>
);
}