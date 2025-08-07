'use client';

import { Box } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

// Dynamisches Importieren von Leaflet.heat nur im Browser
const HeatmapLayer = dynamic(
  async () => {
    const L = await import('leaflet');
    await import('leaflet.heat');

    const points = [
      [52.52, 13.405, 0.8], // Berlin
      [48.8566, 2.3522, 0.6], // Paris
      [40.7128, -74.006, 0.4], // New York
      [37.7749, -122.4194, 0.7], // San Francisco
    ];

    return function HeatLayerComponent() {
      const map = useMap();

      useEffect(() => {
        const heat = (L as any).heatLayer(points, { radius: 25 }).addTo(map);
        return () => {
          map.removeLayer(heat);
        };
      }, [map]);

      return null;
    };
  },
  { ssr: false },
);

export default function ReachHeatmap() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <HeatmapLayer />
      </MapContainer>
    </Box>
  );
}
