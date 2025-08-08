'use client';

import { Box } from '@mui/material';
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  TooltipItem,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Chart.js Komponenten registrieren
ChartJS.register(ArcElement, Tooltip, Legend);

export interface DoughnutChartProps {
  accounts: { name: string; amount: number }[];
}

export default function DoughnutChart({ accounts }: DoughnutChartProps) {
  const total = accounts.reduce((sum, acc) => sum + acc.amount, 0);

  const data = {
    labels: accounts.map((acc) => acc.name),
    datasets: [
      {
        data: accounts.map((acc) => acc.amount),
        backgroundColor: [
          '#42a5f5',
          '#66bb6a',
          '#ffa726',
          '#ab47bc',
          '#ef5350',
          '#29b6f6',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: '60%', // für Doughnut-Style
    plugins: {
      legend: {
        position: 'bottom' as const,
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'doughnut'>) {
            const value = context.raw as number;
            const percent = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value.toLocaleString('de-DE')} € (${percent}%)`;
          },
        },
      },
    },
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
      <Doughnut data={data} options={options} />
    </Box>
  );
}
