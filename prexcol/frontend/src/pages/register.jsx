import React, { useState } from "react";
import { register } from "../services/authservices";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formValues, setFormValues] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    direccion: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formValues);
      alert("Registro exitoso");
      navigate("/login");
    } catch (error) {
      alert("Error en el registro");
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={formValues.nombre}
          onChange={(e) =>
            setFormValues({ ...formValues, nombre: e.target.value })
          }
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={formValues.email}
          onChange={(e) =>
            setFormValues({ ...formValues, email: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={formValues.password}
          onChange={(e) =>
            setFormValues({ ...formValues, password: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={formValues.telefono}
          onChange={(e) =>
            setFormValues({ ...formValues, telefono: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Dirección"
          value={formValues.direccion}
          onChange={(e) =>
            setFormValues({ ...formValues, direccion: e.target.value })
          }
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
