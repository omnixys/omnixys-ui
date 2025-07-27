'use client';

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { useParams } from 'next/navigation';
import { useState } from 'react';

// Dummy Daten – später via GraphQL ersetzen
const movieDetails: Record<string, any> = {
  'jurassic-world': {
    title: 'Jurassic World: Die Wiedergeburt',
    description:
      'Die Welt hat sich verändert. Dinosaurier leben nun unter uns. Wer wird überleben?',
    genre: 'Fantasy',
    fsk: 'FSK 12',
    duration: '134 Minuten',
    image: '/images/movies/jurassic-bg.jpg',
    trailer: 'https://www.youtube.com/embed/TcMBFSGVi1c',
    showtimes: ['14:00', '17:30', '20:15'],
  },
  superman: {
    title: 'Superman',
    description: 'Der Mann aus Stahl kehrt zurück, um die Erde zu retten.',
    genre: 'Action',
    fsk: 'FSK 12',
    duration: '130 Minuten',
    image: '/images/movies/superman-bg.jpg',
    trailer: 'https://www.youtube.com/embed/fIHH5-HVS9o',
    showtimes: ['13:30', '16:30', '19:30'],
  },
};

export default function MovieDetailPage() {
  const { movieId } = useParams();
  const movie = movieDetails[movieId as string];

  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);

  if (!movie) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" color="error">
          Film nicht gefunden
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
      {/* Hero-Bereich */}
      <Box
        sx={{
          width: '100%',
          minHeight: '400px',
          backgroundImage: `url(${movie.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          px: { xs: 2, md: 8 },
          py: { xs: 6, md: 10 },
          color: '#fff',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            maxWidth: '600px',
            backgroundColor: 'rgba(0,0,0,0.6)',
            p: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
            {movie.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {movie.genre} | {movie.fsk} | {movie.duration}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {movie.description}
          </Typography>
          <Button
            variant="outlined"
            sx={{ color: '#fff', borderColor: '#fff' }}
            onClick={() => {
              const trailerElement = document.getElementById('trailer-section');
              trailerElement?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            ▶ Trailer ansehen
          </Button>
        </Box>
      </Box>

      {/* Trailer */}
      <Container sx={{ py: 6 }} id="trailer-section">
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
          Trailer
        </Typography>
        <Box
          sx={{
            position: 'relative',
            paddingBottom: '56.25%', // 16:9
            height: 0,
            overflow: 'hidden',
            borderRadius: 3,
          }}
        >
          <iframe
            src={movie.trailer}
            title={`${movie.title} Trailer`}
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          />
        </Box>
      </Container>

      <Divider sx={{ my: 4 }} />

      {/* Showtimes */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
          Vorstellungen
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {movie.showtimes.map((time: string) => (
            <Grid item xs={4} sm={3} md={2} key={time}>
              <Button
                fullWidth
                variant={selectedShowtime === time ? 'contained' : 'outlined'}
                sx={{ py: 2 }}
                onClick={() => setSelectedShowtime(time)}
              >
                {time}
              </Button>
            </Grid>
          ))}
        </Grid>
        {selectedShowtime && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Ausgewählte Vorstellung: {selectedShowtime}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ px: 6, py: 2, borderRadius: '12px', fontSize: '1.2rem' }}
              onClick={() =>
                alert(
                  `Ticket für ${movie.title} um ${selectedShowtime} gekauft!`,
                )
              }
            >
              Jetzt kaufen
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
