// frontend/src/components/GlobalFloatingGuide.jsx - Panel Flotante Global
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGuide } from "../context/GuideContext";
import "../styles/FloatingGuidePanel.css";

// Definición de guías (mismo contenido que InteractiveGuide)
const GUIDES_DATA = {
  getting_started: {
    title: "🚀 Primeros Pasos en PREXCOL",
    icon: "🚀",
    totalSteps: 5,
    steps: [
      {
        id: 1,
        title: "Completa tu Perfil",
        description: "Primero, vamos a configurar tu información personal",
        icon: "👤",
        comment: "📍 Vamos a configurar tu perfil personal...",
        completionComment: "✅ ¡Perfecto! Tu perfil está listo",
        action: { type: "navigate", label: "Ejecutar: Ir a Mi Perfil", path: "/profile", icon: "→" }
      },
      {
        id: 2,
        title: "Explora el Dashboard",
        description: "Conoce tu panel de control principal",
        icon: "📊",
        comment: "📊 Ahora exploraremos tu panel de control...",
        completionComment: "✅ ¡Excelente! Ya conoces el dashboard",
        action: { type: "navigate", label: "Ejecutar: Ir al Dashboard", path: "/dashboard", icon: "→" }
      },
      {
        id: 3,
        title: "Busca Productos",
        description: "Aprende a encontrar lo que necesitas",
        icon: "🔍",
        comment: "🔍 Es momento de explorar nuestro catálogo...",
        completionComment: "✅ ¡Genial! Ya sabes buscar productos",
        action: { type: "navigate", label: "Ejecutar: Ver Catálogo", path: "/productos", icon: "→" }
      },
      {
        id: 4,
        title: "Haz tu Primer Pedido",
        description: "Proceso completo de compra",
        icon: "🛒",
        comment: "🛒 Hagamos tu primera compra juntos...",
        completionComment: "✅ ¡Increíble! Ya sabes cómo comprar",
        action: { type: "navigate", label: "Ejecutar: Ir a Productos", path: "/productos", icon: "→" }
      },
      {
        id: 5,
        title: "Configura Notificaciones",
        description: "Mantente informado de todo",
        icon: "🔔",
        comment: "🔔 Finalmente, personalicemos tus notificaciones...",
        completionComment: "✅ ¡Perfecto! Todo configurado correctamente",
        action: { type: "navigate", label: "Ejecutar: Ir a Configuración", path: "/settings", icon: "→" }
      }
    ]
  },
  navigation: {
    title: "🗺️ Domina la Navegación",
    icon: "🗺️",
    totalSteps: 2,
    steps: [
      {
        id: 1,
        title: "Menú Principal",
        icon: "📋",
        comment: "📋 Conozcamos el menú principal...",
        completionComment: "✅ ¡Bien! Ya conoces el menú",
        action: { type: "navigate", label: "Ejecutar: Ver Dashboard", path: "/dashboard", icon: "→" }
      },
      {
        id: 2,
        title: "Búsqueda Rápida",
        icon: "⚡",
        comment: "⚡ Aprendamos los atajos de teclado...",
        completionComment: "✅ ¡Genial! Ahora eres más rápido",
        action: { type: "info", label: "Entendido", icon: "✓" }
      }
    ]
  },
  products: {
    title: "🛍️ Maestro de Productos",
    icon: "🛍️",
    totalSteps: 2,
    steps: [
      {
        id: 1,
        title: "Búsqueda Avanzada",
        icon: "🔎",
        comment: "🔎 Aprendamos técnicas de búsqueda avanzada...",
        completionComment: "✅ ¡Genial! Ahora buscas como un pro",
        action: { type: "navigate", label: "Ejecutar: Probar Búsqueda", path: "/productos", icon: "→" }
      },
      {
        id: 2,
        title: "Carrito de Compras",
        icon: "🛒",
        comment: "🛒 Aprendamos a usar el carrito...",
        completionComment: "✅ ¡Excelente! Dominas el carrito",
        action: { type: "navigate", label: "Ejecutar: Ver Mi Carrito", path: "/cart", icon: "→" }
      }
    ]
  },
  orders: {
    title: "📦 Gestión de Pedidos",
    icon: "📦",
    totalSteps: 2,
    steps: [
      {
        id: 1,
        title: "Ver Tus Pedidos",
        icon: "📋",
        comment: "📋 Veamos cómo gestionar tus pedidos...",
        completionComment: "✅ ¡Bien! Ya sabes ver tus pedidos",
        action: { type: "navigate", label: "Ejecutar: Ver Mis Pedidos", path: "/orders", icon: "→" }
      },
      {
        id: 2,
        title: "Rastrear Envío",
        icon: "🚚",
        comment: "🚚 Aprendamos a rastrear envíos...",
        completionComment: "✅ ¡Genial! Puedes rastrear tus paquetes",
        action: { type: "navigate", label: "Ejecutar: Rastrear Pedido", path: "/orders", icon: "→" }
      }
    ]
  },
  profile: {
    title: "👤 Perfil Perfecto",
    icon: "👤",
    totalSteps: 2,
    steps: [
      {
        id: 1,
        title: "Datos Personales",
        icon: "📝",
        comment: "📝 Actualicemos tus datos personales...",
        completionComment: "✅ ¡Bien! Tu información está actualizada",
        action: { type: "navigate", label: "Ejecutar: Editar Perfil", path: "/profile", icon: "→" }
      },
      {
        id: 2,
        title: "Seguridad de Cuenta",
        icon: "🔒",
        comment: "🔒 Reforcemos la seguridad de tu cuenta...",
        completionComment: "✅ ¡Excelente! Tu cuenta está protegida",
        action: { type: "navigate", label: "Ejecutar: Configurar Seguridad", path: "/settings/security", icon: "→" }
      }
    ]
  },
  security: {
    title: "🔒 Seguridad Total",
    icon: "🔒",
    totalSteps: 2,
    steps: [
      {
        id: 1,
        title: "Contraseña Segura",
        icon: "🔑",
        comment: "🔑 Creemos una contraseña invencible...",
        completionComment: "✅ ¡Bien! Tu contraseña es fuerte",
        action: { type: "navigate", label: "Ejecutar: Cambiar Contraseña", path: "/settings/security", icon: "→" }
      },
      {
        id: 2,
        title: "Privacidad y Datos",
        icon: "🔐",
        comment: "🔐 Finalmente, configuremos tu privacidad...",
        completionComment: "✅ ¡Excelente! Eres un experto en seguridad",
        action: { type: "navigate", label: "Ejecutar: Configurar Privacidad", path: "/settings/privacy", icon: "→" }
      }
    ]
  }
};

