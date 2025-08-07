'use client';

import Tippy from '@tippyjs/react';
import { scaleLinear } from 'd3-scale';
import Image from 'next/image';
import { useMemo, useState } from 'react';
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

const Page = () => {
  const [useEmoji, setUseEmoji] = useState(true);

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

      <ComposableMap projectionConfig={{ scale: 140 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const iso2 = geo.properties['ISO3166-1-Alpha-2']?.toLowerCase();
              const iso3 = geo.properties['ISO3166-1-Alpha-3'];
              const name = geo.properties.name;
              const value = heatmapData[iso3] || 0;

              const continentStats = useMemo(() => {
                const result: Record<
                  string,
                  { countries: number; followers: number }
                > = {};

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

              const flagEmoji = iso2
                ? String.fromCodePoint(
                    ...[...iso2.toUpperCase()].map(
                      (c) => 0x1f1e6 + c.charCodeAt(0) - 65,
                    ),
                  )
                : '🏳️'; // fallback
              return (
                <>
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
                      stroke="#DDD"
                      style={{
                        default: { outline: 'none' },
                        hover: { fill: '#6A4BBC', outline: 'none' },
                        pressed: { outline: 'none' },
                      }}
                    />
                  </Tippy>

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
                          <th className="p-2">Farbe</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(continentStats).map(
                          ([continent, { countries, followers }]) => (
                            <tr key={continent} className="border-t">
                              <td className="p-2">
                                {emojiMap[continent] || '❓'} {continent}
                              </td>
                              <td className="p-2">{countries}</td>
                              <td className="p-2">{followers}</td>
                              <td className="p-2">
                                <span
                                  className="inline-block w-6 h-4 rounded"
                                  style={{
                                    backgroundColor:
                                      continentColors[continent] || '#d1d5db',
                                  }}
                                ></span>{' '}
                                <code className="text-xs text-gray-500 ml-2">
                                  {continentColors[continent] || '#d1d5db'}
                                </code>
                              </td>
                            </tr>
                          ),
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </main>
  );
};

export default Page;
