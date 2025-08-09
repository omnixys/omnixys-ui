'use client'

import { useTheme } from '@mui/material'
import { tokens } from './tokens'
import { ResponsiveLine } from '@nivo/line'
import { mockLineData as mockData } from '../data/mockData'

type Props = {
  isCustomLineColors?: boolean
  isDashboard?: boolean
}

export default function LineChart({ isCustomLineColors = false, isDashboard = false }: Props) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const data = mockData as any[]

  return (
    <ResponsiveLine
      data={data}
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
        tooltip: { container: { color: colors.primary[500] } },
      }}
      // wenn Dashboard: Nivo nimmt die `color` aus den Serien
      // sonst Standard-Palette
      colors={
        isDashboard
          ? { datum: 'color' }
          : isCustomLineColors
          ? [colors.greenAccent[500], colors.blueAccent[500], colors.redAccent[500]]
          : { scheme: 'nivo' }
      }
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : 'transportation',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        orient: 'left',
        tickValues: 5,
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : 'count',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          translateX: 100,
          itemWidth: 80,
          itemHeight: 20,
          itemsSpacing: 0,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [{ on: 'hover', style: { itemBackground: 'rgba(0, 0, 0, .03)', itemOpacity: 1 } }],
        },
      ]}
    />
  )
}
