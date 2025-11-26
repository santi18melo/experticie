// frontend/src/pages/Dashboard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';

export default function Dashboard() {
  const { user, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 40 }}>
      <DashboardHeader title="Dashboard - PREXCOL" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
        <button
          onClick={() => navigate('/profile')}
          style={{
            padding: 20,
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            cursor: 'pointer',
            textAlign: 'left'
          }}
          data-testid="dashboard-profile"
        >
          <h3 style={{ marginBottom: 10 }}>👤 Perfil</h3>
          <p style={{ color: '#6b7280', fontSize: 14 }}>Ver y editar tu perfil</p>
        </button>

        <button
          onClick={() => navigate('/orders')}
          style={{
            padding: 20,
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            cursor: 'pointer',
            textAlign: 'left'
          }}
          data-testid="dashboard-orders"
        >
          <h3 style={{ marginBottom: 10 }}>📦 Pedidos</h3>
          <p style={{ color: '#6b7280', fontSize: 14 }}>Ver historial de pedidos</p>
        </button>

        <button
          onClick={() => navigate('/notifications')}
          style={{
            padding: 20,
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            cursor: 'pointer',
            textAlign: 'left'
          }}
          data-testid="dashboard-notifications"
        >
          <h3 style={{ marginBottom: 10 }}>🔔 Notificaciones</h3>
          <p style={{ color: '#6b7280', fontSize: 14 }}>Ver notificaciones</p>
        </button>

        <button
          onClick={() => navigate('/settings')}
          style={{
            padding: 20,
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            cursor: 'pointer',
            textAlign: 'left'
          }}
          data-testid="dashboard-settings"
        >
          <h3 style={{ marginBottom: 10 }}>⚙️ Configuración</h3>
          <p style={{ color: '#6b7280', fontSize: 14 }}>Ajustes de cuenta</p>
        </button>

        {(userRole === 'cliente' || userRole === 'comprador') && (
          <>
            <button
              onClick={() => navigate('/productos')}
              style={{
                padding: 20,
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                cursor: 'pointer',
                textAlign: 'left'
              }}
              data-testid="dashboard-products"
            >
              <h3 style={{ marginBottom: 10 }}>🛍️ Productos</h3>
              <p style={{ color: '#6b7280', fontSize: 14 }}>Ver catálogo de productos</p>
            </button>

            <button
              onClick={() => navigate('/cart')}
              style={{
                padding: 20,
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                cursor: 'pointer',
                textAlign: 'left'
              }}
              data-testid="dashboard-cart"
            >
              <h3 style={{ marginBottom: 10 }}>🛒 Carrito</h3>
              <p style={{ color: '#6b7280', fontSize: 14 }}>Ver carrito de compras</p>
            </button>
          </>
        )}

        {userRole === 'admin' && (
          <button
            onClick={() => navigate('/admin')}
            style={{
              padding: 20,
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              textAlign: 'left'
            }}
            data-testid="dashboard-admin"
          >
            <h3 style={{ marginBottom: 10 }}>⚡ Panel Admin</h3>
            <p style={{ fontSize: 14 }}>Ir al panel de administración</p>
          </button>
        )}
      </div>

      <div style={{ marginTop: 40, padding: 20, background: '#fef3c7', borderRadius: 8, border: '1px solid #fbbf24' }}>
        <h3 style={{ marginBottom: 10 }}>ℹ️ Información del Sistema</h3>
        <p style={{ fontSize: 14, color: '#78350f' }}>
          El sistema de autenticación está funcionando correctamente. Puedes navegar a las diferentes secciones usando los botones de arriba.
        </p>
      </div>
    </div>
  );
}
