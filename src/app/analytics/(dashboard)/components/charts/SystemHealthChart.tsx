'use client';

import { gql, useQuery } from '@apollo/client';
import { CircularProgress, Paper, Typography, useTheme } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { useSession } from 'next-auth/react';
import getApolloClient from '../../../../../lib/apolloClient';

const SYSTEM_KPI_QUERY = gql`
  query SystemKpis($filter: KpiFilter!) {
    systemKpis(filter: $filter) {
      year
      month
      errorCount
      totalRequests
    }
  }
`;

interface SystemKpi {
  month: number;
  errorCount: number;
  totalRequests: number;
}

export default function SystemHealthChart() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const { data: session } = useSession();
  const client = getApolloClient(session?.access_token);

  const { data, loading, error } = useQuery(SYSTEM_KPI_QUERY, {
    client,
    variables: {
      filter: { year: currentYear },
    },
  });

  if (loading) return <CircularProgress />;
  if (error || !data)
    return <Typography color="error"> Fehler beim Laden der Daten </Typography>;

  const kpis: SystemKpi[] = data.systemKpis;
  const months = kpis.map((kpi) => `${kpi.month}.`);
  const errorRates = kpis.map((kpi) =>
    kpi.totalRequests > 0 ? (kpi.errorCount / kpi.totalRequests) * 100 : 0,
  );

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Systemstabilität {currentYear}
      </Typography>
      <BarChart
        xAxis={[{ data: months, scaleType: 'band' }]}
        series={[
          {
            data: errorRates,
            label: 'Fehlerrate (%)',
            color: theme.palette.error.main,
          },
        ]}
        height={300}
      />
    </Paper>
  );
}
