import {
  Card,
  CardContent,
  Stack,
  Tab,
  Typography,
  useTheme,
} from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { useState } from 'react';

export function AnalysisChart() {
  const theme = useTheme();
  const [range, setRange] = useState<'yearly' | 'monthly' | 'daily'>('monthly');
  const getData = () => {
    switch (range) {
      case 'yearly':
        return {
          labels: ['2021', '2022', '2023'],
          data: [120000, 150000, 180000],
        };
      case 'daily':
        return {
          labels: ['Mo', 'Di', 'Mi', 'Do', 'Fr'],
          data: [2000, 2500, 2200, 3000, 2800],
        };
      default:
        return {
          labels: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul'],
          data: [12000, 14000, 13000, 17000, 20000, 22000, 21000],
        };
    }
  };

  const { labels, data } = getData();

  return (
    <Card sx={{ height: 320, width: '100%' }}>
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Umsatzentwicklung</Typography>
            <Stack direction="row" spacing={1}>
              <Tab label="Jährlich" onClick={() => setRange('yearly')} />
              <Tab label="Monatlich" onClick={() => setRange('monthly')} />
              <Tab label="Täglich" onClick={() => setRange('daily')} />
            </Stack>
          </Stack>
          <LineChart
            xAxis={[{ scaleType: 'point', data: labels }]}
            series={[
              { data, label: 'Umsatz', color: theme.palette.primary.main },
            ]}
            height={200}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
