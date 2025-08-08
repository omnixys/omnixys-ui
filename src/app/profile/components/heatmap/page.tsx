'use client';

import CountryHeatmap from './CountryHeatmap'; // Pfad ggf. anpassen

export default function Page() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        🌍 Interaktive Länder-Heatmap
      </h1>
      <CountryHeatmap />
    </main>
  );
}
