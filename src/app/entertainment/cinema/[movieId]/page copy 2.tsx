'use client';

import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useParams } from 'next/navigation';

export default function MovieDetailPage() {
  const { movieId } = useParams();

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
      {/* Hero */}
      <Box
        sx={{
          width: '100%',
          minHeight: '400px',
          backgroundImage: `url('/images/movies/${movieId}-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          px: { xs: 2, md: 8 },
          py: { xs: 8, md: 12 },
          color: '#fff',
        }}
      >
        <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
          {movieId?.toString().replace('-', ' ').toUpperCase()}
        </Typography>
        <Button
          variant="outlined"
          sx={{ color: '#fff', borderColor: '#fff' }}
          onClick={() => alert('Trailer starten')}
        >
          ▶ Trailer ansehen
        </Button>
      </Box>

      {/* Infos */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Nächste Vorstellungen
        </Typography>
        <Grid container spacing={2}>
          {['14:00', '17:30', '20:15'].map((time) => (
            <Grid item xs={4} key={time}>
              <Button
                fullWidth
                variant="outlined"
                sx={{ py: 2 }}
                onClick={() => alert(`Ticket für ${time}`)}
              >
                {time}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
