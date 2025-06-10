"use client";

import { PieChart } from "@mui/x-charts";
import { CircularProgress, Paper, Typography, useTheme } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import { useSession } from "next-auth/react";
import getApolloClient from "../../../../../lib/apolloClient";

const SUPPORT_KPI_QUERY = gql`
  query SupportKpis($filter: KpiFilter!) {
    supportKpis(filter: $filter) {
      month
      supportRequests
      avgResponseTimeTotal
      requestCount
    }
  }
`;

interface SupportKpi {
  month: number;
  supportRequests: number;
  avgResponseTimeTotal: number;
  requestCount: number;
}

export default function SupportChart() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const { data: session } = useSession();
  const client = getApolloClient(session?.access_token);

  const { data, loading, error } = useQuery(SUPPORT_KPI_QUERY, {
    client,
    variables: {
      filter: { year: currentYear },
    },
  });

  console.log("data: %o", data)
  if (loading) return <CircularProgress />;
  if (error || !data)
    return <Typography color="error">Fehler beim Laden der Daten</Typography>;

  const kpis: SupportKpi[] = data.supportKpis;
  const totalRequests = kpis.reduce(
    (sum, kpi) => sum + kpi.supportRequests,
    0
  );
  const avgResponseTime = (() => {
    const total = kpis.reduce(
      (acc, kpi) => acc + kpi.avgResponseTimeTotal,
      0
    );
    const count = kpis.reduce((acc, kpi) => acc + kpi.requestCount, 0);
    return count > 0 ? total / count : 0;
  })();

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Support-Analyse {currentYear}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Gesamtanfragen: {totalRequests} — ⏱️ Durchschnittliche Antwortzeit:{" "}
        {avgResponseTime.toFixed(1)} min
      </Typography>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: totalRequests, label: "Anfragen" },
              { id: 1, value: avgResponseTime, label: "Ø Antwortzeit (min)" },
            ],
            innerRadius: 40,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 4,
            color: theme.palette.primary.main,
          },
        ]}
        height={260}
      />
    </Paper>
  );
}
