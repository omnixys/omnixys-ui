'use client';

import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

declare let L: any;

const points: [number, number, number][] = [
  [52.52, 13.405, 0.8], // Berlin
  [48.8566, 2.3522, 0.6], // Paris
  [40.7128, -74.006, 0.4], // New York
  [37.7749, -122.4194, 0.7], // San Francisco
];

const MapWithHeatmap = () => {
  useEffect(() => {
    const map = L.map('heatmap').setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const heatLayer = L.heatLayer(points, { radius: 25, blur: 15 }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      id="heatmap"
      style={{
        width: '100%',
        height: '600px',
        borderRadius: '1rem',
        overflow: 'hidden',
      }}
    />
  );
};

export default MapWithHeatmap;
