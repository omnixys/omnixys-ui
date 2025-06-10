"use client";

import { LineChart } from "@mui/x-charts";
import { CircularProgress, Paper, Typography, useTheme } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import { useSession } from "next-auth/react";
import getApolloClient from "../../../../../lib/apolloClient";

const TRANSACTION_KPI_QUERY = gql`
  query TransactionKpis($filter: KpiFilter!) {
    transactionKpis(filter: $filter) {
      year
      month
      transactionVolume
      failedTransactions
    }
  }
`;

interface TransactionKpi {
  month: number;
  transactionVolume: number;
  failedTransactions: number;
}

export default function TransactionChart() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const { data: session } = useSession();
  const client = getApolloClient(session?.access_token);

  const { data, loading, error } = useQuery(TRANSACTION_KPI_QUERY, {
    client,
    variables: {
      filter: { year: currentYear },
    },
  });

  if (loading) return <CircularProgress />;
  if (error || !data)
    return <Typography color="error">Fehler beim Laden der Daten</Typography>;

  const kpis: TransactionKpi[] = data.transactionKpis;
  const months = kpis.map((kpi) => `${kpi.month}.`);
  const volumes = kpis.map((kpi) => kpi.transactionVolume);
  const failed = kpis.map((kpi) => kpi.failedTransactions);

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Transaktionsvolumen {currentYear}
      </Typography>
      <LineChart
        xAxis={[{ data: months, scaleType: "point" }]}
        series={[
          {
            data: volumes,
            label: "Volumen",
            color: theme.palette.primary.main,
          },
          {
            data: failed,
            label: "Fehlgeschlagen",
            color: theme.palette.error.main,
          },
        ]}
        height={300}
      />
    </Paper>
  );
}
