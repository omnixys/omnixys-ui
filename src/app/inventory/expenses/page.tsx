// src/app/expenses/page.tsx
"use client";

import * as React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ---- Types (wie bei dir) ----
type ExpenseByCategorySummary = {
  expenseByCategorySummaryId: string;
  category: string;
  amount: string; // kommt als String
  date: string;   // ISO (YYYY-MM-DD)
};

// ---- Mockdaten (ohne Redux/RTK) ----
const MOCK_EXPENSES: ExpenseByCategorySummary[] = [
  { expenseByCategorySummaryId: "1", category: "Office",       amount: "120", date: "2025-08-01" },
  { expenseByCategorySummaryId: "2", category: "Professional", amount: "300", date: "2025-08-01" },
  { expenseByCategorySummaryId: "3", category: "Salaries",     amount: "900", date: "2025-08-02" },
  { expenseByCategorySummaryId: "4", category: "Office",       amount: "80",  date: "2025-08-03" },
  { expenseByCategorySummaryId: "5", category: "Professional", amount: "150", date: "2025-08-04" },
];

const COLORS = ["#1d4ed8", "#00C49F", "#0088FE", "#FFBB28", "#FF8042"];

type AggregatedItem = { name: string; amount: number; color: string };

export default function Expenses() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");

  const data = React.useMemo<AggregatedItem[]>(() => {
    const inRange = (d: string) => {
      if (startDate && d < startDate) return false;
      if (endDate && d > endDate) return false;
      return true;
    };

    const sums = new Map<string, number>();
    for (const row of MOCK_EXPENSES) {
      if ((selectedCategory === "All" || row.category === selectedCategory) && inRange(row.date)) {
        const val = Number.parseFloat(row.amount) || 0;
        sums.set(row.category, (sums.get(row.category) ?? 0) + val);
      }
    }

    const entries = Array.from(sums.entries());
    return entries.map(([name, amount], i) => ({
      name,
      amount,
      color: COLORS[i % COLORS.length],
    }));
  }, [selectedCategory, startDate, endDate]);

  const total = data.reduce((a, c) => a + c.amount, 0);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight={600}>
          Expenses
        </Typography>
        <Typography variant="body2" color="text.secondary">
          A visual representation of expenses over time.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Filter */}
        <Grid xs={12} md={4}>
          <Card>
            <CardHeader
              title="Filter by Category and Date"
              titleTypographyProps={{ variant: "h6", fontWeight: 600 }}
            />
            <Divider />
            <CardContent sx={{ display: "grid", gap: 2 }}>
              <FormControl size="small" fullWidth>
                <InputLabel id="cat-label">Category</InputLabel>
                <Select
                  labelId="cat-label"
                  label="Category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Office">Office</MenuItem>
                  <MenuItem value="Professional">Professional</MenuItem>
                  <MenuItem value="Salaries">Salaries</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Start Date"
                type="date"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />

              <TextField
                label="End Date"
                type="date"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Chart */}
        <Grid xs={12} md={8}>
          <Card>
            <CardHeader
              title="Expenses by Category"
              subheader={total ? `Total: $${total.toFixed(2)}` : "No data"}
              titleTypographyProps={{ variant: "h6", fontWeight: 600 }}
            />
            <Divider />
            <CardContent sx={{ height: 380 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    innerRadius={60}
                    paddingAngle={2}
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v: number) => [`$${(v ?? 0).toLocaleString("en-US")}`, "Amount"]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
