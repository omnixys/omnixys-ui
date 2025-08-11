// src/components/dashboard/CardExpenseSummary.tsx
"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Box,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { PieChart } from "@mui/x-charts/PieChart";

import type {
  ExpenseByCategorySummary,
  DashboardMetrics,
} from "../types/api-types";
import { mockDashboardMetrics } from "../data/dashboard-metrics.mock";

type ExpenseSums = Record<string, number>;

const COLORS = ["#00C49F", "#0088FE", "#FFBB28", "#FF8042", "#AA66CC"];

const CardExpenseSummary: React.FC = () => {
  // 🔁 Statt API-Call (Redux/RTK Query) verwenden wir Mockdaten
  const dashboardMetrics: DashboardMetrics = mockDashboardMetrics;

  const expenseSummary = dashboardMetrics.expenseSummary[0];
  const expenseByCategorySummary =
    dashboardMetrics.expenseByCategorySummary || [];

  // Summen je Kategorie bilden
  const expenseSums = expenseByCategorySummary.reduce(
    (acc: ExpenseSums, item: ExpenseByCategorySummary) => {
      const category = `${item.category} Expenses`;
      const amount = Number.parseFloat(item.amount);
      acc[category] = (acc[category] ?? 0) + (Number.isFinite(amount) ? amount : 0);
      return acc;
    },
    {}
  );

  const expenseCategories = Object.entries(expenseSums).map(([name, value], i) => ({
    id: i,
    label: name,
    value,
    color: COLORS[i % COLORS.length],
  }));

  const totalExpenses = expenseCategories.reduce((sum, c) => sum + c.value, 0);
  const formattedTotal = totalExpenses.toFixed(2);

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 3, boxShadow: 3 }}>
      <CardHeader title="Expense Summary" titleTypographyProps={{ variant: "h6", fontWeight: 600 }} sx={{ pb: 0 }} />
      <Divider />
      <CardContent sx={{ flex: 1 }}>
        <Stack
          direction={{ xs: "column", xl: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", xl: "center" }}
          spacing={2}
          sx={{ pr: { xl: 2 } }}
        >
          {/* Chart */}
          <Box sx={{ position: "relative", flexBasis: { xl: "60%" } }}>
            <PieChart
              height={180}
              series={[
                {
                  innerRadius: 60,
                  outerRadius: 80,
                  paddingAngle: 2,
                  data: expenseCategories.map((c) => ({
                    id: c.id,
                    value: c.value,
                    label: c.label,
                    color: c.color,
                  })),
                },
              ]}
              slotProps={{ legend: { hidden: true } }}
            />
            {/* Summe im Zentrum */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <Typography variant="h6" fontWeight={700}>
                ${formattedTotal}
              </Typography>
            </Box>
          </Box>

          {/* Labels */}
          <Box sx={{ py: 1 }}>
            <List dense sx={{ py: 0 }}>
              {expenseCategories.map((entry) => (
                <ListItem key={entry.id} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: entry.color }} />
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{ variant: "caption" }} primary={entry.label} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Stack>
      </CardContent>

      {/* Footer */}
      {expenseSummary && (
        <>
          <Divider />
          <Box sx={{ px: 3, py: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="body2">
              Average:{" "}
              <Typography component="span" fontWeight={600}>
                ${expenseSummary.totalExpenses.toFixed(2)}
              </Typography>
            </Typography>
            <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
              <TrendingUpIcon />
              <Typography variant="body2">30%</Typography>
            </Box>
          </Box>
        </>
      )}
    </Card>
  );
};

export default CardExpenseSummary;
