'use client';

import { Box, Divider, Paper, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import BankCard from '../../components/BankCard';

export default function BankDetailPage() {
  const { id } = useParams();

  // 🚀 Hier API Call für spezifisches Konto
  const bank = {
    id: Number(id),
    name: 'Sparkasse',
    balance: 1234.56,
    number: '1234567890',
    maskedNumber: '**** 7890',
    expiry: '12/25',
    brandLogoUrl: '/visa.svg',
    chipLogoUrl: '/contactless.svg',
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Konto-Details
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <BankCard account={bank} username={'rachel'} showBalance={true} />
      </Paper>

      <Divider sx={{ my: 2 }} />

      {/* Hier kannst du z. B. letzte Transaktionen anzeigen */}
      <Typography variant="h6" gutterBottom>
        Letzte Transaktionen
      </Typography>
      <Typography variant="body2" color="text.secondary">
        (Hier später Tabelle oder Karten für Transaktionen einfügen)
      </Typography>
    </Box>
  );
}
