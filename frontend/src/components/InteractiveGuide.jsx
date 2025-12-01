// frontend/src/components/InteractiveGuide.jsx - Guía Paso a Paso Interactiva Completa
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGuide } from "../context/GuideContext";
import FloatingGuidePanel from "./FloatingGuidePanel";
import "../styles/InteractiveGuide.css";

export default function InteractiveGuide({ guide, onClose, onComplete }) {
  const navigate = useNavigate();
  const { startGuide, activateFloatingMode } = useGuide();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [stepComment, setStepComment] = useState("");
  const [showCompletionComment, setShowCompletionComment] = useState(false);
  const [isFloatingMode, setIsFloatingMode] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Iniciar guía en el context al montar
  useEffect(() => {
    if (guide) {
      startGuide(guide);
    }
  }, [guide, startGuide]);

  const guides = {
    getting_started: {
      title: "🚀 Primeros Pasos en PREXCOL",
      description: "Te guiaré paso a paso para que empieces a usar la plataforma",
      totalSteps: 5,
      steps: [
        {
          id: 1,
          title: "Completa tu Perfil",
          description: "Primero, vamos a configurar tu información personal",
          icon: "👤",
          comment: "📍 Vamos a configurar tu perfil personal...",
          completionComment: "✅ ¡Perfecto! Tu perfil está listo",
          content: "Un perfil completo te ayuda a:\n\n✅ Recibir recomendaciones personalizadas\n✅ Procesar pedidos más rápido\n✅ Tener una cuenta más segura\n\nVamos a completar:\n• Nombre completo\n• Foto de perfil\n• Información de contacto\n• Dirección de envío",
          action: {
            type: "navigate",
            label: "Ejecutar: Ir a Mi Perfil",
            path: "/profile",
            icon: "→"
          },
          tips: [
            "💡 Usa una foto clara para que te identifiquen fácilmente",
            "💡 Verifica que tu email esté correcto",
            "💡 Agrega una dirección de envío predeterminada"
          ]
        },
        {
          id: 2,
          title: "Explora el Dashboard",
          description: "Conoce tu panel de control principal",
          icon: "📊",
          comment: "📊 Ahora exploraremos tu panel de control...",
          completionComment: "✅ ¡Excelente! Ya conoces el dashboard",
          content: "El Dashboard es tu centro de comando. Aquí encontrarás:\n\n📈 **Estadísticas**\n   • Pedidos recientes\n   • Productos favoritos\n   • Actividad de cuenta\n\n🔔 **Notificaciones**\n   • Actualizaciones importantes\n   • Ofertas personalizadas\n   • Estado de pedidos",
          action: {
            type: "navigate",
            label: "Ejecutar: Ir al Dashboard",
            path: "/dashboard",
            icon: "→"
          },
          tips: [
            "💡 Personaliza tu dashboard desde Configuración",
            "💡 Activa notificaciones para estar al día"
          ]
        },
        {
          id: 3,
          title: "Busca Productos",
          description: "Aprende a encontrar lo que necesitas",
          icon: "🔍",
          comment: "🔍 Es momento de explorar nuestro catálogo...",
          completionComment: "✅ ¡Genial! Ya sabes buscar productos",
          content: "Tenemos múltiples formas de buscar:\n\n🔎 **Barra de Búsqueda**\n   • Escribe palabras clave\n   • Usa filtros avanzados\n   • Ordena resultados",
          action: {
            type: "navigate",
            label: "Ejecutar: Ver Catálogo",
            path: "/productos",
            icon: "→"
          },
          tips: [
            "💡 Usa comillas para búsquedas exactas",
            "💡 Guarda productos en favoritos"
          ]
        },
        {
          id: 4,
          title: "Haz tu Primer Pedido",
          description: "Proceso completo de compra",
          icon: "🛒",
          comment: "🛒 Hagamos tu primera compra juntos...",
          completionComment: "✅ ¡Increíble! Ya sabes cómo comprar",
          content: "Comprar es fácil y seguro:\n\n1️⃣ Selecciona Producto\n2️⃣ Agrega al Carrito\n3️⃣ Proceso de Pago\n4️⃣ Confirmación",
          action: {
            type: "navigate",
            label: "Ejecutar: Ir a Productos",
            path: "/productos",
            icon: "→"
          },
          tips: [
            "💡 Revisa las políticas de devolución",
            "💡 Guarda tu método de pago"
          ]
        },
        {
          id: 5,
          title: "Configura Notificaciones",
          description: "Mantente informado de todo",
          icon: "🔔",
          comment: "🔔 Finalmente, personalicemos tus notificaciones...",
          completionComment: "✅ ¡Perfecto! Todo configurado correctamente",
          content: "Personaliza cómo te contactamos:\n\n📧 Email\n📱 Push (navegador)\n⚙️ Preferencias",
          action: {
            type: "navigate",
            label: "Ejecutar: Ir a Configuración",
            path: "/settings",
            icon: "→"
          },
          tips: [
            "💡 Activa notificaciones de envío",
            "💡 Configura horarios preferidos"
          ]
        }
      ]
    },
    navigation: {
      title: "🗺️ Domina la Navegación",
      description: "Aprende a moverte como un experto por la plataforma",
      totalSteps: 2,
      steps: [
        {
          id: 1,
          title: "Menú Principal",
          description: "Conoce todas las secciones disponibles",
          icon: "📋",
          comment: "📋 Conozcamos el menú principal...",
          completionComment: "✅ ¡Bien! Ya conoces el menú",
          content: "El menú principal tiene todo lo que necesitas:\n\n🏠 Home\n📊 Dashboard\n🛍️ Productos\n📦 Pedidos",
          action: {
            type: "navigate",
            label: "Ejecutar: Ver Dashboard",
            path: "/dashboard",
            icon: "→"
          },
          tips: [
            "💡 El menú siempre está visible",
            "💡 Usa el logo para volver al inicio"
          ]
        },
        {
          id: 2,
          title: "Búsqueda Rápida",
          description: "Encuentra cualquier cosa al instante",
          icon: "⚡",
          comment: "⚡ Aprendamos los atajos de teclado...",
          completionComment: "✅ ¡Genial! Ahora eres más rápido",
          content: "Acceso rápido con teclado:\n\n⌨️ Atajos Principales\n🔍 Búsqueda Inteligente",
          action: {
            type: "info",
            label: "Entendido",
            icon: "✓"
          },
          tips: [
            "💡 La búsqueda funciona en toda la plataforma"
          ]
        }
      ]
    },
    products: {
      title: "🛍️ Maestro de Productos",
      description: "Conviértete en experto buscando y comprando productos",
      totalSteps: 2,
      steps: [
        {
          id: 1,
          title: "Búsqueda Avanzada",
          description: "Encuentra exactamente lo que buscas",
          icon: "🔎",
          comment: "🔎 Aprendamos técnicas de búsqueda avanzada...",
          completionComment: "✅ ¡Genial! Ahora buscas como un pro",
          content: "Técnicas de búsqueda profesional:\n\n🎯 Filtros Avanzados\n📊 Ordenamiento",
          action: {
            type: "navigate",
            label: "Ejecutar: Probar Búsqueda",
            path: "/productos",
            icon: "→"
          },
          tips: [
            "💡 Combina múltiples filtros"
          ]
        },
        {
          id: 2,
          title: "Carrito de Compras",
          description: "Gestiona tus productos antes de pagar",
          icon: "🛒",
          comment: "🛒 Aprendamos a usar el carrito...",
          completionComment: "✅ ¡Excelente! Dominas el carrito",
          content: "Funciones del carrito:\n\n➕ Agregar Productos\n✏️ Editar Carrito\n💰 Ver Total",
          action: {
            type: "navigate",
            label: "Ejecutar: Ver Mi Carrito",
            path: "/cart",
            icon: "→"
          },
          tips: [
            "💡 El carrito se guarda automáticamente"
          ]
        }
      ]
    },
    orders: {
      title: "📦 Gestión de Pedidos",
      description: "Controla tus compras de principio a fin",
      totalSteps: 2,
      steps: [
        {
          id: 1,
          title: "Ver Tus Pedidos",
          description: "Accede a todo tu historial de compras",
          icon: "📋",
          comment: "📋 Veamos cómo gestionar tus pedidos...",
          completionComment: "✅ ¡Bien! Ya sabes ver tus pedidos",
          content: "En la sección de Pedidos encontrarás:\n\n📊 Lista de Pedidos\n🏷️ Estados de Pedido",
          action: {
            type: "navigate",
            label: "Ejecutar: Ver Mis Pedidos",
            path: "/orders",
            icon: "→"
          },
          tips: [
            "💡 Usa filtros para encontrar pedidos rápido"
          ]
        },
        {
          id: 2,
          title: "Rastrear Envío",
          description: "Sigue tu paquete en tiempo real",
          icon: "🚚",
          comment: "🚚 Aprendamos a rastrear envíos...",
          completionComment: "✅ ¡Genial! Puedes rastrear tus paquetes",
          content: "Rastreo en tiempo real:\n\n📍 Ubicación Actual\n📅 Historial de Envío",
          action: {
            type: "navigate",
            label: "Ejecutar: Rastrear Pedido",
            path: "/orders",
            icon: "→"
          },
          tips: [
            "💡 Activa notificaciones de envío"
          ]
        }
      ]
    },
    profile: {
      title: "👤 Perfil Perfecto",
      description: "Optimiza tu cuenta para la mejor experiencia",
      totalSteps: 2,
      steps: [
        {
          id: 1,
          title: "Datos Personales",
          description: "Mantén tu información actualizada",
          icon: "📝",
          comment: "📝 Actualicemos tus datos personales...",
          completionComment: "✅ ¡Bien! Tu información está actualizada",
          content: "Información importante:\n\n👤 Datos Básicos\n📸 Foto de Perfil\n📍 Direcciones",
          action: {
            type: "navigate",
            label: "Ejecutar: Editar Perfil",
            path: "/profile",
            icon: "→"
          },
          tips: [
            "💡 Verifica tu email para mayor seguridad"
          ]
        },
        {
          id: 2,
          title: "Seguridad de Cuenta",
          description: "Protege tu información",
          icon: "🔒",
          comment: "🔒 Reforcemos la seguridad de tu cuenta...",
          completionComment: "✅ ¡Excelente! Tu cuenta está protegida",
          content: "Medidas de seguridad:\n\n🔑 Contraseña Fuerte\n🛡️ Verificación en 2 Pasos",
          action: {
            type: "navigate",
            label: "Ejecutar: Configurar Seguridad",
            path: "/settings/security",
            icon: "→"
          },
          tips: [
            "💡 Activa verificación en 2 pasos YA"
          ]
        }
      ]
    },
    security: {
      title: "🔒 Seguridad Total",
      description: "Protege tu cuenta como un profesional",
      totalSteps: 2,
      steps: [
        {
          id: 1,
          title: "Contraseña Segura",
          description: "La primera línea de defensa",
          icon: "🔑",
          comment: "🔑 Creemos una contraseña invencible...",
          completionComment: "✅ ¡Bien! Tu contraseña es fuerte",
          content: "Crea una contraseña invencible:\n\n✅ Requisitos Mínimos\n❌ Evita contraseñas comunes",
          action: {
            type: "navigate",
            label: "Ejecutar: Cambiar Contraseña",
            path: "/settings/security",
            icon: "→"
          },
          tips: [
            "💡 Nunca compartas tu contraseña"
          ]
        },
        {
          id: 2,
          title: "Privacidad y Datos",
          description: "Controla tu información personal",
          icon: "🔐",
          comment: "🔐 Finalmente, configuremos tu privacidad...",
          completionComment: "✅ ¡Excelente! Eres un experto en seguridad",
          content: "Gestiona tu privacidad:\n\n👁️ Visibilidad\n📊 Uso de Datos\n🍪 Cookies",
          action: {
            type: "navigate",
            label: "Ejecutar: Configurar Privacidad",
            path: "/settings/privacy",
            icon: "→"
          },
          tips: [
            "💡 Lee la política de privacidad"
          ]
        }
      ]
    }
  };

  const currentGuide = guides[guide];
  const currentStepData = currentGuide?.steps[currentStep];
  const progress = ((currentStep + 1) / currentGuide?.totalSteps) * 100;
  const isLastStep = currentStep === currentGuide?.totalSteps - 1;

  // Mostrar comentario al cambiar de paso
  useEffect(() => {
    if (currentStepData) {
      setStepComment(currentStepData.comment);
      setShowCompletionComment(false);
    }
  }, [currentStep, currentStepData]);

  const handleNext = () => {
    if (currentStep < currentGuide.totalSteps - 1) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAction = () => {
    const action = currentStepData.action;
    
    // Marcar como completado
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    // Mostrar comentario de completitud
    setStepComment(currentStepData.completionComment);
    setShowCompletionComment(true);
    
    // Ejecutar acción
    if (action.type === "navigate") {
      setTimeout(() => {
        navigate(action.path);
      }, 500);
    } else if (action.type === "demo") {
      alert("Demo de " + action.demo);
    }
  };

  const handleAcceptAndFinish = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    setShowConfetti(true);
    
    setTimeout(() => {
      setShowConfetti(false);
      if (onComplete) onComplete();
    }, 3000);
  };

  const handleStepClick = (index) => {
    if (completedSteps.includes(index) || index <= currentStep) {
      setCurrentStep(index);
    }
  };

  if (!currentGuide) return null;

  // Si está en modo flotante, renderizar mini panel
  if (isFloatingMode) {
    return (
      <FloatingGuidePanel
        currentGuide={{
          title: currentGuide.title,
          icon: currentGuide.title.split(' ')[0]
        }}
        currentStep={currentStep}
        totalSteps={currentGuide.totalSteps}
        currentStepData={currentStepData}
        completedSteps={completedSteps}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onExecute={handleAction}
        onMinimize={() => setIsMinimized(!isMinimized)}
        onClose={() => {
          setIsFloatingMode(false);
          if (onClose) onClose();
        }}
        isMinimized={isMinimized}
      />
    );
  }

  // Modo modal completo
  return (
    <div className="interactive-guide-overlay">
      {showConfetti && <div className="confetti-container">🎉🎊✨🌟⭐</div>}
      
      <div className="interactive-guide-container">
        <div className="guide-header">
          <div className="guide-title-section">
            <h2>{currentGuide.title}</h2>
            <p>{currentGuide.description}</p>
          </div>
          <button className="guide-close" onClick={onClose}>×</button>
        </div>

        <div className="guide-progress-section">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-text">
            Paso {currentStep + 1} de {currentGuide.totalSteps} ({Math.round(progress)}%)
          </div>
        </div>

        <div className="guide-steps-nav">
          {currentGuide.steps.map((step, index) => (
            <div
              key={step.id}
              className={`step-indicator ${index === currentStep ? 'active' : ''} ${completedSteps.includes(index) ? 'completed' : ''}`}
              onClick={() => handleStepClick(index)}
            >
              <div className="step-number">
                {completedSteps.includes(index) ? '✓' : index + 1}
              </div>
              <div className="step-label">{step.icon}</div>
            </div>
          ))}
        </div>

        {stepComment && (
          <div className={`step-comment-interactive ${showCompletionComment ? 'completion' : 'intro'}`}>
            <span className="comment-icon">{showCompletionComment ? '✅' : '💬'}</span>
            <span className="comment-text">{stepComment}</span>
          </div>
        )}

        <div className="guide-content">
          <div className="step-icon-large">{currentStepData.icon}</div>
          <h3>{currentStepData.title}</h3>
          <p className="step-description">{currentStepData.description}</p>
          
          <div className="step-content">
            {currentStepData.content}
          </div>

          {currentStepData.tips && (
            <div className="step-tips">
              <h4>💡 Consejos Útiles:</h4>
              {currentStepData.tips.map((tip, idx) => (
                <div key={idx} className="tip-item">{tip}</div>
              ))}
            </div>
          )}

          <div className="step-action">
            <button 
              className="action-button primary execute-button" 
              onClick={handleAction}
              disabled={completedSteps.includes(currentStep)}
            >
              {completedSteps.includes(currentStep) ? (
                <>✓ Completado</>
              ) : (
                <>{currentStepData.action.icon} {currentStepData.action.label}</>
              )}
            </button>
          </div>
          <button 
            className="nav-button secondary" 
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            ← Anterior
          </button>
          
          {isLastStep ? (
            <button 
              className="nav-button primary accept-button" 
              onClick={handleAcceptAndFinish}
            >
              ✓ Aceptar y Finalizar
            </button>
          ) : (
            <button 
              className="nav-button primary" 
              onClick={handleNext}
            >
              Siguiente →
            </button>
          )}
        </div>

        {isLastStep && (
          <div className="completion-message">
            🎉 ¡Estás a punto de completar esta guía! Click en "Aceptar y Finalizar"
          </div>
        )}
      </div>
    </div>
  );
}
