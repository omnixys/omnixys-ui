// app/finanzen/page.tsx
'use client';
import { Box, Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';

export default function BankingDashboard() {
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Banking-Übersicht
      </Typography>
      <Grid container spacing={3}>
        <Grid item>
          <Link href="/finanzen/accounts">
            <Button variant="contained">Konten anzeigen</Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/finanzen/transfers">
            <Button variant="contained">Überweisung tätigen</Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/finanzen/history">
            <Button variant="contained">Transaktionshistorie</Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
