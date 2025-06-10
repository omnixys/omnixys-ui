// app/analytics/analytics/page.tsx

"use client";

import { useQuery } from "@apollo/client";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Button,
  Tabs,
  Tab,
  useTheme,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { useSession } from "next-auth/react";
import getApolloClient from "../../../lib/apolloClient";
import {
  RevenueKpi,
  OrderKpi,
  TransactionKpi,
} from "../../../types/analytics/kpi.type";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { GET_ORDER_KPIS, GET_REVENUE_KPIS, GET_TRANSACTION_KPIS } from "../../../graphql/analytics/query/transaction-kpis";

export default function AnalyticsOverviewPage() {
  const theme = useTheme();
  const [tabIndex, setTabIndex] = useState<0 | 1 | 2>(0);
  const [year, setYear] = useState<number | "">("");
  const { data: session } = useSession();
  const client = getApolloClient(session?.access_token);

  const filter = year ? { year: Number(year) } : {};

  const { data: revenueData, loading: loadingRevenue } = useQuery(
    GET_REVENUE_KPIS,
    {
      client,
      variables: { filter, sort: true, limit: 12 },
    }
  );
  const revenueKpis: RevenueKpi[] = revenueData?.revenue_kpis || [];

  const { data: orderData, loading: loadingOrder } = useQuery(GET_ORDER_KPIS, {
    client,
    variables: { filter, sort: true, limit: 12 },
  });
  const orderKpis: OrderKpi[] = orderData?.order_kpis || [];

  const { data: transactionData, loading: loadingTransaction } = useQuery(
    GET_TRANSACTION_KPIS,
    {
      client,
      variables: { filter, sort: true, limit: 12 },
    }
  );
  const transactionKpis: TransactionKpi[] =
    transactionData?.transaction_kpis || [];

  const handleExport = (format: "csv" | "excel") => {
    const url = `/export/kpis/report.${format}`;
    window.open(url, "_blank");
  };

  const chartData = [revenueKpis, orderKpis, transactionKpis][tabIndex].map(
    (kpi) => {
      const value =
        tabIndex === 0
          ? (kpi as RevenueKpi).total_revenue
          : tabIndex === 1
            ? (kpi as OrderKpi).order_value_sum
            : (kpi as TransactionKpi).transaction_volume;
      return {
        name: `${kpi.year}/${kpi.month.toString().padStart(2, "0")}`,
        Wert: value,
      };
    }
  );

  const currentData = [revenueKpis, orderKpis, transactionKpis][tabIndex];
  const currentLoading = [loadingRevenue, loadingOrder, loadingTransaction][
    tabIndex
  ];
  const currentUnit = "€";

  const average =
    currentData.length > 0
      ? currentData.reduce((sum, kpi) => {
          const value =
            tabIndex === 0
              ? (kpi as RevenueKpi).total_revenue
              : tabIndex === 1
                ? (kpi as OrderKpi).order_value_sum
                : (kpi as TransactionKpi).transaction_volume;
          return sum + value;
        }, 0) / currentData.length
      : 0;

  return (
    <Box p={4} bgcolor={theme.palette.background.default}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          color={theme.palette.primary.main}
        >
          Analytics Dashboard
        </Typography>
        <Box display="flex" gap={1}>
          <Button variant="outlined" onClick={() => handleExport("csv")}>
            CSV Export
          </Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={() => handleExport("excel")}
          >
            Excel Export
          </Button>
        </Box>
      </Box>

      <Box display="flex" alignItems="center" gap={2} mt={3} mb={2}>
        <FormControl size="small">
          <InputLabel>Jahr</InputLabel>
          <Select
            value={year}
            label="Jahr"
            onChange={(e) => setYear(e.target.value as number | "")}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="">Alle</MenuItem>
            {[2022, 2023, 2024, 2025].map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Tabs
        value={tabIndex}
        onChange={(_, val) => setTabIndex(val)}
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 3 }}
      >
        {["Umsatz", "Bestellungen", "Transaktionen"].map((label, idx) => (
          <Tab key={idx} label={label} />
        ))}
      </Tabs>

      {currentLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Box mb={4} height={300}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Wert"
                  stroke={theme.palette.primary.main}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          <Box mb={3}>
            <Typography variant="body2" color="text.secondary">
              Durchschnitt: {average.toFixed(2)} {currentUnit}
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {currentData.map((kpi, idx) => {
              const value =
                tabIndex === 0
                  ? (kpi as RevenueKpi).total_revenue
                  : tabIndex === 1
                    ? (kpi as OrderKpi).order_value_sum
                    : (kpi as TransactionKpi).transaction_volume;
              return (
                <Grid sx={{ xs: 12, md: 6, lg: 4 }} key={idx}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
                      <CardContent>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          color={theme.palette.text.primary}
                        >
                          {kpi.year} / {kpi.month.toString().padStart(2, "0")}
                        </Typography>
                        <Box mt={2}>
                          <Chip
                            label={`Wert: ${value.toFixed(2)} ${currentUnit}`}
                            color="success"
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </Box>
  );
}
