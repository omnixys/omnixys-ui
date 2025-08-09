'use client';

import { Box, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import BankCard from '../components/BankCard';

interface Bank {
  id: number;
  name: string;
  balance: number;
  number: string;
  maskedNumber: string;
  expiry: string;
  brandLogoUrl?: string;
  chipLogoUrl?: string;
}

export default function MyBanksPage() {
  const router = useRouter();

  // 🚀 Hier später API Call einbauen
  const banks: Bank[] = [
    {
      id: 1,
      name: 'Sparkasse',
      balance: 1234.56,
      number: '1234567890',
      maskedNumber: '**** 7890',
      expiry: '12/25',
      brandLogoUrl: '/visa.svg',
      chipLogoUrl: '/contactless.svg',
    },
    {
      id: 2,
      name: 'Deutsche Bank',
      balance: 9876.54,
      number: '9876543210',
      maskedNumber: '**** 3210',
      expiry: '06/26',
      brandLogoUrl: '/mastercard.svg',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        My Banks
      </Typography>

      <Grid container spacing={3}>
        {banks.map((bank) => (
          <Grid item xs={12} sm={6} md={4} key={bank.id}>
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => router.push(`/finanzen/banks/${bank.id}`)}
            >
              <BankCard
                account={bank}
                username={'rachel'} // hier dynamisch einfügen
                showBalance={true}
                showBar={true}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
