'use client'

import { useTheme } from '@mui/material'
import { ResponsiveChoropleth } from '@nivo/geo'
import type { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson'
import { geoFeatures } from '../data/mockGeoFeatures'
import { mockGeographyData as mockData } from '../data/mockData'
import { tokens } from './tokens'

type Props = {
  isDashboard?: boolean
}

type ChoroplethDatum = { id: string | number; value: number }

export default function GeographyChart({ isDashboard = false }: Props) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  // Tipp: Wenn du mockData in TS definierst als `ChoroplethDatum[]`, kannst du das Casting sparen.
  const data = mockData as unknown as ChoroplethDatum[]
  const features = geoFeatures as FeatureCollection<Geometry, GeoJsonProperties>

  return (
    <ResponsiveChoropleth
      data={data}
      features={features.features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      domain={[0, 1_000_000]}
      unknownColor="#666666"
      label="properties.name"
      valueFormat=".2s"
      projectionScale={isDashboard ? 40 : 150}
      projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.5]}
      projectionRotation={[0, 0, 0]}
      borderWidth={1.5}
      borderColor="#ffffff"
      theme={{
        axis: {
          domain: { line: { stroke: colors.grey[100] } },
          legend: { text: { fill: colors.grey[100] } },
          ticks: {
            line: { stroke: colors.grey[100], strokeWidth: 1 },
            text: { fill: colors.grey[100] },
          },
        },
        legends: { text: { fill: colors.grey[100] } },
        tooltip: { container: { background: colors.primary[500], color: colors.grey[100] } },
      }}
      legends={
        !isDashboard
          ? [
              {
                anchor: 'bottom-left',
                direction: 'column',
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: colors.grey[100],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [{ on: 'hover', style: { itemTextColor: '#ffffff', itemOpacity: 1 } }],
              },
            ]
          : undefined
      }
    />
  )
}
