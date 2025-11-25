// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/userService";
import Loader from "../components/Loader";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    rol: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await UserService.getProfile();
      setProfileData({
        nombre: data.nombre || "",
        email: data.email || "",
        telefono: data.telefono || "",
        direccion: data.direccion || "",
        rol: data.rol || "",
      });
    } catch (err) {
      console.error("Error loading profile:", err);
      setError("Error al cargar el perfil. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      // Validate form
      if (!profileData.nombre.trim()) {
        throw new Error("El nombre es requerido");
      }
      if (!profileData.email.trim()) {
        throw new Error("El email es requerido");
      }

      // Update profile
      const updated = await UserService.updateProfile(profileData);
      
      setProfileData({
        nombre: updated.nombre || "",
        email: updated.email || "",
        telefono: updated.telefono || "",
        direccion: updated.direccion || "",
        rol: updated.rol || "",
      });

      setSuccess("Perfil actualizado correctamente");
      setEditing(false);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error updating profile:", err);
      const errorMsg =
        err?.response?.data?.error ||
        err?.response?.data?.detail ||
        err?.message ||
        "Error al actualizar el perfil";
      setError(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    loadProfile(); // Reload original data
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2>Mi Perfil</h2>
          {!editing && (
            <button onClick={() => setEditing(true)} style={styles.editButton}>
              ✏️ Editar
            </button>
          )}
        </div>

        <form onSubmit={handleSave}>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Nombre Completo *</label>
              <input
                type="text"
                name="nombre"
                value={profileData.nombre}
                onChange={handleInputChange}
                disabled={!editing}
                required
                style={editing ? styles.input : styles.inputDisabled}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email *</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                disabled={!editing}
                required
                style={editing ? styles.input : styles.inputDisabled}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={profileData.telefono}
                onChange={handleInputChange}
                disabled={!editing}
                style={editing ? styles.input : styles.inputDisabled}
                placeholder="Ej: +57 300 1234567"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Rol</label>
              <input
                type="text"
                name="rol"
                value={profileData.rol}
                disabled
                style={styles.inputDisabled}
              />
            </div>

            <div style={{ ...styles.formGroup, gridColumn: "1 / -1" }}>
              <label style={styles.label}>Dirección</label>
              <textarea
                name="direccion"
                value={profileData.direccion}
                onChange={handleInputChange}
                disabled={!editing}
                rows="3"
                style={editing ? styles.textarea : styles.textareaDisabled}
                placeholder="Ingrese su dirección completa"
              />
            </div>
          </div>

          {error && <div style={styles.error}>{error}</div>}
          {success && <div style={styles.success}>{success}</div>}

          {editing && (
            <div style={styles.actions}>
              <button
                type="button"
                onClick={handleCancel}
                style={styles.cancelButton}
                disabled={saving}
              >
                Cancelar
              </button>
              <button type="submit" style={styles.saveButton} disabled={saving}>
                {saving ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          )}
        </form>

        <div style={styles.additionalActions}>
          <button
            onClick={() => navigate("/")}
            style={styles.backButton}
          >
            ← Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "30px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    borderBottom: "2px solid #f0f0f0",
    paddingBottom: "15px",
  },
  editButton: {
    padding: "8px 16px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "8px",
    fontWeight: "600",
    color: "#333",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "15px",
  },
  inputDisabled: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    fontSize: "15px",
    background: "#f8f9fa",
    color: "#666",
  },
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "15px",
    fontFamily: "inherit",
    resize: "vertical",
  },
  textareaDisabled: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    fontSize: "15px",
    fontFamily: "inherit",
    background: "#f8f9fa",
    color: "#666",
    resize: "vertical",
  },
  error: {
    padding: "15px",
    background: "#f8d7da",
    color: "#721c24",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid #f5c6cb",
  },
  success: {
    padding: "15px",
    background: "#d4edda",
    color: "#155724",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid #c3e6cb",
  },
  actions: {
    display: "flex",
    gap: "15px",
    justifyContent: "flex-end",
    marginTop: "30px",
  },
  cancelButton: {
    padding: "12px 24px",
    background: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  saveButton: {
    padding: "12px 32px",
    background: "linear-gradient(135deg, #28a745, #20c997)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    boxShadow: "0 4px 12px rgba(40,167,69,0.3)",
  },
  additionalActions: {
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #e0e0e0",
  },
  backButton: {
    padding: "10px 20px",
    background: "#f8f9fa",
    color: "#333",
    border: "1px solid #ddd",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
};
