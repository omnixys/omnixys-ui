'use client';

import { gql, useQuery } from '@apollo/client';
import { CircularProgress, Paper, Typography, useTheme } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { useSession } from 'next-auth/react';
import getApolloClient from '../../../../../lib/apolloClient';

const REVENUE_KPI_QUERY = gql`
  query RevenueKpis($filter: KpiFilter!) {
    revenueKpis(filter: $filter) {
      year
      month
      totalRevenue
    }
  }
`;

export default function RevenueChart() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const { data: session } = useSession();
  const client = getApolloClient(session?.access_token);

  const { data, loading, error } = useQuery(REVENUE_KPI_QUERY, {
    client,
    variables: {
      filter: { year: currentYear },
    },
  });

  if (loading) return <CircularProgress />;
  if (error || !data)
    return <Typography color="error">Fehler beim Laden der Daten</Typography>;

  const months = data.revenueKpis.map(
    (kpi: { month: number }) => `${kpi.month}.`,
  );
  const revenues = data.revenueKpis.map(
    (kpi: { totalRevenue: number }) => kpi.totalRevenue,
  );

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Umsatzentwicklung {currentYear}
      </Typography>
      <LineChart
        xAxis={[{ scaleType: 'point', data: months }]}
        series={[
          {
            data: revenues,
            color: theme.palette.primary.main,
            label: 'Gesamtumsatz',
          },
        ]}
        height={300}
      />
    </Paper>
  );
}
