import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import AdminUsersTab from "../components/admin/tabs/AdminUsersTab";
import AdminStoresTab from "../components/admin/tabs/AdminStoresTab";
import AdminProductsTab from "../components/admin/tabs/AdminProductsTab";
import AdminOrdersTab from "../components/admin/tabs/AdminOrdersTab";
import UserService from "../services/userService";
import productosService from "../services/productosService";
import SimpleChart from "../components/admin/SimpleChart";
import "../styles/dashboardAdmin.css";

const tabs = [
  { id: "users", label: "Usuarios", Component: AdminUsersTab },
  { id: "stores", label: "Tiendas", Component: AdminStoresTab },
  { id: "products", label: "Productos", Component: AdminProductsTab },
  { id: "orders", label: "Pedidos", Component: AdminOrdersTab },
];

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  
  // Data State
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Stats State
  const [stats, setStats] = useState({ users: 0, stores: 0, products: 0, orders: 0 });

  // Fetch Data per Tab
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
        if (activeTab === 'users') {
             const u = await UserService.getAllUsers();
             setUsers(u || []);
        } else if (activeTab === 'stores') {
             const t = await productosService.getTiendas();
             setStores(t || []);
        } else if (activeTab === 'products') {
             const [p, t, prov] = await Promise.all([
                 productosService.getProductos(),
                 productosService.getTiendas(),
                 UserService.getProveedores()
             ]);
             setProducts(p || []);
             setStores(t || []);
             setProviders(prov || []);
        } else if (activeTab === 'orders') {
             const o = await productosService.getPedidos();
             setOrders(o || []);
        }
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
    } finally {
        setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Fetch Stats on Mount
  useEffect(() => {
    const loadStats = async () => {
        try {
            const [u, s, p, o] = await Promise.all([
                UserService.getAllUsers(),
                productosService.getTiendas(),
                productosService.getProductos(),
                productosService.getPedidos()
            ]);
            setStats({
                users: u?.length || 0,
                stores: s?.length || 0,
                products: p?.length || 0,
                orders: o?.length || 0
            });
        } catch (e) {
            console.error("Error loading stats:", e);
        }
    };
    loadStats();
  }, []);

  // Handlers
  const handleUserCreate = async (data) => {
    try {
        await UserService.createUser(data);
        await fetchData();
    } catch (error) {
        console.error("Failed to create user:", error);
        alert("Error al crear usuario: " + (error.response?.data?.detail || error.message));
    }
  };

  const handleUserUpdate = async (data) => {
    try {
        const { id, ...updateData } = data; // Separate ID from data
        await UserService.updateUser(id, updateData);
        await fetchData();
    } catch (error) {
        console.error("Failed to update user:", error);
        alert("Error al actualizar usuario: " + (error.response?.data?.detail || error.message));
    }
  };

   const handleUserDelete = async (id) => {
    if(!window.confirm("¿Estás seguro de eliminar este usuario?")) return;
    try {
        await UserService.deleteUser(id);
        await fetchData();
    } catch (error) {
        console.error("Failed to delete user:", error);
         alert("Error al eliminar usuario: " + (error.response?.data?.detail || error.message));
    }
  };
  
  const getComponentProps = () => {
      switch(activeTab) {
          case 'users':
              return { 
                  usuarios: users, 
                  loading, 
                  onCreate: handleUserCreate, 
                  onUpdate: handleUserUpdate, 
                  onDelete: handleUserDelete 
              };
          case 'stores':
              return { 
                  tiendas: stores, 
                  loading,
                  onCreate: async (d) => { await productosService.crearTienda(d); fetchData(); },
                  onUpdate: async (d) => { await productosService.actualizarTienda(d.id, d); fetchData(); },
                  onDelete: async (id) => { await productosService.eliminarTienda(id); fetchData(); }
              };
          case 'products':
              return { 
                  productos: products, 
                  loading,
                  tiendas: stores,
                  proveedores: providers,
                  onCreate: async (d) => { await productosService.crearProducto(d); fetchData(); },
                  onUpdate: async (d) => { await productosService.actualizarProducto(d.id, d); fetchData(); },
                  onDelete: async (id) => { await productosService.eliminarProducto(id); fetchData(); }
              };
          case 'orders':
              return { 
                  pedidos: orders, 
                  loading,
                  onUpdate: async (d) => { await productosService.cambiarEstadoPedido(d.id, d.estado); fetchData(); }
              };
          default:
              return {};
      }
  };

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.Component || (() => <div>Tab not found</div>);
  const activeProps = getComponentProps();

  return (
    <div className="dashboard-admin">
      <DashboardHeader title="Panel de Administración" />
      
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
