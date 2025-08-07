// src/components/ContinentHeatmap.tsx
'use client';

import { Tooltip } from '@mui/material';
import { FC, useMemo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { ContinentMapper } from './utils/continent-mapper';

interface Props {
  geoJson: any;
}

const continentColors: Record<string, string> = {
  Europe: '#60a5fa', // blue-400
  Asia: '#facc15', // yellow-400
  Africa: '#34d399', // green-400
  'North America': '#f87171', // red-400
  'South America': '#fb923c', // orange-400
  Oceania: '#a78bfa', // purple-400
  Antarctica: '#9ca3af', // gray-400
  Unknown: '#d1d5db', // gray-300
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

  return (
    <ComposableMap
      projectionConfig={{ scale: 160 }}
      style={{ width: '100%', height: 'auto' }}
    >
      <Geographies geography={geoJson}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const iso2 = geo.properties['ISO3166-1-Alpha-2'];
            const countryName = geo.properties.name;
            const continent = ContinentMapper.getContinent(iso2);
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
                      fill: '#4b5563', // gray-700
                      outline: 'none',
                    },
                    pressed: {
                      fill: '#1f2937', // gray-900
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
