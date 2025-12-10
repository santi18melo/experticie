import React from 'react';


export default function SimpleChart({ values = [5, 8, 6, 10, 7], onClick }) {
const max = Math.max(...values, 1);
const points = values.map((v, i) => `${i * 30},${100 - (v / max) * 80}`).join(' ');
return (
<svg 
    viewBox="0 0 140 100" 
    width="100%" 
    height="80" 
    className="simple-chart" 
    preserveAspectRatio="none"
    onClick={onClick}
    style={{ cursor: onClick ? 'pointer' : 'default' }}
>
<polyline fill="none" stroke="#06b6d4" strokeWidth="3" points={points} strokeLinecap="round" strokeLinejoin="round" />
</svg>
);
}