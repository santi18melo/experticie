import React, { useEffect, useState } from "react";
import UserService from "../services/userService";

export default function AdminUsersTable() {
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);

const loadUsers = async () => {
    try {
    const res = await UserService.getAllUsers();
    const data = Array.isArray(res)
        ? res
        : res.results || [];

    setUsers(data);
    } catch (err) {
    console.error("Error cargando usuarios:", err);
    } finally {
    setLoading(false);
    }
};

useEffect(() => {
    loadUsers();
}, []);

if (loading) return <p>Cargando usuarios...</p>;

return (
    <div className="table-wrapper">
    <table className="adm-table">
        <thead>
        <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Último ingreso</th>
        </tr>
        </thead>

        <tbody>
        {users.length === 0 && (
            <tr>
            <td colSpan="6" style={{ textAlign: "center" }}>
                No hay usuarios registrados
            </td>
            </tr>
        )}

        {users.map((u) => (
            <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.email}</td>
            <td>{u.nombre}</td>
            <td>{u.rol}</td>
            <td>{u.estado}</td>
            <td>{u.ultimo_ingreso || "—"}</td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
);
}
