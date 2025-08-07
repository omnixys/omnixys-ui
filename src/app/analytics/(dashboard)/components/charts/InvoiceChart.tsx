'use client';

import { gql, useQuery } from '@apollo/client';
import { CircularProgress, Paper, Typography, useTheme } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { useSession } from 'next-auth/react';
import getApolloClient from '../../../../../lib/apolloClient';

const INVOICE_KPI_QUERY = gql`
  query InvoiceKpis($filter: KpiFilter!) {
    invoiceKpis(filter: $filter) {
      year
      month
      invoicesIssued
      overdueInvoices
    }
  }
`;

interface InvoiceKpi {
  month: number;
  invoicesIssued: number;
  overdueInvoices: number;
}

export default function InvoiceChart() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const { data: session } = useSession();
  const client = getApolloClient(session?.access_token);

  const { data, loading, error } = useQuery(INVOICE_KPI_QUERY, {
    client,
    variables: {
      filter: { year: currentYear },
    },
  });

  if (loading) return <CircularProgress />;
  if (error || !data)
    return <Typography color="error">Fehler beim Laden der Daten</Typography>;

  const kpis: InvoiceKpi[] = data.invoiceKpis;
  const months = kpis.map((kpi) => `${kpi.month}.`);

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Rechnungen {currentYear}
      </Typography>
      <BarChart
        xAxis={[{ data: months, scaleType: 'band' }]}
        series={[
          {
            data: kpis.map((kpi) => kpi.invoicesIssued),
            label: 'Erstellt',
            color: theme.palette.info.main,
          },
          {
            data: kpis.map((kpi) => kpi.overdueInvoices),
            label: 'Überfällig',
            color: theme.palette.error.main,
          },
        ]}
        height={300}
      />
    </Paper>
  );
}
