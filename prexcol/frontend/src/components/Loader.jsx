// src/components/usuarios/Loader.jsx
import React from "react";
import "./Loader.css"; // estilos separados, sin insertRule

export default function Loader() {
return (
    <div className="loader-overlay">
    <div className="loader-spinner"></div>
    </div>
);
}
