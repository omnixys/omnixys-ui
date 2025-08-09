'use client';

import { Box, Card, CardContent, Typography } from '@mui/material';
import DoughnutChart from './DoughnutChart';
import AnimatedCounter from './AnimatedCounter';

export interface Debt {
  creditor: string;
  amount: number;
}

export interface DebtOverviewBoxProps {
  debts: Debt[];
  totalDebt: number;
}

export default function DebtOverviewBox({ debts, totalDebt }: DebtOverviewBoxProps) {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 2, maxWidth: 400 }}>
      {/* Donut Chart */}
      <Box sx={{ width: 80, height: 80 }}>
        <DoughnutChart
          accounts={debts.map((d) => ({
            name: d.creditor,
            amount: d.amount,
          }))}
        />
      </Box>

      {/* Text Content */}
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="subtitle2" fontWeight="bold">
          {debts.length} offene Schuld{debts.length !== 1 && 'en'}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Gesamtschulden
        </Typography>
        <Typography variant="h6" fontWeight="bold" color="error">
          <AnimatedCounter amount={totalDebt} />
        </Typography>
      </CardContent>
    </Card>
  );
}
