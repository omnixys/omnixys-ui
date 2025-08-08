'use client';

import { DataGrid } from '@mui/x-data-grid';
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

// Farbskala: Hell → Dunkel
// const colorScale = scaleLinear<string>()
// .domain([0, 130])
//   .domain([0, 65, 130])

// .range(['#FFE0E0', '#FF0000']); // Hellrot → Dunkelrot
// .range(['#D6C9F1', '#3A1D87']); // Hellrot → Dunkelrot
//   .range(['#ECE8FB', '#6A4BBC', '#3A1D87']);

const geoUrl = '/maps/world-countries.json';

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

const getContinentEmoji = (continent: string): string => {
  return emojiMap[continent] || '❓';
};

const Page = () => {
  const [useEmoji, setUseEmoji] = useState(true);
  const [hoveredContinent, setHoveredContinent] = useState<string | null>(null);
  const [geoJson, setGeoJson] = useState<any>(null);

  useEffect(() => {
    fetch(geoUrl)
      .then((res) => res.json())
      .then((data) => setGeoJson(data))
      .catch((error) =>
        console.error('Fehler beim Laden der GeoJSON-Daten:', error),
      );
  }, []);

  const features = useMemo(() => geoJson?.features ?? [], [geoJson]);

  const columns = [
    {
      field: 'emoji',
      headerName: '',
      width: 70,
      renderCell: (params: any) => params.value,
    },
    { field: 'continent', headerName: 'Kontinent', width: 160 },
    {
      field: 'countryCount',
      headerName: '# Länder',
      type: 'number',
      width: 100,
    },
    {
      field: 'followerCount',
      headerName: 'Follower',
      type: 'number',
      width: 100,
    },
    {
      field: 'color',
      headerName: 'Farbe',
      width: 100,
      renderCell: (params: any) => (
        <div
          style={{
            width: 24,
            height: 24,
            backgroundColor: params.value,
            borderRadius: '50%',
            border: '1px solid #ccc',
          }}
        />
      ),
    },
  ];

  const rows = useMemo(() => {
    const continentStats: Record<
      string,
      { countryCount: number; followerCount: number }
    > = {};

    for (const feature of features) {
      const iso3 = feature.properties['ISO_A3'];
      const followers = feature.properties.follower_count ?? 0;

      if (!followers || followers === 0) continue; // <-- nur Länder mit Followern

      const continent = iso3 ? ContinentMapper.getContinent(iso3) : 'Unknown';

      if (!continentStats[continent]) {
        continentStats[continent] = {
          countryCount: 0,
          followerCount: 0,
        };
      }

      continentStats[continent].countryCount += 1;
      continentStats[continent].followerCount += followers;
    }

    // 🚫 Nur Kontinente mit mind. einem Land mit Followern
    return Object.entries(continentStats)
      .filter(([_, stats]) => stats.followerCount > 0)
      .map(([continent, stats], index) => ({
        id: index,
        emoji: emojiMap[continent] || '❓',
        continent,
        countryCount: stats.countryCount,
        followerCount: stats.followerCount,
        color: continentColors[continent] || continentColors.Unknown,
      }));
  }, [features]);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const continentStats = useMemo(() => {
    const result: Record<string, { countries: number; followers: number }> = {};

    for (const [iso2, value] of Object.entries(heatmapData)) {
      const continent = ContinentMapper.getContinent(iso2);
      if (!result[continent]) {
        result[continent] = { countries: 0, followers: 0 };
      }
      result[continent].countries += 1;
      result[continent].followers += value;
    }

    return result;
  }, []);

  // z. B. aus Zustand, Context, Zustand, etc.
  const [startColor, endColor] = getHeatmapColors('original');

  const colorScale = scaleLinear<string>()
    .domain([0, 130])
    .range([startColor, endColor]);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Heatmap Weltkarte</h1>

      <button
        onClick={() => setUseEmoji((prev) => !prev)}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
      >
        {useEmoji ? '🌐 Bild verwenden' : '😀 Emoji verwenden'}
      </button>

      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
        onRowMouseEnter={(params) => setHoveredContinent(params.row.continent)}
        onRowMouseLeave={() => setHoveredContinent(null)}
      />

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">
          🌍 Übersicht nach Kontinent
        </h2>
        <table className="w-full text-sm text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Kontinent</th>
              <th className="p-2"># Länder</th>
              <th className="p-2">Follower</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(continentStats).map(([continent, stat]) => (
              <tr
                key={continent}
                onMouseEnter={() => setHoveredContinent(continent)}
                onMouseLeave={() => setHoveredContinent(null)}
                className="hover:bg-gray-100 cursor-pointer"
              >
                <td>
                  {getContinentEmoji(continent)} {continent}
                </td>
                <td>{stat.countries}</td>
                <td>{stat.followers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ComposableMap projectionConfig={{ scale: 140 }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const iso2 = geo.properties['ISO3166-1-Alpha-2']?.toLowerCase();
              const iso3 = geo.properties['ISO3166-1-Alpha-3'];
              const name = geo.properties.name;
              const value = heatmapData[iso3] || 0;

              const continent = ContinentMapper.getContinent(
                geo.properties['ISO3166-1-Alpha-3'],
              );
              const isHovered = hoveredContinent === continent;

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
                        <span className="text-gray-500 ml-2">({value})</span>
                      </div>
                      <div className="w-24 bg-gray-200 rounded h-2 overflow-hidden">
                        <div
                          className="bg-purple-600 h-2"
                          style={{ width: `${(value / 130) * 100}%` }}
                        />
                      </div>
                    </div>
                  }
                  // theme="light"
                  // animation="scale"
                  placement="top"
                  animation="shift-away"
                  arrow={true}
                  delay={[100, 0]}
                >
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={colorScale(value)}
                    // fill={fillColor}
                    stroke={isHovered ? '#000' : '#DDD'}
                    strokeWidth={isHovered ? 2 : 0.5}
                    filter={isHovered ? 'url(#glow)' : undefined}
                    style={{
                      default: { outline: 'none' },
                      hover: { fill: '#6A4BBC', outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                </Tippy>
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </main>
  );
};

export default Page;
