

import { useNavigate } from "react-router-dom";
import SimpleChart from "../components/admin/SimpleChart";

// ... existing code ...

export default function DashboardAdmin() {
  const navigate = useNavigate(); // Add hook
  // ... existing code ...

  return (
    <div className="dashboard-admin">
      <div className="admin-header-content">
          <h1 className="dashboard-admin__title">Panel de Administración</h1>
      </div>
      
      {/* Overview Section: Stats + Quick Actions */}
      <div className="overview-section" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', padding: '0 40px', marginBottom: '30px' }}>
          
          {/* Stats Grid */}
          <div className="stats-grid" style={{ padding: 0, margin: 0, gridTemplateColumns: 'repeat(2, 1fr)' }}>
             <div className="stat-card">
               <div className="stat-icon">👥</div>
               <div className="stat-content">
                 <h3>{stats.users}</h3>
                 <p>Usuarios</p>
               </div>
             </div>
             <div className="stat-card">
               <div className="stat-icon">🏪</div>
               <div className="stat-content">
                 <h3>{stats.stores}</h3>
                 <p>Tiendas</p>
               </div>
             </div>
             <div className="stat-card">
               <div className="stat-icon">📦</div>
               <div className="stat-content">
                 <h3>{stats.products}</h3>
                 <p>Productos</p>
               </div>
             </div>
             <div className="stat-card">
               <div className="stat-icon">🧾</div>
               <div className="stat-content">
                 <h3>{stats.orders}</h3>
                 <p>Pedidos</p>
               </div>
             </div>
          </div>

          {/* Quick Actions & Charts */}
          <div className="actions-chart-column" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Quick Actions Card */}
              <div className="content-section" style={{ padding: '20px', borderRadius: '16px', animation: 'none' }}>
                  <h3 style={{ margin: '0 0 15px 0', fontSize: '1.1rem' }}>⚡ Acciones Rápidas</h3>
                  <button 
                    className="btn-primary" 
                    style={{ width: '100%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                    onClick={() => navigate('/admin/asignar-productos')}
                  >
                    <span>🔗</span> Asignar Productos Masivo
                  </button>
                  <button 
                    className="btn-primary" 
                    style={{ width: '100%', background: '#fff', color: '#3182ce', border: '1px solid #3182ce' }}
                    onClick={() => setActiveTab('orders')}
                  >
                    <span>🧾</span> Ver Últimos Pedidos
                  </button>
              </div>

              {/* Activity Chart */}
              <div className="content-section" style={{ padding: '20px', borderRadius: '16px', animation: 'none', background: 'linear-gradient(135deg, #2b6cb0 0%, #2c5282 100%)', color: 'white' }}>
                 <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: 'white' }}>📈 Actividad Reciente</h3>
                 <SimpleChart values={[3, 7, 5, 10, 8, 12, 9]} />
              </div>

          </div>
      </div>
      
      <nav className="dashboard-admin__nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`dashboard-admin__tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <section className="dashboard-admin__content">
        <ActiveComponent {...activeProps} />
      </section>
    </div>
  );
}
