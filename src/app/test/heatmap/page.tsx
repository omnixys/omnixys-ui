'use client';

import { Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Tippy from '@tippyjs/react';
import { scaleLinear } from 'd3-scale';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import 'tippy.js/dist/tippy.css'; // Basistooltip-Styles
import 'tippy.js/themes/light-border.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/themes/translucent.css';
import { ContinentMapper } from './utils/continent-mapper';

type ContinentSelectionModel = {
  type: 'include';
  ids: Set<number>;
};

interface GeoJsonFeature {
  type: string;
  properties: Record<string, any>;
  geometry: Record<string, any>;
}

interface GeoJson {
  type: string;
  features: GeoJsonFeature[];
}

// Beispiel-Daten: ISO-Alpha-3 Länder-Code → Wert
const heatmapData: Record<string, number> = {
  USA: 120,
  DEU: 90,
  BRA: 70,
  IND: 110,
  CHN: 130,
  RUS: 80,
  ZAF: 60,
  AUS: 75,
  CAN: 100,
};

const geoUrl = '/maps/world-countries.json';

const getHeatmapColors = (themeName: string): [string, string] => {
  switch (themeName) {
    case 'original':
      return ['#D6C9F1', '#3A1D87'];
    case 'red':
      return ['#FBC8C4', '#8B1E15'];
    case 'green':
      return ['#C8E6C9', '#1B5E20'];
    case 'blue':
      return ['#BBDEFB', '#0D47A1'];
    case 'yellow':
      return ['#FFF9C4', '#F57F17'];
    case 'orange':
      return ['#FFE0B2', '#E65100'];
    case 'teal':
      return ['#B2DFDB', '#004D40'];
    case 'pink':
      return ['#F8BBD0', '#880E4F'];
    default:
      return ['#E0E0E0', '#757575']; // fallback: grau
  }
};

const followerData: Record<string, number> = {
  DEU: 800,
  USA: 1200,
  BRA: 300,
  IND: 500,
  ZAF: 200,
  AUS: 100,
  CHN: 750,
  // ...
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

export default function Page() {
  const [useEmoji, setUseEmoji] = useState(true);
  // z. B. aus Zustand, Context, Zustand, etc.
  const [startColor, endColor] = getHeatmapColors('original');

  const colorScale = scaleLinear<string>()
    .domain([0, 130])
    .range([startColor, endColor]);

  const [geoJson, setGeoJson] = useState<GeoJson | null>(null);
  const [selectedContinentIds, setSelectedContinentIds] =
    useState<ContinentSelectionModel>({
      type: 'include',
      ids: new Set(),
    });

  const features = useMemo(() => geoJson?.features ?? [], [geoJson]);

  const continentStats = useMemo(() => {
    const grouped: Record<string, { count: number; total: number }> = {};

    for (const feature of features) {
      const iso3 =
        feature.properties.ISO_A3 || feature.properties['ISO3166-1-Alpha-3'];
      const followers = followerData[iso3];
      if (!followers || followers <= 0) continue;

      const continent = ContinentMapper.getContinent(iso3);
      if (!grouped[continent]) {
        grouped[continent] = { count: 0, total: 0 };
      }

      grouped[continent].count += 1;
      grouped[continent].total += followers;
    }

    return Object.entries(grouped).map(([continent, data], i) => ({
      id: i,
      continent,
      countries: data.count,
      followers: data.total,
      color: continentColors[continent] || '#d1d5db',
      emoji: emojiMap[continent] || '❓',
    }));
  }, [features]);

  useEffect(() => {
    fetch(geoUrl)
      .then((res) => res.json())
      .then((data) => setGeoJson(data))
      .catch(console.error);
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'continent',
      headerName: 'Kontinent',
      flex: 1,
      renderCell: (params) => `${params.row.emoji} ${params.value}`,
    },
    { field: 'countries', headerName: '# Länder', flex: 1 },
    { field: 'followers', headerName: 'Follower', flex: 1 },
    {
      field: 'color',
      headerName: 'Farbe',
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            width: 20,
            height: 20,
            backgroundColor: params.value,
            borderRadius: '50%',
          }}
        />
      ),
    },
  ];

  return (
    <div>
      <h2>🌍 Übersicht nach Kontinent</h2>

      <Paper sx={{ height: 400, width: '100%', mb: 4 }}>
        <DataGrid
          rows={continentStats}
          columns={columns}
          onRowSelectionModelChange={(newSelection) => {
            if (
              typeof newSelection === 'object' &&
              'type' in newSelection &&
              newSelection.type === 'include' &&
              newSelection.ids instanceof Set
            ) {
              setSelectedContinentIds(newSelection as ContinentSelectionModel);
            }
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>

      {geoJson && (
        <ComposableMap
          projectionConfig={{ scale: 160 }}
          style={{ width: '100%', height: 'auto' }}
        >
          <Geographies geography={geoJson}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.name;
                const iso3 = geo.properties['ISO3166-1-Alpha-3'];
                const iso2 = geo.properties['ISO3166-1-Alpha-2']?.toLowerCase();
                const name = geo.properties.name;
                const value = heatmapData[iso3] || 0;

                const continent = ContinentMapper.getContinent(iso3);
                const color = continentColors[continent] || '#d1d5db';
                const continentEntry = continentStats.find(
                  (c) => c.continent === continent,
                );
                const isSelected =
                  typeof continentEntry?.id !== 'undefined' &&
                  selectedContinentIds.type === 'include' &&
                  selectedContinentIds.ids.has(continentEntry.id);

                const flagEmoji = iso2
                  ? String.fromCodePoint(
                      ...[...iso2.toUpperCase()].map(
                        (c) => 0x1f1e6 + c.charCodeAt(0) - 65,
                      ),
                    )
                  : '🏳️'; // fallback

                return (
                  <Tippy
                    key={geo.rsmKey}
                    content={
                      <>
                        <div className="text-sm">
                          <div className="flex items-center gap-2 mb-1">
                            {useEmoji ? (
                              <span className="text-2xl">{flagEmoji}</span>
                            ) : (
                              <Image
                                src={`https://flagcdn.com/w320/${iso2}.png`}
                                alt={`${name} Flag`}
                                width={32}
                                height={20}
                                className="inline-block"
                              />
                            )}
                            <span className="font-medium">{name}</span>
                            <span className="text-gray-500 ml-2">
                              ({value})
                            </span>
                          </div>
                          <div className="w-24 bg-gray-200 rounded h-2 overflow-hidden">
                            <div
                              className="bg-purple-600 h-2"
                              style={{ width: `${(value / 130) * 100}%` }}
                            />
                          </div>

                          <div style={{ textAlign: 'center' }}>
                            {emojiMap[continent] || '❓'} {continent}
                          </div>
                        </div>
                      </>
                    }
                    // theme="light"
                    // animation="scale"
                    placement="top"
                    animation="shift-away"
                    arrow={true}
                    delay={[100, 0]}
                  >
                    <Geography
                      geography={geo}
                      onClick={() => {
                        if (typeof continentEntry?.id !== 'undefined') {
                          const newSet = new Set(selectedContinentIds.ids);
                          if (newSet.has(continentEntry.id)) {
                            newSet.delete(continentEntry.id);
                          } else {
                            newSet.add(continentEntry.id);
                          }
                          setSelectedContinentIds({
                            type: 'include',
                            ids: newSet,
                          });
                        }
                      }}
                      style={{
                        default: {
                          fill: isSelected ? color : '#d1d5db',
                          outline: 'none',
                        },
                        hover: {
                          fill: isSelected ? '#4b5563' : '#e5e7eb',
                          outline: 'none',
                        },
                        pressed: {
                          fill: isSelected ? '#1f2937' : '#d1d5db',
                          outline: 'none',
                        },
                      }}
                    />
                  </Tippy>
                );
              })
            }
          </Geographies>
        </ComposableMap>
      )}
    </div>
  );
}
