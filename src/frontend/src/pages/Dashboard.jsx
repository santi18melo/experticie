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
import PanelCliente from '../components/clientes/PanelCliente'; // Import full client panel

// Import styles (using the professional admin styles for consistency)
import '../styles/dashboardAdmin.css';

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
      return <CompradorDashboard />; // Or UnifiedDashboard if that's the intention
    case 'logistica':
      return <UnifiedDashboard />;
    case 'cliente':
    default:
      return <PanelCliente />; // Use the functional component
  }
}
