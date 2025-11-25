import React, { useEffect, useState } from "react";
import { authAxios, logout } from "../services/authservices";
import "../styles/dashboardAdmin.css";
import HeaderAdmin from "../components/admin/HeaderAdmin";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formValues, setFormValues] = useState({
    id: null,
    nombre: "",
    email: "",
    password: "",
    rol: "cliente",
    telefono: "",
    direccion: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  // ===================== LOGOUT ======================
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ===================== FETCH USUARIOS ======================
  const fetchUsuarios = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await authAxios.get("/usuarios/");
      const data = res.data.results ? res.data.results : res.data;
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err.response?.status === 403) {
        setError("❌ No tienes permisos para ver usuarios. Debes estar logueado como admin.");
      } else if (err.response?.status === 401) {
        setError("⚠️ Tu sesión expiró. Recarga la página y vuelve a loguearte.");
      } else {
        setError("Error al cargar usuarios: " + (err.response?.data?.detail || err.message));
      }
    } finally {
      setLoading(false);
    }
  };

  // ===================== SUBMIT FORM ======================
const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
        await authAxios.post("/usuarios/", formValues);
        setSuccess("Usuario creado exitosamente");

        setTimeout(() => {
            fetchUsuarios();
            resetForm();
        }, 500);

    } catch (err) {
        const errorMsg =
            err.response?.data?.detail ||
            err.response?.data?.email?.[0] ||
            err.response?.data?.nombre?.[0] ||
            err.response?.data?.non_field_errors?.[0] ||
            err.message;

        setError("❌ Error: " + errorMsg);
    }
};

  // ===================== EDITAR ======================
  const handleEdit = (user) => {
    setFormValues({ ...user, password: "" });
    setIsEditing(true);
    setError("");
    setSuccess("");
  };

  // ===================== ELIMINAR ======================
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    setError("");
    setSuccess("");

    try {
      await authAxios.delete(`/usuarios/${id}/`);
      setSuccess("Usuario eliminado exitosamente");
      setTimeout(fetchUsuarios, 500);
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message;
      setError("❌ Error al eliminar: " + errorMsg);
    }
  };

  // ===================== TOGGLE ESTADO ======================
  const toggleEstado = async (id, currentEstado) => {
    try {
      const newEstado = !currentEstado;
      await authAxios.patch(`/usuarios/${id}/`, { estado: newEstado });

      setSuccess(currentEstado ? "✓ Usuario desactivado" : "✓ Usuario activado");
      setTimeout(fetchUsuarios, 500);
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message;
      setError("❌ Error al cambiar estado: " + errorMsg);
    }
  };

  // ===================== RESET FORM ======================
  const resetForm = () => {
    setFormValues({
      id: null,
      nombre: "",
      email: "",
      password: "",
      rol: "cliente",
      telefono: "",
      direccion: "",
    });
    setIsEditing(false);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  // ===================== RENDER ======================
  return (
    <>
      {/* HEADER */}
      <HeaderAdmin onLogout={handleLogout} />

      {/* DASHBOARD CONTENT */}
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h1>📊 Panel de Administración</h1>
          <p>Gestiona usuarios, roles y permisos</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {/* === LISTA DE USUARIOS === */}
        <div className="usuarios-section">
          <h2>👥 Lista de Usuarios</h2>

          {loading ? (
            <p>Cargando usuarios...</p>
          ) : (
            <table className="usuarios-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Teléfono</th>
                  <th>Direccion</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {usuarios.length === 0 ? (
                  <tr>
                    <td colSpan="8">No hay usuarios registrados</td>
                  </tr>
                ) : (
                  usuarios.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.nombre}</td>
                      <td>{user.email}</td>
                      <td>{user.rol}</td>
                      <td>{user.telefono || "—"}</td>
                      <td>{user.direccion || "—"}</td>

                      <td>
                        <span
                          className={`estado ${user.estado ? "activo" : "inactivo"}`}
                        >
                          {user.estado ? "Activo" : "Inactivo"}
                        </span>
                      </td>

                      <td>
                        <button className="btn-edit" onClick={() => handleEdit(user)}>
                          ✏️ Editar
                        </button>

                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(user.id)}
                        >
                          🗑 Eliminar
                        </button>

                        <button
                          className="btn-toggle"
                          onClick={() => toggleEstado(user.id, user.estado)}
                        >
                          {user.estado ? "Desactivar" : "Activar"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
