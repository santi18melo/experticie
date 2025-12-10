import React from 'react';
import Card from './Card';
import { Text } from './Typography';

// Lightweight placeholder Map component used when leaflet/react-leaflet
// are not installed or when building in constrained environments.
// To enable full map functionality restore the original implementation
// from Map.real.jsx and ensure `react-leaflet` and `leaflet` are installed.

const Map = ({
  center = [4.6097, -74.0817],
  zoom = 13,
  markers = [],
  height = '400px',
  className = ''
}) => {
  return (
    <Card className={className} style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Text weight="bold">Mapa deshabilitado</Text>
        <Text size="sm">Para ver el mapa en desarrollo instala <code>react-leaflet</code> y <code>leaflet</code>, o revisa `Map.real.jsx`.</Text>
      </div>
    </Card>
  );
};

export default Map;
