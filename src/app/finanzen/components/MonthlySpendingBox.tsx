'use client';
import { Card, CardContent, Typography, Box } from '@mui/material';
import DoughnutChart from './DoughnutChart';
import AnimatedCounter from './AnimatedCounter';

export interface MonthlySpendingBoxProps {
  categories: { name: string; amount: number }[];
  totalSpending: number;
}

export default function MonthlySpendingBox({
  categories,
  totalSpending,
}: MonthlySpendingBoxProps) {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 2, maxWidth: 400 }}>
      <Box sx={{ width: 80, height: 80 }}>
        <DoughnutChart accounts={categories} />
      </Box>

      <CardContent sx={{ flex: 1 }}>
        <Typography variant="subtitle2" fontWeight="bold">
          Monthly Spending
        </Typography>
        <Typography variant="caption" color="text.secondary">
          This Month
        </Typography>
        <Typography variant="h6" fontWeight="bold" color="error">
          -<AnimatedCounter amount={totalSpending} />
        </Typography>
      </CardContent>
    </Card>
  );
}
