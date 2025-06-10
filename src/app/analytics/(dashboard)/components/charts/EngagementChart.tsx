"use client";

import React, { useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = {
  daily: [
    { date: "01", visitors: 300, views: 800 },
    { date: "02", visitors: 500, views: 1000 },
    { date: "03", visitors: 400, views: 950 },
    { date: "04", visitors: 600, views: 1200 },
    { date: "05", visitors: 750, views: 1350 },
  ],
  monthly: [
    { date: "Jan", visitors: 3200, views: 10000 },
    { date: "Feb", visitors: 2800, views: 9500 },
    { date: "Mar", visitors: 3500, views: 11000 },
    { date: "Apr", visitors: 4200, views: 12000 },
  ],
  yearly: [
    { date: "2020", visitors: 25000, views: 76000 },
    { date: "2021", visitors: 32000, views: 84000 },
    { date: "2022", visitors: 37000, views: 94000 },
    { date: "2023", visitors: 41000, views: 102000 },
  ],
};

export default function EngagementChart() {
  const theme = useTheme();
  const [range, setRange] = useState("monthly");
  const [show, setShow] = useState<{ [key: string]: boolean }>({
    visitors: true,
    views: true,
  });

  const visitorsMounted = useRef(true);
  const viewsMounted = useRef(true);

  const handleRangeChange = (_: any, newRange: string) => {
    if (newRange) setRange(newRange);
  };

  const handleToggle = (key: string) => {
    if (key === "visitors") visitorsMounted.current = false;
    if (key === "views") viewsMounted.current = false;
    setShow((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeData = data[range];
  const hasData = Object.values(show).some(Boolean);

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">User Engagement</Typography>
            <ToggleButtonGroup
              size="small"
              value={range}
              exclusive
              onChange={handleRangeChange}
              aria-label="Chart range"
            >
              <ToggleButton value="daily">Daily</ToggleButton>
              <ToggleButton value="monthly">Monthly</ToggleButton>
              <ToggleButton value="yearly">Yearly</ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              onClick={() => handleToggle("visitors")}
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: show.visitors
                  ? theme.palette.primary.main
                  : theme.palette.grey[400],
                cursor: "pointer",
              }}
            />
            <Typography variant="body2" color="text.secondary">
              Visitors
            </Typography>

            <Box
              onClick={() => handleToggle("views")}
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: show.views
                  ? theme.palette.success.main
                  : theme.palette.grey[400],
                cursor: "pointer",
              }}
            />
            <Typography variant="body2" color="text.secondary">
              Page Views
            </Typography>
          </Stack>

          <Box height={300}>
            <ResponsiveContainer width="100%" height="100%">
              {hasData ? (
                <AreaChart
                  data={activeData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorVisitors"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={theme.palette.primary.main}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={theme.palette.primary.main}
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={theme.palette.success.main}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={theme.palette.success.main}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <Tooltip />
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={theme.palette.divider}
                  />

                  {show.visitors && (
                    <Area
                      animationDuration={800}
                      animationEasing="ease-in-out"
                      isAnimationActive={!visitorsMounted.current || true}
                      type="monotone"
                      dataKey="visitors"
                      stroke={theme.palette.primary.main}
                      fillOpacity={1}
                      fill="url(#colorVisitors)"
                      onAnimationEnd={() => (visitorsMounted.current = true)}
                    />
                  )}

                  {show.views && (
                    <Area
                      animationDuration={800}
                      animationEasing="ease-in-out"
                      isAnimationActive={!viewsMounted.current || true}
                      type="monotone"
                      dataKey="views"
                      stroke={theme.palette.success.main}
                      fillOpacity={0}
                      fill="url(#colorViews)"
                      onAnimationEnd={() => (viewsMounted.current = true)}
                    />
                  )}
                </AreaChart>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    No data to display
                  </Typography>
                </Box>
              )}
            </ResponsiveContainer>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
