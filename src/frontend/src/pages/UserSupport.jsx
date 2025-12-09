// frontend/src/pages/UserSupport.jsx - Chat en Vivo Unificado con IA
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/AIAssistant.css"; // Usar los mismos estilos

export default function UserSupport() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [agentStatus, setAgentStatus] = useState("connecting"); // connecting, connected, offline
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Mensaje de bienvenida para chat en vivo
    const welcomeMessages = [
      {
        type: "agent",
        text: `👋 ¡Hola ${user?.nombre || "Usuario"}! Bienvenido al Chat en Vivo de PREXCOL.`,
        time: new Date().toLocaleTimeString(),
        agentName: "Sistema"
      },
      {
        type: "agent",
        text: "Un agente humano estará contigo en breve. Mientras tanto, puedes:\n\n• Describir tu consulta\n• Adjuntar información relevante\n• Revisar nuestras FAQ\n\nTiempo de espera estimado: 2-5 minutos",
        time: new Date().toLocaleTimeString(),
        agentName: "Sistema"
      }
    ];
    setMessages(welcomeMessages);
    
    // Simular conexión con agente
    setTimeout(() => {
      setAgentStatus("connected");
      setMessages(prev => [...prev, {
        type: "agent",
        text: "✅ Agente conectado. ¿En qué puedo ayudarte hoy?",
        time: new Date().toLocaleTimeString(),
        agentName: "Agente de Soporte"
      }]);
    }, 3000);
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

    // Simular respuesta del agente
    setTimeout(() => {
      const agentResponse = generateAgentResponse(inputMessage);
      setMessages(prev => [...prev, {
        type: "agent",
        text: agentResponse.text,
        time: new Date().toLocaleTimeString(),
        agentName: "Agente de Soporte",
        suggestions: agentResponse.suggestions
      }]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAgentResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    // Reactivar cuenta
    if (lowerMessage.includes("reactivar") || lowerMessage.includes("activar") || lowerMessage.includes("cuenta")) {
      return {
        text: "🔓 Entiendo que necesitas ayuda con la reactivación de tu cuenta.\n\nPara ayudarte mejor, necesito saber:\n\n1. ¿Tu cuenta fue desactivada voluntariamente o suspendida?\n2. ¿Tienes acceso al email registrado?\n3. ¿Cuándo ocurrió la desactivación?\n\nMientras tanto, puedo verificar el estado de tu cuenta.",
        suggestions: ["Verificar estado", "Hablar con supervisor", "Enviar documentos"]
      };
    }

    // Contactar administrador
    if (lowerMessage.includes("admin") || lowerMessage.includes("supervisor") || lowerMessage.includes("gerente")) {
      return {
        text: "👨‍💼 Voy a escalar tu caso a un supervisor.\n\nHe creado un ticket con prioridad alta. Un administrador se pondrá en contacto contigo en las próximas 24 horas.\n\nMientras tanto, puedes:\n• Enviar información adicional\n• Llamar al +57 300 123 4567\n• Enviar email a admin@prexcol.com",
        suggestions: ["Ver ticket", "Llamar ahora", "Enviar email"]
      };
    }

    // Problema técnico
    if (lowerMessage.includes("problema") || lowerMessage.includes("error") || lowerMessage.includes("bug") || lowerMessage.includes("no funciona")) {
      return {
        text: "🔧 Lamento que estés experimentando problemas técnicos.\n\nPara diagnosticar el issue, necesito:\n\n1. ¿Qué estabas haciendo cuando ocurrió?\n2. ¿Qué mensaje de error apareció?\n3. ¿En qué navegador estás?\n4. ¿Puedes compartir una captura de pantalla?\n\nVoy a revisar los logs del sistema mientras me proporcionas esta información.",
        suggestions: ["Enviar captura", "Ver logs", "Reintentar acción"]
      };
    }

    // Facturación/Pagos
    if (lowerMessage.includes("pago") || lowerMessage.includes("factura") || lowerMessage.includes("cobro")) {
      return {
        text: "💳 Entiendo tu consulta sobre facturación.\n\nPuedo ayudarte con:\n• Verificar estado de pagos\n• Generar facturas\n• Resolver problemas de cobro\n• Actualizar método de pago\n\n¿Qué necesitas específicamente?",
        suggestions: ["Ver pagos", "Generar factura", "Actualizar método"]
      };
    }

    // Pedidos
    if (lowerMessage.includes("pedido") || lowerMessage.includes("orden") || lowerMessage.includes("envío")) {
      return {
        text: "📦 Consulta sobre pedidos.\n\nPuedo ayudarte a:\n• Rastrear tu pedido\n• Modificar dirección de envío\n• Cancelar o devolver\n• Verificar estado\n\n¿Tienes el número de pedido?",
        suggestions: ["Rastrear pedido", "Modificar envío", "Cancelar"]
      };
    }

    // Respuesta por defecto
    return {
      text: `He recibido tu mensaje: "${message}"\n\nComo agente humano, puedo ayudarte con:\n\n✅ Casos complejos que requieren decisión humana\n✅ Problemas que no se resuelven automáticamente\n✅ Consultas personalizadas\n✅ Escalamiento a supervisores\n\n¿Puedes darme más detalles sobre tu consulta?`,
      suggestions: ["Hablar con supervisor", "Usar IA", "Ver FAQ"]
    };
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion === "Usar IA") {
      navigate("/ai-assistant");
    } else {
      setInputMessage(suggestion);
    }
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case "ai_assistant":
        navigate("/ai-assistant");
        break;
      case "dashboard":
        navigate("/dashboard");
        break;
      case "faq":
        window.open("https://prexcol.com/faq", "_blank");
        break;
      case "call":
        window.location.href = "tel:+573001234567";
        break;
      default:
        setInputMessage(action);
    }
  };

  return (
    <div className="ai-assistant-container">
      <div className="ai-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Volver
        </button>
        <div className="ai-title-section">
          <h1>💬 Chat en Vivo</h1>
          <p>Soporte Humano Personalizado</p>
        </div>
        <div className="ai-status">
          <span className={`status-dot ${agentStatus === "connected" ? "active" : ""}`}></span>
          <span>
            {agentStatus === "connecting" && "Conectando..."}
            {agentStatus === "connected" && "Agente Disponible"}
            {agentStatus === "offline" && "Fuera de línea"}
          </span>
        </div>
      </div>

      <div className="ai-content">
        {/* Panel de información */}
        <div className="ai-info-panel">
          <div className="info-card">
            <h3>📋 Información de Cuenta</h3>
            <div className="account-info">
              <p><strong>Usuario:</strong> {user?.nombre || "Invitado"}</p>
              <p><strong>Email:</strong> {user?.email || "No disponible"}</p>
              <p><strong>Rol:</strong> {user?.rol || "N/A"}</p>
              <p><strong>Estado:</strong> 
                <span className={`status-badge ${user?.is_active ? 'active' : 'inactive'}`}>
                  {user?.is_active ? " ✓ Activa" : " ⚠ Inactiva"}
                </span>
              </p>
            </div>
          </div>

          <div className="info-card">
            <h3>⚡ Acciones Rápidas</h3>
            <div className="quick-actions-grid">
              <button onClick={() => handleQuickAction("ai_assistant")}>
                🤖 Asistente IA
              </button>
              <button onClick={() => handleQuickAction("dashboard")}>
                📊 Dashboard
              </button>
              <button onClick={() => handleQuickAction("faq")}>
                ❓ FAQ
              </button>
              <button onClick={() => handleQuickAction("call")}>
                📞 Llamar
              </button>
            </div>
          </div>

          <div className="info-card">
            <h3>📞 Otros Canales</h3>
            <div className="contact-methods">
              <div className="contact-item">
                <span>📧</span>
                <div>
                  <strong>Email</strong>
                  <p>soporte@prexcol.com</p>
                </div>
              </div>
              <div className="contact-item">
                <span>📱</span>
                <div>
                  <strong>Teléfono</strong>
                  <p>+57 300 123 4567</p>
                </div>
              </div>
              <div className="contact-item">
                <span>⏰</span>
                <div>
                  <strong>Horario</strong>
                  <p>Lun-Vie: 8am-6pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat en vivo */}
        <div className="ai-chat-panel">
          <div className="ai-chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`ai-message ${msg.type}`}>
                <div className="message-avatar">
                  {msg.type === "agent" ? "👨‍💼" : "👤"}
                </div>
                <div className="message-content">
                  <div className="message-bubble">
                    {msg.agentName && (
                      <div className="agent-name">{msg.agentName}</div>
                    )}
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
              <div className="ai-message agent">
                <div className="message-avatar">👨‍💼</div>
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
              placeholder="Escribe tu mensaje al agente..."
              className="chat-input"
            />
            <button onClick={handleSendMessage} className="send-button">
              Enviar →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
