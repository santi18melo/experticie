// src/components/usuarios/Loader.jsx
import React from "react";
import "../styles/Loader.css";

const Loader = React.memo(function Loader() {
return (
    <div className="loader-overlay">
    <div className="loader-spinner"></div>
    </div>
);
});

export default Loader;
