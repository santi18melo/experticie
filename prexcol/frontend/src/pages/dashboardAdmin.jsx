import React, { useEffect, useState } from "react";
import authApi from "../services/authservices";
import HeaderAdmin from "../components/admin/Header.jsx";
import Sidebar from "../components/admin/Sidebar.jsx";
import CardMetric from "../components/admin/CardMetric.jsx";
import SimpleChart from "../components/admin/SimpleChart.jsx";
import "../styles/dashboard-common.css";


// ========= DASHBOARD ADMIN =========
export default function DashboardAdmin() {
  const [active, setActive] = useState("overview");
  const [usersCount, setUsersCount] = useState(0);
  const [ordersCount] = useState(0);
  const [chartValues] = useState([3, 6, 9, 7, 10]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await authApi.get("/usuarios/");

        // Soporte para API paginada o sin paginar
        const count = Array.isArray(res.data)
          ? res.data.length
          : res.data?.results?.length ?? 0;

        setUsersCount(count);
      } catch (err) {
        console.error("Error cargando usuarios", err);
      }
    };

    fetchUsers();
  }, []);

  const items = [
    { key: "overview", label: "Overview", icon: "🏠" },
    { key: "usuarios", label: "Usuarios", icon: "👥" },
    { key: "productos", label: "Productos", icon: "🛍️" },
    { key: "settings", label: "Ajustes", icon: "⚙️" },
  ];

  return (
    <div className="adm-page">
      <HeaderAdmin
        title="Panel Prexcol"
        role={localStorage.getItem("role") || "Admin"}
        onLogout={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      />

      <div className="adm-layout">
        <Sidebar items={items} active={active} onNavigate={setActive} />

        <main className="adm-main">
          <section className="adm-grid">
            <CardMetric title="Usuarios" value={usersCount} delta={5} />
            <CardMetric title="Pedidos" value={ordersCount} delta={-2} />

            <div className="card-metric">
              <SimpleChart values={chartValues} />
            </div>
          </section>

          <section style={{ marginTop: 18 }}>
            <h3>Últimos usuarios</h3>
          </section>
        </main>
      </div>
    </div>
  );
}
