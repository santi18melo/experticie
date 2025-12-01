// frontend/src/components/FloatingGuidePanel.jsx - Mini Panel Flotante de Guía
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FloatingGuidePanel.css";

export default function FloatingGuidePanel({ 
  currentGuide, 
  currentStep, 
  totalSteps,
  currentStepData,
  completedSteps,
  onNext,
  onPrevious,
  onExecute,
  onMinimize,
  onClose,
  isMinimized
}) {
  const navigate = useNavigate();
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const isLastStep = currentStep === totalSteps - 1;
  const isCompleted = completedSteps.includes(currentStep);

  if (!currentStepData) return null;

  if (isMinimized) {
    return (
      <div className="floating-guide-minimized" onClick={onMinimize}>
        <div className="minimized-icon">{currentStepData.icon}</div>
        <div className="minimized-text">
          Paso {currentStep + 1}/{totalSteps}
        </div>
        <div className="minimized-expand">▲</div>
      </div>
    );
  }

  return (
    <div className="floating-guide-panel">
      {/* Header Compacto */}
      <div className="floating-guide-header">
        <div className="guide-mini-title">
          <span className="guide-icon">{currentGuide.icon || "📚"}</span>
          <span className="guide-name">{currentGuide.title}</span>
        </div>
        <div className="guide-controls">
          <button className="control-btn minimize" onClick={onMinimize} title="Minimizar">
            ▼
          </button>
          <button className="control-btn close" onClick={onClose} title="Cerrar guía">
            ×
          </button>
        </div>
      </div>

      {/* Progreso */}
      <div className="floating-guide-progress">
        <div className="progress-bar-mini">
          <div className="progress-fill-mini" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="progress-text-mini">
          Paso {currentStep + 1} de {totalSteps} ({Math.round(progress)}%)
        </div>
      </div>

      {/* Paso Actual */}
      <div className="floating-guide-step">
        <div className="step-header-mini">
          <span className="step-icon-mini">{currentStepData.icon}</span>
          <h4>{currentStepData.title}</h4>
        </div>
        
        <p className="step-description-mini">{currentStepData.description}</p>

        {/* Comentario Interactivo */}
        {currentStepData.comment && (
          <div className={`step-comment-mini ${isCompleted ? 'completed' : 'active'}`}>
            <span className="comment-icon-mini">
              {isCompleted ? '✅' : '💬'}
            </span>
            <span className="comment-text-mini">
              {isCompleted ? currentStepData.completionComment : currentStepData.comment}
            </span>
          </div>
        )}

        {/* Botón de Acción */}
        {!isCompleted && (
          <button 
            className="execute-btn-mini"
            onClick={onExecute}
          >
            {currentStepData.action.icon} {currentStepData.action.label}
          </button>
        )}

        {isCompleted && (
          <div className="completed-badge-mini">
            ✓ Paso Completado
          </div>
        )}
      </div>

      {/* Navegación */}
      <div className="floating-guide-navigation">
        <button 
          className="nav-btn-mini prev"
          onClick={onPrevious}
          disabled={currentStep === 0}
        >
          ← Anterior
        </button>

        {isLastStep ? (
          <button 
            className="nav-btn-mini finish"
            onClick={onClose}
          >
            ✓ Finalizar
          </button>
        ) : (
          <button 
            className="nav-btn-mini next"
            onClick={onNext}
          >
            Siguiente →
          </button>
        )}
      </div>

      {/* Indicadores de Pasos */}
      <div className="step-indicators-mini">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`indicator-dot ${i === currentStep ? 'active' : ''} ${completedSteps.includes(i) ? 'completed' : ''}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
