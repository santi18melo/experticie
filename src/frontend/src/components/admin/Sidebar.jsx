
import React from 'react';


export default function Sidebar({ items = [], active, onNavigate }) {
return (
<aside className="adm-sidebar">
<nav>
<ul>
{items.map((it) => (
<li key={it.key} className={active === it.key ? 'active' : ''} onClick={() => onNavigate(it.key)}>
<span className="icon">{it.icon || '•'}</span>
<span className="label">{it.label}</span>
</li>
))}
</ul>
</nav>
</aside>
);
}
