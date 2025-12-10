// Original Map implementation backed up as Map.real.jsx
// It uses react-leaflet and leaflet. If you want full map support,
// install `react-leaflet` and `leaflet` and restore Map.jsx from this file.

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Card from './Card';
import { Text } from './Typography';
import Button from './Button';

// Fix for default marker icon
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({ center = [4.6097, -74.0817], zoom = 13, markers = [], height = '400px', className = '' }) => {
  const [error, setError] = useState(false);
  const tileLayer = import.meta.env.VITE_MAP_TILE_LAYER || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  if (error) {
    return (
      <Card className={className} style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <Text color="error" weight="bold">Error cargando el mapa</Text>
        <Text size="sm">No se pudo conectar con el servicio de mapas.</Text>
        <Button size="small" variant="outline" onClick={() => setError(false)}>Reintentar</Button>
      </Card>
    );
  }

  return (
    <div style={{ height, width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }} className={className}>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer url={tileLayer} attribution='&copy; OpenStreetMap contributors' />
        {markers.map((marker, idx) => (
          <Marker key={idx} position={marker.position}>
            <Popup>
              <strong>{marker.title}</strong>
              <br />
              {marker.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
