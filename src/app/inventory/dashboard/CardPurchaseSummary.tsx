"use client";

import * as React from "react";
import { Card, CardHeader, CardContent, Divider, Box, Typography, Stack } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { LineChart } from "@mui/x-charts/LineChart";
import type { DashboardMetrics, PurchaseSummary } from "../types/api-types";
import { mockDashboardMetrics } from "../data/dashboard-metrics.mock";

const nf = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

const CardPurchaseSummary: React.FC = () => {
  const dashboard: DashboardMetrics = mockDashboardMetrics;
  const purchaseData = (dashboard.purchaseSummary ?? []) as PurchaseSummary[];
  const last = purchaseData[purchaseData.length - 1] ?? null;

  const chartData = purchaseData.map((d) => ({ ...d, dateObj: new Date(d.date), total: Number(d.totalPurchased) }));

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 3, boxShadow: 3 }}>
      <CardHeader title="Purchase Summary" titleTypographyProps={{ variant: "h6", fontWeight: 600 }} sx={{ pb: 0 }} />
      <Divider />
      <CardContent sx={{ pt: 1, flex: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ mb: 2, mt: 1 }}>
          <Typography variant="caption" color="text.secondary" component="span">
            Purchased
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Typography variant="h5" fontWeight={700} component="span">
              {last ? nf.format(last.totalPurchased) : "$0.00"}
            </Typography>
            {last && typeof last.changePercentage === "number" && (
              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: last.changePercentage >= 0 ? "success.main" : "error.main" }}>
                {last.changePercentage >= 0 ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />}
                <Typography variant="body2" component="span">{Math.abs(last.changePercentage)}%</Typography>
              </Stack>
            )}
          </Stack>
        </Box>

        <Box sx={{ flex: 1, minHeight: 220 }}>
          <LineChart
            dataset={chartData}
            height={220}
            xAxis={[{ dataKey: "dateObj", scaleType: "time", valueFormatter: (v: Date) =>
              v.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) }]}
            series={[{ dataKey: "total", label: "Purchased", area: true, showMark: true }]}
            slotProps={{ legend: { hidden: true }, tooltip: { trigger: "item", valueFormatter: (v: number) => nf.format(v ?? 0) } }}
            sx={{
              "& .MuiChartsAxis-bottom .MuiChartsAxis-line": { display: "none" },
              "& .MuiChartsAxis-left .MuiChartsAxis-line": { display: "none" },
              "& .MuiChartsAxis-tick": { display: "none" },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardPurchaseSummary;
