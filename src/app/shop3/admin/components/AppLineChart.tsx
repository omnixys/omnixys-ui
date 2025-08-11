"use client";

import * as React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import {
  Box,
  Paper,
  Typography,
  useTheme,
  Stack,
} from "@mui/material";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

function MuiTooltip({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <Paper elevation={3} sx={{ p: 1.25 }}>
      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
        {label}
      </Typography>
      <Stack spacing={0.5}>
        {payload.map((p) => (
          <Stack
            key={String(p.dataKey)}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            <Stack direction="row" alignItems="center" gap={1.25}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "2px",
                  bgcolor: p.color || "text.primary",
                }}
              />
              <Typography variant="body2">
                {p.name}
              </Typography>
            </Stack>
            <Typography variant="body2" fontWeight={600}>
              {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}

export default function AppLineChart() {
  const theme = useTheme();

  return (
    <Box sx={{ mt: 2, width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} stroke={theme.palette.divider} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(v: string) => v.slice(0, 3)}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <Tooltip content={<MuiTooltip />} />
          <Line
            dataKey="desktop"
            name="Desktop"
            type="monotone"
            stroke={theme.palette.primary.main}
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="mobile"
            name="Mobile"
            type="monotone"
            stroke={theme.palette.secondary.main}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
