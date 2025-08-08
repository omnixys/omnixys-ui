'use client';

import { Box, Button, Grid, Typography } from '@mui/material';
import { useParams } from 'next/navigation';

export default function AccountDetailsPage() {
  const { id } = useParams();

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Konto {id} – Details
      </Typography>

      <Grid container spacing={2}>
        <Grid item>
          <Button variant="outlined">Kredit erhöhen</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined">Kredit senken</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined">Kredit tilgen</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" href="/finanzen/transfers">
            Überweisung
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
