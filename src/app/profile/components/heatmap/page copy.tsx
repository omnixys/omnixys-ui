// src/components/ContinentHeatmap.tsx
'use client';

import { Tooltip } from '@mui/material';
import { FC, useMemo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { ContinentMapper } from './utils/continent-mapper';

interface Props {
  geoJson: GeoJSON.FeatureCollection;
}

const continentColors: Record<string, string> = {
  Europe: '#60a5fa',
  Asia: '#facc15',
  Africa: '#34d399',
  'North America': '#f87171',
  'South America': '#fb923c',
  Oceania: '#a78bfa',
  Antarctica: '#9ca3af',
  Unknown: '#d1d5db',
};

const emojiMap: Record<string, string> = {
  Europe: '🌍',
  Asia: '🌏',
  Africa: '🌍',
  'North America': '🌎',
  'South America': '🌎',
  Oceania: '🌊',
  Antarctica: '❄️',
  Unknown: '❓',
};

export const ContinentHeatmap: FC<Props> = ({ geoJson }) => {
  const features = useMemo(() => geoJson?.features ?? [], [geoJson]);

  const geoUrl = '/maps/world-countries.json';
  return (
    <ComposableMap
      projectionConfig={{ scale: 160 }}
      style={{ width: '100%', height: 'auto' }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const iso3 = geo.properties['ISO3166-1-Alpha-3'];
            const countryName = geo.properties?.name ?? 'Unknown';
            const continent = ContinentMapper.getContinent(iso3);
            const color = continentColors[continent] || continentColors.Unknown;
            const emoji = emojiMap[continent] || emojiMap.Unknown;

            return (
              <Tooltip
                key={geo.rsmKey}
                title={
                  <div style={{ textAlign: 'center' }}>
                    <strong>{countryName}</strong>
                    <br />
                    {emoji} {continent}
                  </div>
                }
              >
                <Geography
                  geography={geo}
                  style={{
                    default: {
                      fill: color,
                      outline: 'none',
                    },
                    hover: {
                      fill: '#4b5563',
                      outline: 'none',
                    },
                    pressed: {
                      fill: '#1f2937',
                      outline: 'none',
                    },
                  }}
                />
              </Tooltip>
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default ContinentHeatmap;
