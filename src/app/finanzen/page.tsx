'use client';
import { Box } from '@mui/material';
import HeaderBox from './components/HeaderBox';
import TotalBalanceBox from './components/TotalBalanceBox';

export default function BankingDashboard() {
  return (
    <Box p={4}>
      <HeaderBox
        user="admin"
        type="greeting"
        title="Willkommen"
        subtext="kleiner Hund"
      />

      <TotalBalanceBox
        accounts={[
          { name: 'VVS', amount: 250 },
          { name: 'VVS2', amount: 1000.35 },
        ]}
        totalCurrentBalance={1250.35}
      />
    </Box>
  );
}
