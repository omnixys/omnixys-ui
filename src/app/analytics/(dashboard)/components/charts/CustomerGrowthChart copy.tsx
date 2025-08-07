'use client';

import { gql, useQuery } from '@apollo/client';
import { CircularProgress, Paper, Typography, useTheme } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { useSession } from 'next-auth/react';
import getApolloClient from '../../../../../lib/apolloClient';

const CUSTOMER_GROWTH_QUERY = gql`
  query CustomerGrowthKpis($filter: KpiFilter!) {
    customerGrowthKpis(filter: $filter) {
      year
      month
      newCustomers
    }
  }
`;

export default function CustomerGrowthChart() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const { data: session } = useSession();
  const client = getApolloClient(session?.access_token);

  const { data, loading, error } = useQuery(CUSTOMER_GROWTH_QUERY, {
    client,
    variables: {
      filter: { year: currentYear },
    },
  });

  if (loading) return <CircularProgress />;
  if (error || !data)
    return <Typography color="error">Fehler beim Laden der Daten</Typography>;

  const months = data.customerGrowthKpis.map(
    (kpi: { month: number }) => `${kpi.month}.`,
  );
  const values = data.customerGrowthKpis.map(
    (kpi: { newCustomers: number }) => kpi.newCustomers,
  );

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Neukunden {currentYear}
      </Typography>
      <BarChart
        xAxis={[{ scaleType: 'band', data: months }]}
        series={[
          {
            data: values,
            label: 'Neukunden',
            color: theme.palette.secondary.main,
          },
        ]}
        height={300}
      />
    </Paper>
  );
}
