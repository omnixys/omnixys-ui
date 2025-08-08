import { Box, Card, CardContent, Typography } from '@mui/material';

import AnimatedCounter from './AnimatedCounter';
import DoughnutChart from './DoughnutChart';

export interface TotalBalanceSummaryCardProps {
  accounts: { name: string; amount: number }[];
  totalCurrentBalance: number;
}

export function formatAmount(amount: number) {
  const no = amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
  return no;
}

export default function TotalBalanceSummaryCard({
  accounts,
  totalCurrentBalance,
}: TotalBalanceSummaryCardProps) {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 2, maxWidth: 400 }}>
      <Box sx={{ width: 80, height: 80 }}>
        <DoughnutChart accounts={accounts} />
      </Box>

      <CardContent sx={{ flex: 1 }}>
        <Typography variant="subtitle2" fontWeight="bold">
          {accounts.length} Bank Account{accounts.length !== 1 && 's'}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Total Current Balance
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          <AnimatedCounter amount={totalCurrentBalance} />
        </Typography>
      </CardContent>
    </Card>
  );
}
