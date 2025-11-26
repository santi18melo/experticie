// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/userService";
import Loader from "../components/Loader";
import "../styles/Profile.css";

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
    imagen: null, // URL or File object
  });
  
  const [previewImage, setPreviewImage] = useState(null);

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
        imagen: data.imagen || null,
      });
      if (data.imagen) {
        setPreviewImage(data.imagen);
      }
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({ ...profileData, imagen: file });
      setPreviewImage(URL.createObjectURL(file));
    }
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

      // Prepare FormData
      const formData = new FormData();
      formData.append("nombre", profileData.nombre);
      formData.append("email", profileData.email);
      formData.append("telefono", profileData.telefono);
      formData.append("direccion", profileData.direccion);
      
      // Only append image if it's a File object (new upload)
      if (profileData.imagen instanceof File) {
        formData.append("imagen", profileData.imagen);
      }

      // Update profile
      const updated = await UserService.updateProfile(formData);
      
      setProfileData({
        nombre: updated.nombre || "",
        email: updated.email || "",
        telefono: updated.telefono || "",
        direccion: updated.direccion || "",
        rol: updated.rol || "",
        imagen: updated.imagen || null,
      });
      
      if (updated.imagen) {
        setPreviewImage(updated.imagen);
      }

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
  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Cover Image / Header */}
        <div className="profile-cover">
          {!editing && (
            <button onClick={() => setEditing(true)} className="btn-edit-profile-floating">
              ✏️ Editar Perfil
            </button>
          )}
        </div>

        <div className="profile-content">
          <form onSubmit={handleSave}>
            {/* Profile Picture Section */}
            <div className="profile-header-info">
               <div className="image-wrapper">
                  {previewImage ? (
                    <img 
                      src={previewImage.startsWith('http') || previewImage.startsWith('blob') ? previewImage : `http://127.0.0.1:8000${previewImage}`} 
                      alt="Perfil" 
                      className="profile-img-large" 
                    />
                  ) : (
                    <div className="profile-placeholder-large">
                      {profileData.nombre?.charAt(0) || "U"}
                    </div>
                  )}
                  
                  {editing && (
                    <label htmlFor="imagen-upload" className="image-upload-btn" title="Cambiar foto">
                      <span>📷</span>
                      <input
                        id="imagen-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                    </label>
                  )}
               </div>

               {/* Name and Role Display (View Mode) */}
               {!editing ? (
                 <div className="profile-identity">
                   <h1 className="profile-name">{profileData.nombre}</h1>
                   <span className="profile-role-badge">{profileData.rol.toUpperCase()}</span>
                 </div>
               ) : (
                 <div className="profile-identity-edit">
                   <input
                     type="text"
                     name="nombre"
                     value={profileData.nombre}
                     onChange={handleInputChange}
                     className="form-input input-name-edit"
                     placeholder="Tu Nombre"
                     required
                   />
                 </div>
               )}
            </div>

            {/* Alerts */}
            {error && (
              <div className="alert alert-error">
                <span>⚠️</span> {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success">
                <span>✓</span> {success}
              </div>
            )}

            {/* Info Section */}
            <div className="profile-details-section">
              <h3 className="section-title">Información de Contacto</h3>
              
              <div className="profile-form-grid">
                <div className="form-group">
                  <label>Email</label>
                  <div className="input-with-icon">
                    <span className="input-icon">✉️</span>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={!editing}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Teléfono</label>
                  <div className="input-with-icon">
                    <span className="input-icon">📱</span>
                    <input
                      type="tel"
                      name="telefono"
                      value={profileData.telefono}
                      onChange={handleInputChange}
                      disabled={!editing}
                      className="form-input"
                      placeholder="Agrega un teléfono"
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>Dirección</label>
                  <div className="input-with-icon">
                    <span className="input-icon">📍</span>
                    <textarea
                      name="direccion"
                      value={profileData.direccion}
                      onChange={handleInputChange}
                      disabled={!editing}
                      rows="2"
                      className="form-input form-textarea"
                      placeholder="Agrega tu dirección"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            {editing && (
              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-cancel"
                  disabled={saving}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-save" disabled={saving}>
                  {saving ? "Guardando..." : "💾 Guardar Cambios"}
                </button>
              </div>
            )}
          </form>

          <div className="back-section">
            <button onClick={() => navigate("/")} className="btn-back">
              ← Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
