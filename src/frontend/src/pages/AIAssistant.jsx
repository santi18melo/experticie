// frontend/src/pages/AIAssistant.jsx - Con Diagnóstico Interactivo y Guías Paso a Paso
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import InteractiveGuide from "../components/InteractiveGuide";
import "../styles/AIAssistant.css";

export default function AIAssistant() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [aiPersonality, setAiPersonality] = useState("helpful");
  const [showDiagnosticModal, setShowDiagnosticModal] = useState(false);
  const [showQuickGuideModal, setShowQuickGuideModal] = useState(false);
  const [showInteractiveGuide, setShowInteractiveGuide] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [diagnosticStep, setDiagnosticStep] = useState(0);
  const messagesEndRef = useRef(null);

  // Problemas comunes para diagnóstico
  const commonIssues = [
    {
      id: "login",
      title: "🔐 No puedo iniciar sesión",
      icon: "🔐",
      category: "Acceso"
    },
    {
      id: "slow",
      title: "🐌 La plataforma está lenta",
      icon: "🐌",
      category: "Rendimiento"
    },
    {
      id: "error_page",
      title: "❌ Error en una página",
      icon: "❌",
      category: "Error"
    },
    {
      id: "payment",
      title: "💳 Problema con pagos",
      icon: "💳",
      category: "Pagos"
    },
    {
      id: "order",
      title: "📦 Problema con pedido",
      icon: "📦",
      category: "Pedidos"
    },
    {
      id: "account",
      title: "👤 Problema con mi cuenta",
      icon: "👤",
      category: "Cuenta"
    },
    {
      id: "features",
      title: "❓ No entiendo una función",
      icon: "❓",
      category: "Ayuda"
    },
    {
      id: "other",
      title: "🔧 Otro problema",
      icon: "🔧",
      category: "General"
    }
  ];

  // Guías rápidas disponibles
  const quickGuides = [
    {
      id: "getting_started",
      title: "🚀 Primeros Pasos",
      description: "Cómo empezar a usar PREXCOL",
      icon: "🚀"
    },
    {
      id: "navigation",
      title: "🗺️ Navegación",
      description: "Cómo moverte por la plataforma",
      icon: "🗺️"
    },
    {
      id: "products",
      title: "🛍️ Gestión de Productos",
      description: "Cómo buscar y comprar productos",
      icon: "🛍️"
    },
    {
      id: "orders",
      title: "📦 Gestión de Pedidos",
      description: "Cómo hacer seguimiento a tus pedidos",
      icon: "📦"
    },
    {
      id: "profile",
      title: "👤 Configurar Perfil",
      description: "Cómo actualizar tu información",
      icon: "👤"
    },
    {
      id: "security",
      title: "🔒 Seguridad",
      description: "Cómo proteger tu cuenta",
      icon: "🔒"
    }
  ];

  useEffect(() => {
    const welcomeMessages = [
      {
        type: "ai",
        text: `👋 ¡Hola ${user?.nombre || "Usuario"}! Soy PREX-AI, tu asistente inteligente personal.`,
        time: new Date().toLocaleTimeString(),
        personality: "friendly"
      },
      {
        type: "ai",
        text: "Estoy aquí para ayudarte con:\n\n🔹 Diagnóstico de problemas\n🔹 Guías rápidas de uso\n🔹 Gestión de tu cuenta\n🔹 Navegación por la plataforma\n🔹 Recomendaciones personalizadas\n\n¿En qué puedo asistirte hoy?",
        time: new Date().toLocaleTimeString(),
        personality: "helpful",
        suggestions: ["Diagnosticar problema", "Ver guías rápidas", "Analizar mi cuenta"]
      }
    ];
    setMessages(welcomeMessages);
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: "user",
      text: inputMessage,
      time: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages(prev => [...prev, {
        type: "ai",
        text: aiResponse.text,
        time: new Date().toLocaleTimeString(),
        personality: aiResponse.personality,
        suggestions: aiResponse.suggestions
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    // Diagnóstico
    if (lowerMessage.includes("diagnosticar") || lowerMessage.includes("problema") || lowerMessage.includes("error")) {
      return {
        text: "🔍 Voy a ayudarte a diagnosticar el problema.\n\nPuedo analizar:\n• Problemas de acceso\n• Errores de página\n• Problemas de rendimiento\n• Issues con pagos o pedidos\n\n¿Quieres abrir el asistente de diagnóstico interactivo?",
        personality: "technical",
        suggestions: ["Abrir diagnóstico", "Describir problema", "Ver guías"]
      };
    }

    // Guías
    if (lowerMessage.includes("guía") || lowerMessage.includes("guia") || lowerMessage.includes("tutorial") || lowerMessage.includes("ayuda")) {
      return {
        text: "📚 Tengo guías rápidas disponibles sobre:\n\n• Primeros pasos\n• Navegación\n• Productos y pedidos\n• Configuración de perfil\n• Seguridad\n\n¿Quieres ver las guías disponibles?",
        personality: "helpful",
        suggestions: ["Ver guías", "Primeros pasos", "Navegación"]
      };
    }

    // Cuenta
    if (lowerMessage.includes("cuenta") || lowerMessage.includes("perfil") || lowerMessage.includes("datos")) {
      return {
        text: `📊 Análisis de tu cuenta:\n\n✅ Estado: ${user?.is_active ? "Activa" : "Inactiva"}\n👤 Rol: ${user?.rol || "N/A"}\n📧 Email: ${user?.email || "N/A"}\n📅 Miembro desde: ${user?.fecha_creacion ? new Date(user.fecha_creacion).toLocaleDateString() : "N/A"}\n\n¿Deseas actualizar algún dato o necesitas más información?`,
        personality: "technical",
        suggestions: ["Actualizar perfil", "Cambiar contraseña", "Ver actividad"]
      };
    }

    // Navegación
    if (lowerMessage.includes("ir a") || lowerMessage.includes("navegar") || lowerMessage.includes("página")) {
      return {
        text: "🗺️ Puedo ayudarte a navegar por la plataforma. ¿A dónde te gustaría ir?\n\n📍 Opciones disponibles:\n• Dashboard\n• Productos\n• Pedidos\n• Configuración\n• Soporte\n\nSolo dime el destino y te llevaré allí.",
        personality: "helpful",
        suggestions: ["Dashboard", "Productos", "Configuración"]
      };
    }

    return {
      text: `🤖 He procesado tu mensaje: "${message}"\n\nComo asistente IA, puedo:\n\n✨ Diagnosticar problemas paso a paso\n✨ Proporcionar guías rápidas\n✨ Analizar datos y patrones\n✨ Automatizar tareas\n\n¿Cómo puedo ayudarte específicamente?`,
      personality: "helpful",
      suggestions: ["Diagnosticar problema", "Ver guías", "Analizar cuenta"]
    };
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion === "Abrir diagnóstico" || suggestion === "Diagnosticar problema") {
      setShowDiagnosticModal(true);
    } else if (suggestion === "Ver guías" || suggestion === "Ver guías rápidas") {
      setShowQuickGuideModal(true);
    } else if (suggestion === "Primeros pasos") {
      showQuickGuide("getting_started");
    } else if (suggestion === "Navegación") {
      showQuickGuide("navigation");
    } else {
      setInputMessage(suggestion);
    }
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case "diagnostic":
        setShowDiagnosticModal(true);
        break;
      case "quick_guide":
        setShowQuickGuideModal(true);
        break;
      case "dashboard":
        navigate("/dashboard");
        break;
      case "products":
        navigate("/productos");
        break;
      case "settings":
        navigate("/settings");
        break;
      case "live_chat":
        navigate("/support");
        break;
      default:
        setInputMessage(action);
    }
  };

  const startDiagnostic = (issue) => {
    setSelectedIssue(issue);
    setDiagnosticStep(1);
  };

  const getDiagnosticSteps = (issueId) => {
    const diagnostics = {
      login: [
        {
          question: "¿Qué tipo de problema de acceso tienes?",
          options: [
            "Olvidé mi contraseña",
            "Mi cuenta está bloqueada",
            "No recibo el email de verificación",
            "Error al iniciar sesión"
          ]
        }
      ],
      slow: [
        {
          question: "¿Cuándo notas que está lenta la plataforma?",
          options: [
            "Al cargar páginas",
            "Al hacer búsquedas",
            "Al subir archivos",
            "Todo el tiempo"
          ]
        }
      ],
      error_page: [
        {
          question: "¿Qué tipo de error ves?",
          options: [
            "Error 404 (Página no encontrada)",
            "Error 500 (Error del servidor)",
            "Página en blanco",
            "Otro error"
          ]
        }
      ],
      payment: [
        {
          question: "¿Qué problema tienes con el pago?",
          options: [
            "Pago rechazado",
            "No veo mi pago",
            "Cobro duplicado",
            "Método de pago no funciona"
          ]
        }
      ],
      order: [
        {
          question: "¿Qué problema tienes con tu pedido?",
          options: [
            "No puedo rastrearlo",
            "No llegó",
            "Llegó incompleto",
            "Quiero cancelarlo"
          ]
        }
      ],
      account: [
        {
          question: "¿Qué problema tienes con tu cuenta?",
          options: [
            "No puedo actualizar datos",
            "Quiero eliminar mi cuenta",
            "Problemas con verificación",
            "Otro"
          ]
        }
      ],
      features: [
        {
          question: "¿Qué función no entiendes?",
          options: [
            "Cómo buscar productos",
            "Cómo hacer un pedido",
            "Cómo ver mi historial",
            "Cómo cambiar configuración"
          ]
        }
      ],
      other: [
        {
          question: "Describe brevemente tu problema:",
          options: ["Escribir descripción"]
        }
      ]
    };

    return diagnostics[issueId] || [];
  };

  const handleDiagnosticOption = (option) => {
    const issue = commonIssues.find(i => i.id === selectedIssue);
    
    setMessages(prev => [...prev, {
      type: "user",
      text: `${issue.title}\n\nRespuesta: ${option}`,
      time: new Date().toLocaleTimeString()
    }]);

    const solution = generateSolution(selectedIssue, option);
    
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: "ai",
        text: solution.text,
        time: new Date().toLocaleTimeString(),
        personality: "technical",
        suggestions: solution.suggestions
      }]);
      setIsTyping(false);
    }, 1000);

    setShowDiagnosticModal(false);
    setDiagnosticStep(0);
    setSelectedIssue(null);
  };

  const generateSolution = (issueId, option) => {
    const solutions = {
      login: {
        "Olvidé mi contraseña": {
          text: "🔐 Solución para recuperar contraseña:\n\n1️⃣ Ve a la página de login\n2️⃣ Click en '¿Olvidaste tu contraseña?'\n3️⃣ Ingresa tu email registrado\n4️⃣ Revisa tu bandeja de entrada\n5️⃣ Click en el enlace del email\n6️⃣ Crea una nueva contraseña\n\n⚠️ Si no recibes el email:\n• Revisa spam/correo no deseado\n• Verifica que el email sea correcto\n• Espera 5 minutos y reintenta\n\n¿Necesitas más ayuda?",
          suggestions: ["Ir a login", "Contactar soporte", "Ver más soluciones"]
        }
      },
      slow: {
        "Al cargar páginas": {
          text: "🐌 Soluciones para mejorar velocidad:\n\n1️⃣ Limpia caché del navegador\n2️⃣ Desactiva extensiones temporalmente\n3️⃣ Prueba en modo incógnito\n4️⃣ Verifica tu conexión a internet\n5️⃣ Actualiza tu navegador\n\n💡 Comandos útiles:\n• Chrome: Ctrl+Shift+Delete\n• Firefox: Ctrl+Shift+Delete\n• Edge: Ctrl+Shift+Delete\n\n¿Funcionó alguna solución?",
          suggestions: ["Limpiar caché", "Modo incógnito", "Cambiar navegador"]
        }
      }
    };

    const defaultSolution = {
      text: `✅ He registrado tu problema: "${option}"\n\nEstoy analizando posibles soluciones...\n\nMientras tanto, puedes:\n• Revisar las FAQ\n• Contactar con un agente humano\n• Ver guías relacionadas\n\n¿Qué prefieres?`,
      suggestions: ["Ver FAQ", "Chat en vivo", "Más ayuda"]
    };

    return solutions[issueId]?.[option] || defaultSolution;
  };

  const showQuickGuide = (guideId) => {
    setSelectedGuide(guideId);
    setShowInteractiveGuide(true);
    setShowQuickGuideModal(false);
  };

  const handleGuideComplete = () => {
    setShowInteractiveGuide(false);
    setSelectedGuide(null);
    
    setMessages(prev => [...prev, {
      type: "ai",
      text: "🎉 ¡Felicitaciones! Has completado la guía.\n\n¿Te gustaría:\n• Ver otra guía\n• Hacer una pregunta\n• Explorar la plataforma",
      time: new Date().toLocaleTimeString(),
      personality: "friendly",
      suggestions: ["Ver otra guía", "Tengo una pregunta", "Ir al dashboard"]
    }]);
  };

  return (
    <div className="ai-assistant-container">
      <div className="ai-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Volver
        </button>
        <div className="ai-title-section">
          <h1>🤖 PREX-AI</h1>
          <p>Asistente Inteligente con Diagnóstico</p>
        </div>
        <div className="ai-status">
          <span className="status-dot active"></span>
          <span>IA Activa</span>
        </div>
      </div>

      <div className="ai-content">
        {/* Panel de información */}
        <div className="ai-info-panel">
          <div className="info-card">
            <h3>🎯 Herramientas IA</h3>
            <ul>
              <li>✅ Diagnóstico interactivo</li>
              <li>✅ Guías rápidas paso a paso</li>
              <li>✅ Análisis de problemas</li>
              <li>✅ Soluciones automáticas</li>
              <li>✅ Recomendaciones personalizadas</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>⚡ Acciones Rápidas</h3>
            <div className="quick-actions-grid">
              <button onClick={() => handleQuickAction("diagnostic")}>
                🔍 Diagnosticar
              </button>
              <button onClick={() => handleQuickAction("quick_guide")}>
                📚 Guías
              </button>
              <button onClick={() => handleQuickAction("dashboard")}>
                📊 Dashboard
              </button>
              <button onClick={() => handleQuickAction("live_chat")}>
                💬 Chat Humano
              </button>
            </div>
          </div>

          <div className="info-card personality-selector">
            <h3>🎭 Personalidad de IA</h3>
            <div className="personality-options">
              <button 
                className={aiPersonality === "helpful" ? "active" : ""}
                onClick={() => setAiPersonality("helpful")}
              >
                😊 Amigable
              </button>
              <button 
                className={aiPersonality === "technical" ? "active" : ""}
                onClick={() => setAiPersonality("technical")}
              >
                🔧 Técnico
              </button>
              <button 
                className={aiPersonality === "friendly" ? "active" : ""}
                onClick={() => setAiPersonality("friendly")}
              >
                🎉 Casual
              </button>
            </div>
          </div>
        </div>

        {/* Chat de IA */}
        <div className="ai-chat-panel">
          <div className="ai-chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`ai-message ${msg.type}`}>
                <div className="message-avatar">
                  {msg.type === "ai" ? "🤖" : "👤"}
                </div>
                <div className="message-content">
                  <div className={`message-bubble ${msg.personality || ""}`}>
                    <div className="message-text">{msg.text}</div>
                    {msg.suggestions && (
                      <div className="message-suggestions">
                        {msg.suggestions.map((sug, i) => (
                          <button 
                            key={i}
                            onClick={() => handleSuggestionClick(sug)}
                            className="suggestion-chip"
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="message-time">{msg.time}</div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="ai-message ai">
                <div className="message-avatar">🤖</div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-chat-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Pregúntale algo a PREX-AI..."
              className="chat-input"
            />
            <button onClick={handleSendMessage} className="send-button">
              Enviar →
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Diagnóstico */}
      {showDiagnosticModal && (
        <div className="modal-overlay" onClick={() => setShowDiagnosticModal(false)}>
          <div className="modal-content diagnostic-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowDiagnosticModal(false)}>×</button>
            <h2>🔍 Diagnóstico Interactivo</h2>
            <p>Selecciona el problema que estás experimentando:</p>
            
            <div className="issues-grid">
              {commonIssues.map(issue => (
                <button
                  key={issue.id}
                  className="issue-card"
                  onClick={() => startDiagnostic(issue.id)}
                >
                  <span className="issue-icon">{issue.icon}</span>
                  <span className="issue-title">{issue.title}</span>
                  <span className="issue-category">{issue.category}</span>
                </button>
              ))}
            </div>

            {selectedIssue && diagnosticStep > 0 && (
              <div className="diagnostic-steps">
                <h3>{getDiagnosticSteps(selectedIssue)[diagnosticStep - 1]?.question}</h3>
                <div className="diagnostic-options">
                  {getDiagnosticSteps(selectedIssue)[diagnosticStep - 1]?.options.map((option, idx) => (
                    <button
                      key={idx}
                      className="diagnostic-option"
                      onClick={() => handleDiagnosticOption(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de Guías Rápidas */}
      {showQuickGuideModal && (
        <div className="modal-overlay" onClick={() => setShowQuickGuideModal(false)}>
          <div className="modal-content guide-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowQuickGuideModal(false)}>×</button>
            <h2>📚 Guías Rápidas</h2>
            <p>Selecciona una guía para comenzar:</p>
            
            <div className="guides-grid">
              {quickGuides.map(guide => (
                <button
                  key={guide.id}
                  className="guide-card"
                  onClick={() => showQuickGuide(guide.id)}
                >
                  <span className="guide-icon">{guide.icon}</span>
                  <div className="guide-info">
                    <strong>{guide.title}</strong>
                    <small>{guide.description}</small>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Guía Interactiva Paso a Paso */}
      {showInteractiveGuide && (
        <InteractiveGuide
          guide={selectedGuide}
          onClose={() => setShowInteractiveGuide(false)}
          onComplete={handleGuideComplete}
        />
      )}
    </div>
  );
}
