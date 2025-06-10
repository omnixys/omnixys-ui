"use client";

import { useQuery } from "@apollo/client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { GET_REVENUE_KPIS } from "../../../../graphql/analytics/query/transaction-kpis";
import { Card, CardContent } from "@mui/material";
import { RevenueKpi } from "../../../../types/analytics/kpi.type";

export function RevenueChart() {
  const { data, loading } = useQuery(GET_REVENUE_KPIS, {
    variables: { filter: { year: 2025 } },
  });

  if (loading) return <div>Lade Umsatzdaten...</div>;

  const chartData = data?.revenue_kpis.map((k: RevenueKpi) => ({
    name: `${k.month}.${k.year}`,
    total_revenue: k.total_revenue,
  }));

  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-bold">Umsatzentwicklung</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total_revenue"
              stroke="var(--mui-primary)"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
