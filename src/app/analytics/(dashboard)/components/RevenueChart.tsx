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
import { REVENUE_KPIS_QUERY } from "@/graphql/queries";
import { Card, CardContent } from "@/components/ui/card";

export function RevenueChart() {
  const { data, loading } = useQuery(REVENUE_KPIS_QUERY, {
    variables: { filter: { year: 2025 } },
  });

  if (loading) return <div>Lade Umsatzdaten...</div>;

  const chartData = data?.revenue_kpis.map((k: any) => ({
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
