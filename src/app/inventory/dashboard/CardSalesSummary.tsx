"use client";

import * as React from "react";
import { Card, CardHeader, CardContent, Divider, Box, Typography, Stack, Select, MenuItem, Alert } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { BarChart } from "@mui/x-charts/BarChart";
import type { DashboardMetrics, SalesSummary } from "../types/api-types";
import { mockDashboardMetrics } from "../data/dashboard-metrics.mock";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

const CardSalesSummary: React.FC = () => {
  const data: DashboardMetrics = mockDashboardMetrics;
  const salesData: SalesSummary[] = data.salesSummary ?? [];
  const [timeframe, setTimeframe] = React.useState<"daily" | "weekly" | "monthly">("weekly");

  const totalValueSum = salesData.reduce((a, c) => a + (c.totalValue ?? 0), 0);
  const avgChange = salesData.length ? salesData.reduce((a, c) => a + (c.changePercentage ?? 0), 0) / salesData.length : 0;

  const highest = salesData.reduce<SalesSummary | null>((acc, c) => (!acc || c.totalValue > acc.totalValue ? c : acc), null);
  const highestDate = highest
    ? new Date(highest.date).toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "2-digit" })
    : "N/A";

    const chartData = salesData.map((d) => {
      const dt = new Date(d.date);
      return {
        ...d,
        dateObj: dt, // falls du es später brauchst
        dateLabel: `${dt.getMonth() + 1}/${dt.getDate()}`, // "M/D"
        value: Number(d.totalValue),
      };
    });

  const sumInMillions = totalValueSum / 1_000_000;

  if (!salesData.length) {
    return (
      <Card sx={{ borderRadius: 3, boxShadow: 3, height: "100%", display: "flex", flexDirection: "column" }}>
        <CardHeader title="Sales Summary" titleTypographyProps={{ variant: "h6", fontWeight: 600 }} sx={{ pb: 0 }} />
        <Divider />
        <CardContent><Alert severity="info">No sales data</Alert></CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader title="Sales Summary" titleTypographyProps={{ variant: "h6", fontWeight: 600 }} sx={{ pb: 0 }} />
      <Divider />
      <CardContent sx={{ pt: 1, flex: 1, display: "flex", flexDirection: "column" }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2, mt: 1 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" component="span">
              Value
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
              <Typography variant="h5" fontWeight={800} component="span">
                {`${sumInMillions.toLocaleString("en-US", { maximumFractionDigits: 2 })}m`}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: "success.main" }}>
                <TrendingUpIcon fontSize="small" />
                <Typography variant="body2" component="span">
                  {avgChange.toFixed(2)}%
                </Typography>
              </Stack>
            </Box>
          </Box>
          <Select size="small" value={timeframe} onChange={(e) => setTimeframe(e.target.value as any)} sx={{ minWidth: 120 }}>
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </Stack>

        <Box sx={{ flex: 1, minHeight: 300 }}>

<BarChart
  dataset={chartData}
  height={320}
  xAxis={[
    {
      dataKey: "dateLabel",
      scaleType: "band",      // ⬅️ wichtig: band, nicht time
    },
  ]}
  yAxis={[
    {
      valueFormatter: (v: number) => `$${Math.round((v || 0) / 1_000_000)}m`,
    },
  ]}
  series={[
    { dataKey: "value", label: "Sales" },
  ]}
  slotProps={{
    legend: { hidden: true },
    tooltip: {
      trigger: "item",
      valueFormatter: (v: number) =>
        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v ?? 0),
      // Optional: eigenes Label im Tooltip
      labelFormatter: (item) => {
        // item.label entspricht hier dateLabel
        return item.label as string;
      },
    },
  }}
  sx={{
    "& .MuiChartsAxis-bottom .MuiChartsAxis-line": { opacity: 0.2 },
    "& .MuiChartsAxis-left .MuiChartsAxis-line": { opacity: 0.2 },
  }}
/>

        </Box>

        <Divider sx={{ mt: 2 }} />
        <Box sx={{ px: 0, py: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="body2" component="span">{salesData.length} days</Typography>
          <Typography variant="body2" component="span">
            Highest Sales Date: <Typography component="span" fontWeight={700}>{highestDate}</Typography>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardSalesSummary;
