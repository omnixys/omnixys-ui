// app/analytics/analytics/page.tsx

"use client";

import { useQuery } from "@apollo/client";
import { Box, Typography, CircularProgress, useTheme } from "@mui/material";
import { useState } from "react";
import { useSession } from "next-auth/react";
import getApolloClient from "../../../lib/apolloClient";
import { GET_LOGS } from "../../../graphql/logstream/query/logs";
import { LogEntry } from "../../../types/logstream/log-entry.type";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
} from "recharts";

export default function LogstreamPage() {
  const theme = useTheme();
  const { data: session } = useSession();
  const client = getApolloClient(session?.access_token);
  const [level] = useState<string>("ERROR");

  const { data, loading } = useQuery(GET_LOGS, {
    client,
    variables: { level },
  });

  const logs: LogEntry[] = data?.logs || [];

  const grouped = logs.reduce<Record<string, number>>((acc, log) => {
    const label = log.service || "unknown";
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(grouped).map(([service, count]) => ({
    service,
    count,
  }));

  return (
    <Box p={4} bgcolor={theme.palette.background.default}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        color={theme.palette.primary.main}
      >
        Logstream Übersicht (Loki)
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box height={400} mt={4}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" allowDecimals={false} />
              <YAxis type="category" dataKey="service" />
              <Tooltip />
              <Bar dataKey="count" fill={theme.palette.error.main} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
}
