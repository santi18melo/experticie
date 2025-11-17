import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const token = localStorage.getItem('token');

  // 🔥 useEffect SIN WARNING y SIN VARIABLES SIN USAR
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const p = await api.getProductoById(token, id);
        setProducto(p);
      } catch (err) {
        console.error("Error cargando producto:", err);
      }
    };

    fetchProducto();
  }, [id, token]);

  // 🔥 Función para agregar al carrito
  const agregarAlCarrito = (prod) => {
    const existe = carrito.find(p => p.id === prod.id);
    if (existe) {
      setCarrito(
        carrito.map(p =>
          p.id === prod.id ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      );
    } else {
      setCarrito([...carrito, { ...prod, cantidad: 1 }]);
    }
  };

  if (!producto) return <p>Cargando...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => window.history.back()}>← Volver</button>

      {producto.imagen_url && (
        <img
          src={producto.imagen_url}
          alt={producto.nombre}
          style={{
            width: "200px",
            height: "200px",
            objectFit: "cover",
            borderRadius: "10px",
            marginTop: "10px"
          }}
        />
      )}

      <h2>{producto.nombre}</h2>
      <p><b>Precio:</b> ${producto.precio}</p>
      <p><b>Stock:</b> {producto.stock}</p>
      <p><b>Categoría:</b> {producto.categoria || "Sin categoría"}</p>
      <p><b>Producto básico:</b> {producto.es_basico ? "Sí" : "No"}</p>
      <p><b>Proveedor:</b> {producto.proveedor_nombre || "No disponible"}</p>

      <p style={{ marginTop: "15px" }}>
        <b>Descripción:</b> {producto.descripcion}
      </p>

      <button
        onClick={() => agregarAlCarrito(producto)}
        disabled={producto.stock === 0}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Agregar al carrito
      </button>

      {carrito.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3>Carrito</h3>
          <ul>
            {carrito.map(item => (
              <li key={item.id}>
                {item.nombre} x{item.cantidad} = ${item.precio * item.cantidad}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DetalleProducto;
