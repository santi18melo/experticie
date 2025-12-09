// src/pages/Checkout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartService from "../services/cartService";
import OrderService from "../services/orderService";

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    tienda_id: 1, // Default store ID - ajustar según lógica de negocio
    notas: "",
    direccion_envio: "",
    metodo_pago: "tarjeta",
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const items = CartService.getCart();
    if (items.length === 0) {
      navigate("/cart");
      return;
    }
    setCartItems(items);
    setTotal(CartService.getCartTotal());

    // Set tienda_id from the first item if available
    if (items.length > 0 && items[0].product.tienda) {
      setFormData(prev => ({ ...prev, tienda_id: items[0].product.tienda }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate form
      if (!formData.direccion_envio.trim()) {
        throw new Error("La dirección de envío es requerida");
      }

      // Prepare order data for backend (with payment info)
      const total = CartService.getCartTotal();
      const orderData = {
        tienda_id: formData.tienda_id,
        detalles: cartItems.map((item) => ({
          producto: item.product.id,
          cantidad: item.quantity,
        })),
        notas: formData.notas || "",
        metodo_pago: formData.metodo_pago === "tarjeta" ? "Tarjeta de Crédito" : 
                     formData.metodo_pago === "efectivo" ? "Efectivo" : "Transferencia",
        monto_pago: total,
      };

      // Sending order to backend

      // Create order
      const response = await OrderService.createOrder(orderData);

      // Order created successfully

      // Clear cart
      CartService.clearCart();

      // Show success
      setSuccess(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/orders");
      }, 2000);
    } catch (err) {
      console.error("Error creating order:", err);
      const errorMsg =
        err?.response?.data?.error ||
        err?.response?.data?.detail ||
        err?.message ||
        "Error al procesar el pedido. Intente nuevamente.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={styles.container}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}>✅</div>
          <h2>¡Pedido Realizado con Éxito!</h2>
          <p>Tu pedido ha sido procesado correctamente.</p>
          <p>Redirigiendo al historial de pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Finalizar Compra</h2>

        <div style={styles.layout}>
          {/* Order Summary */}
          <div style={styles.summary}>
            <h3>Resumen del Pedido</h3>
            <div style={styles.itemsList}>
              {cartItems.map((item) => (
                <div key={item.product.id} style={styles.summaryItem}>
                  <span>{item.product.nombre}</span>
                  <span>x{item.quantity}</span>
                  <span style={styles.itemPrice}>
                    ${(parseFloat(item.product.precio) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div style={styles.totalRow}>
              <strong>Total:</strong>
              <strong style={styles.totalAmount}>${total.toFixed(2)}</strong>
            </div>
          </div>

            <div style={styles.formSection}>
              <form onSubmit={handleSubmitOrder}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Dirección de Envío</label>
                  <textarea
                    name="direccion_envio"
                    value={formData.direccion_envio}
                    onChange={handleInputChange}
                    rows="3"
                    style={styles.textarea}
                    placeholder="Calle, Número, Ciudad, Código Postal"
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Método de Pago</label>
                  <select
                    name="metodo_pago"
                    value={formData.metodo_pago}
                    onChange={handleInputChange}
                    style={styles.select}
                  >
                  <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                  <option value="efectivo">Efectivo contra entrega</option>
                  <option value="transferencia">Transferencia Bancaria</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Notas Adicionales (Opcional)</label>
                <textarea
                  name="notas"
                  value={formData.notas}
                  onChange={handleInputChange}
                  rows="3"
                  style={styles.textarea}
                  placeholder="Instrucciones especiales, preferencias de entrega, etc."
                />
              </div>

              {error && <div style={styles.error}>{error}</div>}

              <div style={styles.actions}>
                <button
                  type="button"
                  onClick={() => navigate("/cart")}
                  style={styles.backButton}
                  disabled={loading}
                >
                  Volver al Carrito
                </button>
                <button
                  type="submit"
                  style={styles.submitButton}
                  disabled={loading}
                >
                  {loading ? "Procesando..." : "Confirmar Pedido"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "30px",
  },
  title: {
    fontSize: "28px",
    marginBottom: "30px",
    color: "#333",
    borderBottom: "2px solid #f0f0f0",
    paddingBottom: "15px",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 1.5fr",
    gap: "30px",
  },
  summary: {
    background: "#f8f9fa",
    padding: "20px",
    borderRadius: "8px",
    height: "fit-content",
  },
  itemsList: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  summaryItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #e0e0e0",
    gap: "10px",
  },
  itemPrice: {
    fontWeight: "600",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 0",
    borderTop: "2px solid #333",
    fontSize: "18px",
  },
  totalAmount: {
    color: "#28a745",
    fontSize: "24px",
  },
  formSection: {
    padding: "20px",
  },
  formGroup: {
    marginBottom: "25px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#333",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "15px",
    fontFamily: "inherit",
    resize: "vertical",
  },
  select: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "15px",
  },
  error: {
    padding: "15px",
    background: "#f8d7da",
    color: "#721c24",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid #f5c6cb",
  },
  actions: {
    display: "flex",
    gap: "15px",
    justifyContent: "flex-end",
    marginTop: "30px",
  },
  backButton: {
    padding: "12px 24px",
    background: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  submitButton: {
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
  successCard: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "60px 40px",
    textAlign: "center",
  },
  successIcon: {
    fontSize: "64px",
    marginBottom: "20px",
  },
};
