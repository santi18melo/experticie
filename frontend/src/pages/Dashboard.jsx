// frontend/src/pages/Dashboard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';

// Import specialized dashboards
import DashboardAdmin from './dashboardAdmin.jsx';
import CompradorDashboard from './CompradorDashboard';
import UnifiedDashboard from './UnifiedDashboard';
import ProveedorDashboard from './ProveedorDashboard';

// Import styles (using the professional admin styles for consistency)
import '../styles/dashboardAdmin.css';

// Default Dashboard for Clients (or generic users)
const ClienteDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard"> {/* Reusing the layout class for consistent styling */}
      <DashboardHeader title="Dashboard - PREXCOL" />

      {/* Welcome Section */}
      <div className="stats-grid">
         <div className="stat-card" style={{ gridColumn: '1 / -1' }}>
           <div className="stat-icon">👋</div>
           <div className="stat-content">
             <h3>Hola, {user?.nombre || 'Cliente'}</h3>
             <p>Bienvenido a tu panel personal</p>
             <span className="stat-detail">Explora nuestros productos y gestiona tus pedidos</span>
           </div>
         </div>
      </div>

      <div className="tab-content">
        <div className="content-section">
            <div className="section-header">
                <h2>Acceso Rápido</h2>
            </div>
            <div className="grid-cards">
                <div 
                    className="info-card" 
                    onClick={() => navigate('/productos')} 
                    style={{cursor: 'pointer', borderColor: '#3b82f6'}}
                >
                    <h3 style={{color: '#1d4ed8'}}>🛍️ Catálogo</h3>
                    <p>Explora nuestra variedad de productos y realiza tus compras.</p>
                </div>
                
                <div 
                    className="info-card" 
                    onClick={() => navigate('/cart')} 
                    style={{cursor: 'pointer', borderColor: '#10b981'}}
                >
                    <h3 style={{color: '#047857'}}>🛒 Mi Carrito</h3>
                    <p>Revisa y finaliza los productos que has seleccionado.</p>
                </div>
                
                <div 
                    className="info-card" 
                    onClick={() => navigate('/orders')} 
                    style={{cursor: 'pointer', borderColor: '#f59e0b'}}
                >
                    <h3 style={{color: '#b45309'}}>📦 Mis Pedidos</h3>
                    <p>Rastrea el estado de tus envíos y revisa tu historial.</p>
                </div>
                
                <div 
                    className="info-card" 
                    onClick={() => navigate('/profile')} 
                    style={{cursor: 'pointer', borderColor: '#6366f1'}}
                >
                    <h3 style={{color: '#4338ca'}}>👤 Mi Perfil</h3>
                    <p>Actualiza tu información personal y preferencias.</p>
                </div>

                <div 
                    className="info-card" 
                    onClick={() => navigate('/notifications')} 
                    style={{cursor: 'pointer', borderColor: '#8b5cf6'}}
                >
                    <h3 style={{color: '#6d28d9'}}>🔔 Notificaciones</h3>
                    <p>Mantente al día con las últimas novedades.</p>
                </div>

                <div 
                    className="info-card" 
                    onClick={() => navigate('/settings')} 
                    style={{cursor: 'pointer', borderColor: '#64748b'}}
                >
                    <h3 style={{color: '#334155'}}>⚙️ Configuración</h3>
                    <p>Ajusta la configuración de tu cuenta.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
      return (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando...</p>
        </div>
      );
  }

  if (!user) {
      return null; 
  }

  // Role-based rendering
  switch (user.rol) {
    case 'admin':
      return <DashboardAdmin />;
    case 'proveedor':
      return <ProveedorDashboard />;
    case 'comprador':
      return <CompradorDashboard />;
    case 'logistica':
      return <UnifiedDashboard />;
    case 'cliente':
    default:
      return <ClienteDashboard />;
  }
}
