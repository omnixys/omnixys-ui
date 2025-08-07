'use client';

import { Box, Typography } from '@mui/material';
import 'leaflet.heat';
import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

// Dummy-Koordinaten mit Gewichtung (z. B. neue Follower oder Interaktionen)
const heatPoints: [number, number, number][] = [
  [52.52, 13.405, 0.8], // Berlin
  [48.8566, 2.3522, 0.6], // Paris
  [37.7749, -122.4194, 0.7], // San Francisco
  [28.6139, 77.209, 0.5], // Delhi
  [51.5074, -0.1278, 0.4], // London
  [34.0522, -118.2437, 0.6], // Los Angeles
  [35.6895, 139.6917, 0.9], // Tokyo
];

function HeatLayer() {
  const map = useMap();

  useEffect(() => {
    const L = require('leaflet');
    require('leaflet.heat');

    const heatLayer = (L as any).heatLayer(heatPoints, {
      radius: 25,
      blur: 15,
      maxZoom: 5,
    });

    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map]);

  return null;
}

export default function ReachHeatmap() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Weltweite Reichweite (Heatmap)
      </Typography>
      <Box height={450} width="100%" borderRadius={2} overflow="hidden">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <HeatLayer />
        </MapContainer>
      </Box>
    </Box>
  );
}
