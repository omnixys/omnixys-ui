'use client';

import { Box, Modal, Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Tippy from '@tippyjs/react';
import centroid from '@turf/centroid';
import { scaleLinear } from 'd3-scale';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import 'tippy.js/dist/tippy.css'; // Basistooltip-Styles
import 'tippy.js/themes/light-border.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/themes/translucent.css';
import { CityHeatmap, FollowerLocation } from './CityHeatmap';
import { internationalFollowers } from './components/follower-data';
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
// const heatmapData: Record<string, number> = {
//   USA: 120,
//   DEU: 90,
//   BRA: 70,
//   IND: 110,
//   CHN: 130,
//   RUS: 80,
//   ZAF: 60,
//   AUS: 75,
//   CAN: 100,
// };

const heatmapData: Record<string, number> = internationalFollowers.reduce(
  (acc, follower) => {
    const { countryCode, count } = follower;
    acc[countryCode] = (acc[countryCode] || 0) + count;
    return acc;
  },
  {} as Record<string, number>,
);

const followerData: Record<string, number> = internationalFollowers.reduce(
  (acc, follower) => {
    const { countryCode, count } = follower;
    acc[countryCode] = (acc[countryCode] || 0) + count;
    return acc;
  },
  {},
);

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
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null,
  );
  const [showCityMap, setShowCityMap] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');

  const [cityLocations, setCityLocations] = useState<FollowerLocation[]>([]);

  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);

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

  console.log('continents:', selectedContinentIds);

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

    return Object.entries(grouped)
      .map(([continent, data], i) => ({
        id: i,
        continent,
        countries: data.count,
        followers: data.total,
        emoji: emojiMap[continent] || '❓',
      }))
      .sort((a, b) => b.followers - a.followers); // nach Followern sortiert
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
    { field: 'countries', headerName: 'Länder', flex: 1 },
    { field: 'followers', headerName: 'Follower', flex: 1 },
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
        <div style={{ position: 'relative', height: 600 }}>
          <ComposableMap
            projectionConfig={{ scale: 160 }}
            style={{ width: '100%', height: 'auto' }}
          >
            <Geographies geography={geoJson}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const iso3 = geo.properties['ISO3166-1-Alpha-3'];
                  const iso2 =
                    geo.properties['ISO3166-1-Alpha-2']?.toLowerCase();
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
                        fill={colorScale(value)}
                        // fill={fillColor}
                        stroke="#DDD"
                        onClick={() => {
                          const center = centroid(geo as any).geometry
                            .coordinates;
                          setMapCenter([center[1], center[0]]); // [lat, lng]
                          setSelectedCountryCode(iso3);
                          setName(name);

                          const cities = internationalFollowers.filter(
                            (c) => c.countryCode === iso3,
                          );
                          setCityLocations(cities);

                          setOpenModal(true); // Modal anzeigen
                        }}
                        // onClick={() => {
                        //   if (typeof continentEntry?.id !== 'undefined') {
                        //     const newSet = new Set(selectedContinentIds.ids);
                        //     if (newSet.has(continentEntry.id)) {
                        //       newSet.delete(continentEntry.id);
                        //     } else {
                        //       newSet.add(continentEntry.id);
                        //     }
                        //     setSelectedContinentIds({
                        //       type: 'include',
                        //       ids: newSet,
                        //     });
                        //   }
                        // }}

                        style={{
                          default: isSelected
                            ? {
                                fill: isSelected ? color : '#d1d5db',
                                outline: 'none',
                              }
                            : { outline: 'none' },

                          hover: isSelected
                            ? {
                                fill: isSelected ? '#4b5563' : '#e5e7eb',
                                outline: 'none',
                              }
                            : { fill: '#6A4BBC', outline: 'none' },
                          pressed: isSelected
                            ? {
                                fill: isSelected ? '#1f2937' : '#d1d5db',
                                outline: 'none',
                              }
                            : { outline: 'none' },
                        }}
                      />
                    </Tippy>
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
      )}

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            height: '80%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            p: 2,
            outline: 'none',
          }}
        >
          <h3 style={{ marginBottom: '1rem' }}>🔥 Städte-Heatmap für {name}</h3>
          <CityHeatmap center={mapCenter} locations={cityLocations} />
        </Box>
      </Modal>
    </div>
  );
}
