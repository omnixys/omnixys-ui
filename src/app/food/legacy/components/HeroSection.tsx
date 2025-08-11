'use client';

import { Box, Button, Grid, TextField, Typography } from '@mui/material';

export default function HeroSection() {
  return (
    <Box sx={{ py: 6, textAlign: 'center' }}>
      <Typography
        variant="h3"
        sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}
      >
        Plane deine nächste Reise mit Omnixys
      </Typography>
      <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 4 }}>
        Flüge, Hotels, Aktivitäten und mehr – alles an einem Ort.
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Zielort" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField fullWidth type="date" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField fullWidth label="Kategorie" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ height: '100%' }}
          >
            Suchen
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
