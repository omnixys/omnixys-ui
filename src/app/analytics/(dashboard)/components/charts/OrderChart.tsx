"use client";

// import { AreaChart } from "@mui/x-charts";
import { LineChart } from "@mui/x-charts";
import { CircularProgress, Paper, Typography, useTheme } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import getApolloClient from "../../../../../lib/apolloClient";
import { useSession } from "next-auth/react";

const ORDER_KPI_QUERY = gql`
  query OrderKpis($filter: KpiFilter!) {
    orderKpis(filter: $filter) {
      year
      month
      totalOrders
      basketSizeSum
      orderValueSum
    }
  }
`;

interface OrderKpi {
  month: number;
  totalOrders: number;
  basketSizeSum: number;
  orderValueSum: number;
}

export default function OrderChart() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  const { data: session } = useSession();
  const client = getApolloClient(session?.access_token);

  const { data, loading, error } = useQuery(ORDER_KPI_QUERY, {
    client,
    variables: {
      filter: { year: currentYear },
    },
  });

  if (loading) return <CircularProgress />;
  if (error || !data)
    return <Typography color="error">Fehler beim Laden der Daten</Typography>;

  const kpis: OrderKpi[] = data.orderKpis;
  const months = kpis.map((kpi) => `${kpi.month}.`);

  const avgBasketSizes = kpis.map((kpi) =>
    kpi.totalOrders ? kpi.basketSizeSum / kpi.totalOrders : 0
  );
  const avgOrderValues = kpis.map((kpi) =>
    kpi.totalOrders ? kpi.orderValueSum / kpi.totalOrders : 0
  );

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Bestellverhalten {currentYear}
      </Typography>
      <LineChart
        xAxis={[{ data: months, scaleType: "point" }]}
        series={[
          {
            data: avgBasketSizes,
            label: "Ø Warenkorbgröße",
            color: theme.palette.info.main,
          },
          {
            data: avgOrderValues,
            label: "Ø Bestellwert",
            color: theme.palette.success.main,
          },
        ]}
        height={300}
      />
    </Paper>
  );
}
