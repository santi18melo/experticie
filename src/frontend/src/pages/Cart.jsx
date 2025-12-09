import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartService from "../services/cartService";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const items = CartService.getCart();
    setCartItems(items);
    setTotal(CartService.getCartTotal());
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    CartService.updateQuantity(productId, newQuantity);
    loadCart();
  };

  const handleRemoveItem = (productId) => {
    if (window.confirm("¿Eliminar este producto del carrito?")) {
      CartService.removeFromCart(productId);
      loadCart();
    }
  };

  const handleClearCart = () => {
    if (window.confirm("¿Vaciar todo el carrito?")) {
      CartService.clearCart();
      loadCart();
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("El carrito está vacío");
      return;
    }
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.emptyCart}>
          <h2>Carrito Vacío</h2>
          <p>No has agregado productos al carrito</p>
          <button onClick={() => navigate("/productos")} style={styles.button}>
            Ver Productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2>Carrito de Compras</h2>
          <button onClick={handleClearCart} style={styles.clearButton}>
            Vaciar Carrito
          </button>
        </div>

        <div style={styles.itemsList}>
          {cartItems.map((item) => (
            <div key={item.product.id} style={styles.cartItem}>
              <div style={styles.productInfo}>
                <h3>{item.product.nombre}</h3>
                <p style={styles.price}>
                  ${parseFloat(item.product.precio).toFixed(2)}
                </p>
              </div>

              <div style={styles.quantityControls}>
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.product.id, item.quantity - 1)
                  }
                  style={styles.qtyButton}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span style={styles.quantity}>{item.quantity}</span>
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.product.id, item.quantity + 1)
                  }
                  style={styles.qtyButton}
                >
                  +
                </button>
              </div>

              <div style={styles.subtotal}>
                ${(parseFloat(item.product.precio) * item.quantity).toFixed(2)}
              </div>

              <button
                onClick={() => handleRemoveItem(item.product.id)}
                style={styles.removeButton}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div style={styles.footer}>
          <div style={styles.totalSection}>
            <h3>Total:</h3>
            <h2 style={styles.totalAmount}>${total.toFixed(2)}</h2>
          </div>

          <div style={styles.actions}>
            <button
              onClick={() => navigate("/productos")}
              style={styles.continueButton}
            >
              Continuar Comprando
            </button>
            <button onClick={handleCheckout} style={styles.checkoutButton}>
              Proceder al Pago
            </button>
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
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    borderBottom: "2px solid #f0f0f0",
    paddingBottom: "15px",
  },
  clearButton: {
    padding: "8px 16px",
    background: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  itemsList: {
    marginBottom: "30px",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px",
    borderBottom: "1px solid #e0e0e0",
    gap: "20px",
  },
  productInfo: {
    flex: 2,
  },
  price: {
    color: "#666",
    marginTop: "5px",
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  qtyButton: {
    width: "30px",
    height: "30px",
    border: "1px solid #ddd",
    background: "#f8f9fa",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  quantity: {
    minWidth: "40px",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "600",
  },
  subtotal: {
    fontWeight: "600",
    fontSize: "18px",
    minWidth: "100px",
    textAlign: "right",
  },
  removeButton: {
    width: "30px",
    height: "30px",
    background: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  footer: {
    borderTop: "2px solid #f0f0f0",
    paddingTop: "20px",
  },
  totalSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  totalAmount: {
    color: "#28a745",
    fontSize: "32px",
  },
  actions: {
    display: "flex",
    gap: "15px",
    justifyContent: "flex-end",
  },
  continueButton: {
    padding: "12px 24px",
    background: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  checkoutButton: {
    padding: "12px 24px",
    background: "linear-gradient(135deg, #28a745, #20c997)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    boxShadow: "0 4px 12px rgba(40,167,69,0.3)",
  },
  emptyCart: {
    textAlign: "center",
    padding: "60px 20px",
  },
  button: {
    marginTop: "20px",
    padding: "12px 24px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};
