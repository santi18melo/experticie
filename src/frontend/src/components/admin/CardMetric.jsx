import React from 'react';


export default function CardMetric({ title, value, delta }) {
return (
<div className="card-metric">
<div className="card-title">{title}</div>
<div className="card-value">{value}</div>
{typeof delta !== 'undefined' && (
<div className={`card-delta ${delta >= 0 ? 'up' : 'down'}`}>
{delta >= 0 ? '▲' : '▼'} {Math.abs(delta)}%
</div>
)}
</div>
);
}