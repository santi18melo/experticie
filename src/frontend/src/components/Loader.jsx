// src/components/Loader.jsx
import React from "react";
import "../styles/Loader.css";

const Loader = React.memo(function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        {/* Núcleo central pulsante */}
        <div className="loader-core">
          <div className="core-inner"></div>
        </div>
        
        {/* Anillos orbitales rotando */}
        <div className="orbit orbit-1"></div>
        <div className="orbit orbit-2"></div>
        <div className="orbit orbit-3"></div>
        
        {/* Partículas flotantes */}
        <div className="particles">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}></div>
          ))}
        </div>
        
        {/* Efecto de luz */}
        <div className="glow-effect"></div>
        
        {/* Texto de carga */}
        <div className="loading-text">
          <span className="loading-letter">C</span>
          <span className="loading-letter">a</span>
          <span className="loading-letter">r</span>
          <span className="loading-letter">g</span>
          <span className="loading-letter">a</span>
          <span className="loading-letter">n</span>
          <span className="loading-letter">d</span>
          <span className="loading-letter">o</span>
          <span className="loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </div>
      </div>
    </div>
  );
});

export default Loader;
