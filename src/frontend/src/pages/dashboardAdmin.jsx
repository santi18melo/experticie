import React, { useState } from "react";
import AdminUsersTab from "../components/admin/tabs/AdminUsersTab";
import AdminStoresTab from "../components/admin/tabs/AdminStoresTab";
import AdminProductsTab from "../components/admin/tabs/AdminProductsTab";
import AdminOrdersTab from "../components/admin/tabs/AdminOrdersTab";
import "../styles/dashboardAdmin.css";

const tabs = [
  { id: "users", label: "Usuarios", Component: AdminUsersTab },
  { id: "stores", label: "Tiendas", Component: AdminStoresTab },
  { id: "products", label: "Productos", Component: AdminProductsTab },
  { id: "orders", label: "Pedidos", Component: AdminOrdersTab },
];

export default function DashboardAdmin() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const ActiveComponent = tabs.find(t => t.id === activeTab).Component;

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
        <ActiveComponent />
      </section>
    </div>
  );
}
