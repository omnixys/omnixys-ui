'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';

// Dummy-Daten für Demo
const highlights = [
  {
    id: 'jurassic-world',
    title: 'Jurassic World: Die Wiedergeburt',
    poster: '/images/movies/jurassic.jpg',
  },
  {
    id: 'superman',
    title: 'Superman',
    poster: '/images/movies/superman.jpg',
  },
  {
    id: 'f1-film',
    title: 'F1 – Der Film',
    poster: '/images/movies/f1.jpg',
  },
];

export default function CinemaHomePage() {
  const router = useRouter();

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
      {/* Hero */}
      <Box
        sx={{
          width: '100%',
          minHeight: '400px',
          backgroundImage: `url('/images/movies/jurassic-bg.jpg')`,
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
          Jetzt im Omnixys Kino
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Jurassic World: Die Wiedergeburt
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ px: 4, py: 1.5, fontSize: '1.2rem' }}
          onClick={() => router.push('/entertainment/cinema/jurassic-world')}
        >
          Jetzt Tickets sichern
        </Button>
      </Box>

      {/* Highlights */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
          Filmhighlights
        </Typography>
        <Grid container spacing={3}>
          {highlights.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  cursor: 'pointer',
                  transition: '0.3s',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
                onClick={() => router.push(`/entertainment/cinema/${movie.id}`)}
              >
                <CardMedia
                  component="img"
                  height="400"
                  image={movie.poster}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {movie.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
