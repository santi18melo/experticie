// src/pages/Settings.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "../context/I18nContext";
import { axiosInstance } from "../services/api";

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { locale, changeLocale } = useTranslation();
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderNotifications: true,
    marketingEmails: false,
    language: locale || "es",
    theme: theme || "light",
    currency: "COP"
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem("userSettings");
    if (savedSettings) {
      setSettings(prev => ({ ...prev, ...JSON.parse(savedSettings) }));
    }
  }, []);

  // Update local state when context changes (if changed from elsewhere)
  useEffect(() => {
    setSettings(prev => ({ ...prev, theme: theme, language: locale }));
  }, [theme, locale]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setSettings(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Apply changes immediately for detailed feedback
    if (name === 'theme') {
        setTheme(newValue);
    }
    if (name === 'language') {
        changeLocale(newValue);
    }
  };

  const handleSave = async () => {
    try {
      localStorage.setItem("userSettings", JSON.stringify(settings));
      
      // Also sync with backend if needed
      // await axiosInstance.post('/usuarios/preferencias/', settings);

      setSaved(true);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Error al guardar configuración");
    }
  };

  const handleDeactivateAccount = async () => {
    if (window.confirm("¿Seguro que deseas desactivar tu cuenta? Se enviará un correo de confirmación.")) {
      try {
        await axiosInstance.post('/usuarios/deactivate/');
        alert("Cuenta desactivada. Revisa tu correo confirmado la desactivación.");
        logout();
        navigate("/login");
      } catch (error) {
        console.error("Error deactivating:", error);
        alert("Error al desactivar: " + (error.response?.data?.error || "Error desconocido"));
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Configuración</h1>
        
        {/* User Info */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Información de Usuario</h2>
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <span style={styles.label}>Nombre:</span>
              <span style={styles.value}>{user?.nombre || "N/A"}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.label}>Email:</span>
              <span style={styles.value}>{user?.email || "N/A"}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.label}>Rol:</span>
              <span style={styles.value}>{user?.rol || "N/A"}</span>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Notificaciones</h2>
          <div style={styles.settingItem}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
                style={styles.checkbox}
              />
              Notificaciones por email
            </label>
          </div>
          <div style={styles.settingItem}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="orderNotifications"
                checked={settings.orderNotifications}
                onChange={handleChange}
                style={styles.checkbox}
              />
              Notificaciones de pedidos
            </label>
          </div>
          <div style={styles.settingItem}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="marketingEmails"
                checked={settings.marketingEmails}
                onChange={handleChange}
                style={styles.checkbox}
              />
              Emails de marketing
            </label>
          </div>
        </section>

        {/* Preferences */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Preferencias</h2>
          <div style={styles.settingItem}>
            <label style={styles.selectLabel}>
              Idioma:
              <select
                name="language"
                value={settings.language}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </label>
          </div>
          <div style={styles.settingItem}>
            <label style={styles.selectLabel}>
              Tema:
              <select
                name="theme"
                value={settings.theme}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="light">Claro</option>
                <option value="dark">Oscuro</option>
              </select>
            </label>
          </div>
          <div style={styles.settingItem}>
            <label style={styles.selectLabel}>
              Moneda:
              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="COP">COP (Pesos Colombianos)</option>
                <option value="USD">USD (Dólares)</option>
                <option value="EUR">EUR (Euros)</option>
              </select>
            </label>
          </div>
        </section>

        {/* Actions */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Acciones</h2>
          <div style={styles.buttonGroup}>
            <button onClick={handleSave} style={styles.saveButton}>
              {saved ? "✓ Guardado - Redirigiendo..." : "Guardar Cambios"}
            </button>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Cerrar Sesión
            </button>
            <button onClick={handleDeactivateAccount} style={styles.deleteButton}>
              Desactivar Cuenta
            </button>
          </div>
        </section>

        {saved && (
          <div style={styles.successMessage}>
            ✓ Configuración guardada correctamente. Redirigiendo al dashboard...
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "30px",
  },
  title: {
    fontSize: "32px",
    marginBottom: "30px",
    color: "#333",
  },
  section: {
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "1px solid #e0e0e0",
  },
  sectionTitle: {
    fontSize: "20px",
    marginBottom: "15px",
    color: "#555",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  label: {
    fontSize: "14px",
    color: "#888",
    fontWeight: "500",
  },
  value: {
    fontSize: "16px",
    color: "#333",
  },
  settingItem: {
    marginBottom: "15px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "16px",
    color: "#333",
    cursor: "pointer",
  },
  checkbox: {
    width: "20px",
    height: "20px",
    cursor: "pointer",
  },
  selectLabel: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    fontSize: "16px",
    color: "#333",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    backgroundColor: "#fff",
  },
  buttonGroup: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },
  saveButton: {
    padding: "12px 24px",
    background: "linear-gradient(135deg, #28a745, #20c997)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  },
  logoutButton: {
    padding: "12px 24px",
    background: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  deleteButton: {
    padding: "12px 24px",
    background: "#ffc107",
    color: "#333",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  },
  successMessage: {
    marginTop: "20px",
    padding: "15px",
    background: "#d4edda",
    color: "#155724",
    borderRadius: "6px",
    textAlign: "center",
    fontWeight: "600",
  },
};
