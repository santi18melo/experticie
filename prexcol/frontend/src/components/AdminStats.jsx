import React from "react";
import CardMetric from "./admin/CardMetric.jsx";
import SimpleChart from "./admin/SimpleChart.jsx";


export default function AdminStats({ usersCount, ordersCount }) {
return (
    <section className="adm-grid">
    <CardMetric title="Usuarios" value={usersCount} delta={5} />
    <CardMetric title="Pedidos" value={ordersCount} delta={-2} />

    <div className="card-metric">
        <SimpleChart />
    </div>
    </section>
);
}