export default function GlobalFloatingGuide() {
  const navigate = useNavigate();
  const {
    activeGuide,
    currentStep,
    completedSteps,
    isFloatingMode,
    isMinimized,
    closeGuide,
    nextStep,
    previousStep,
    markStepCompleted,
    toggleMinimize
  } = useGuide();

  const [stepComment, setStepComment] = useState("");
  const [showCompletionComment, setShowCompletionComment] = useState(false);

  const currentGuide = activeGuide ? GUIDES_DATA[activeGuide] : null;
  const currentStepData = currentGuide?.steps[currentStep];
  const progress = currentGuide ? ((currentStep + 1) / currentGuide.totalSteps) * 100 : 0;
  const isLastStep = currentGuide ? currentStep === currentGuide.totalSteps - 1 : false;
  const isCompleted = completedSteps.includes(currentStep);

  // Actualizar comentario al cambiar de paso
  useEffect(() => {
    if (currentStepData) {
      if (completedSteps.includes(currentStep)) {
        setStepComment(currentStepData.completionComment);
        setShowCompletionComment(true);
      } else {
        setStepComment(currentStepData.comment);
        setShowCompletionComment(false);
      }
    }
  }, [currentStep, currentStepData, completedSteps]);

  const handleExecute = () => {
    const action = currentStepData.action;
    
    // Marcar como completado
    markStepCompleted(currentStep);
    
    // Mostrar comentario de completitud
    setStepComment(currentStepData.completionComment);
    setShowCompletionComment(true);
    
    // Ejecutar acción
    if (action.type === "navigate") {
      // Navegar pero mantener el panel visible
      setTimeout(() => {
        navigate(action.path);
      }, 300);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      nextStep();
    } else {
      // Último paso - cerrar guía
      closeGuide();
    }
  };

  // No renderizar si no hay guía activa o no está en modo flotante
  if (!activeGuide || !isFloatingMode || !currentGuide || !currentStepData) {
    return null;
  }

  // Panel minimizado
  if (isMinimized) {
    return (
      <div className="floating-guide-minimized" onClick={toggleMinimize}>
        <div className="minimized-icon">{currentStepData.icon}</div>
        <div className="minimized-text">
          Paso {currentStep + 1}/{currentGuide.totalSteps}
        </div>
        <div className="minimized-expand">▲</div>
      </div>
    );
  }

  // Panel expandido
  return (
    <div className="floating-guide-panel">
      {/* Header Compacto */}
      <div className="floating-guide-header">
        <div className="guide-mini-title">
          <span className="guide-icon">{currentGuide.icon}</span>
          <span className="guide-name">{currentGuide.title}</span>
        </div>
        <div className="guide-controls">
          <button className="control-btn minimize" onClick={toggleMinimize} title="Minimizar">
            ▼
          </button>
          <button className="control-btn close" onClick={closeGuide} title="Cerrar guía">
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
          Paso {currentStep + 1} de {currentGuide.totalSteps} ({Math.round(progress)}%)
        </div>
      </div>

      {/* Paso Actual */}
      <div className="floating-guide-step">
        <div className="step-header-mini">
          <span className="step-icon-mini">{currentStepData.icon}</span>
          <h4>{currentStepData.title}</h4>
        </div>
        
        {currentStepData.description && (
          <p className="step-description-mini">{currentStepData.description}</p>
        )}

        {/* Comentario Interactivo */}
        {stepComment && (
          <div className={`step-comment-mini ${showCompletionComment ? 'completed' : 'active'}`}>
            <span className="comment-icon-mini">
              {showCompletionComment ? '✅' : '💬'}
            </span>
            <span className="comment-text-mini">{stepComment}</span>
          </div>
        )}

        {/* Botón de Acción */}
        {!isCompleted && currentStepData.action && (
          <button 
            className="execute-btn-mini"
            onClick={handleExecute}
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
          onClick={previousStep}
          disabled={currentStep === 0}
        >
          ← Anterior
        </button>

        {isLastStep ? (
          <button 
            className="nav-btn-mini finish"
            onClick={closeGuide}
          >
            ✓ Finalizar Guía
          </button>
        ) : (
          <button 
            className="nav-btn-mini next"
            onClick={handleNext}
          >
            Siguiente →
          </button>
        )}
      </div>

      {/* Indicadores de Pasos */}
      <div className="step-indicators-mini">
        {Array.from({ length: currentGuide.totalSteps }, (_, i) => (
          <div
            key={i}
            className={`indicator-dot ${i === currentStep ? 'active' : ''} ${completedSteps.includes(i) ? 'completed' : ''}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
