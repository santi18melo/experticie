

import React, { useState, useEffect, useCallback } from "react";
import AdminUsersTab from "../components/admin/tabs/AdminUsersTab";
import AdminStoresTab from "../components/admin/tabs/AdminStoresTab";
import AdminProductsTab from "../components/admin/tabs/AdminProductsTab";
import AdminOrdersTab from "../components/admin/tabs/AdminOrdersTab";
import UserService from "../services/userService";
import productosService from "../services/productosService";
import "../styles/dashboardAdmin.css";

const tabs = [
  { id: "users", label: "Usuarios", Component: AdminUsersTab },
  { id: "stores", label: "Tiendas", Component: AdminStoresTab },
  { id: "products", label: "Productos", Component: AdminProductsTab },
  { id: "orders", label: "Pedidos", Component: AdminOrdersTab },
];

export default function DashboardAdmin() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // Handlers
  const handleUserCreate = async (data) => {
      console.log("Create user not fully implemented in service", data);
      await fetchData(); 
  };
  const handleUserUpdate = async (data) => {
       console.log("Update user not fully implemented in service", data);
       await fetchData();
  };
   const handleUserDelete = async (id) => {
       console.log("Delete user not fully implemented in service", id);
       await fetchData();
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

  const ActiveComponent = tabs.find(t => t.id === activeTab).Component;
  const activeProps = getComponentProps();

  return (
    <div className="dashboard-admin">
      <h1 className="dashboard-admin__title">Panel de Administración</h1>
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
