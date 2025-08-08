'use client';

import L from 'leaflet';
import 'leaflet.heat';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

export interface FollowerLocation {
  city: string;
  lat: number;
  lng: number;
  count: number;
}

interface Props {
  locations: FollowerLocation[];
  center?: [number, number];
}

const HeatLayer: React.FC<{ points: FollowerLocation[] }> = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    const heatPoints: [number, number, number][] = [];

    points.forEach((p) => {
      for (let i = 0; i < p.count; i++) {
        heatPoints.push([p.lat, p.lng, 1.0]);
      }
    });

    const heatLayer = (L as any)
      .heatLayer(heatPoints, {
        radius: 30,
        max: 1,
        gradient: {
          0.0: 'red',
          0.4: 'lime',
          0.7: 'yellow',
          1.0: 'red',
        },
      })
      .addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [points, map]);

  return null;
};

// 🧭 FlyToController: führt map.flyTo() aus
const FlyToController: React.FC<{ center: [number, number] }> = ({
  center,
}) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, 6);
  }, [center, map]);

  return null;
};

// 🗺 CityHeatmap-Komponente mit MapContainer
export const CityHeatmap: React.FC<Props> = ({ locations, center }) => {
  //   const supportedLanguages = ['en', 'de', 'fr', 'es'];
  // const userLang = navigator.language.slice(0, 2);
  //   const language = supportedLanguages.includes(userLang) ? userLang : 'de';
  //   const apiKey = 'ZGnFjsOL3hd67uPBDULr';

  //   const mapStyle = `streets-v2`;
  // const url = `https://api.maptiler.com/maps/${mapStyle}/256/{z}/{x}/{y}.png?key=${apiKey}&language=${language}`;
  // const = attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'

  const attribution = '© OpenStreetMap contributors';
  const url = 'https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png';

  return (
    <MapContainer
      center={center ?? [20, 0]}
      zoom={center ? 6 : 2}
      style={{ height: '600px', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer attribution={attribution} url={url} />

      {center && <FlyToController center={center} />}
      <HeatLayer points={locations} />
    </MapContainer>
  );
};
