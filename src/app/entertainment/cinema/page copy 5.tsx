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
import Slider from 'react-slick';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

// Hero-Filme
const heroMovies = [
  {
    id: 'jurassic-world',
    title: 'Jurassic World: Die Wiedergeburt',
    image: '/images/movies/jurassic-bg.jpg',
    genre: 'Fantasy',
    fsk: 'FSK 12',
    duration: '134 Minuten',
  },
  {
    id: 'superman',
    title: 'Superman',
    image: '/images/movies/superman-bg.jpg',
    genre: 'Action',
    fsk: 'FSK 12',
    duration: '130 Minuten',
  },
  {
    id: 'dune-2',
    title: 'Dune: Part Two',
    image: '/images/movies/dune-bg.jpg',
    genre: 'Sci-Fi',
    fsk: 'FSK 12',
    duration: '160 Minuten',
  },
];

// Film-Highlights (Grid)
const movieHighlights = [
  {
    id: 'jurassic-world',
    title: 'Jurassic World',
    poster: '/images/movies/jurassic.jpg',
  },
  { id: 'superman', title: 'Superman', poster: '/images/movies/superman.jpg' },
  { id: 'f1-film', title: 'F1 – Der Film', poster: '/images/movies/f1.jpg' },
  {
    id: '28-years-later',
    title: '28 Years Later',
    poster: '/images/movies/28years.jpg',
  },
  {
    id: 'final-destination',
    title: 'Final Destination',
    poster: '/images/movies/final.jpg',
  },
  {
    id: 'mission-impossible',
    title: 'Mission Impossible',
    poster: '/images/movies/mi.jpg',
  },
];

export default function CinemaHomePage() {
  const router = useRouter();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
      {/* Hero-Slider */}
      <Box sx={{ position: 'relative' }}>
        <Slider {...sliderSettings}>
          {heroMovies.map((movie) => (
            <Box
              key={movie.id}
              sx={{
                height: { xs: '60vh', md: '80vh' },
                backgroundImage: `url(${movie.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                px: { xs: 2, md: 8 },
              }}
            >
              <Box
                sx={{
                  maxWidth: '520px',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  p: 3,
                  borderRadius: 2,
                  color: '#fff',
                }}
              >
                <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
                  {movie.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {movie.genre} | {movie.fsk} | {movie.duration}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, px: 4, py: 1.5, fontSize: '1.2rem' }}
                  onClick={() =>
                    router.push(`/entertainment/cinema/${movie.id}`)
                  }
                >
                  Jetzt Tickets sichern
                </Button>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Filmprogramm */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
          Filmhighlights
        </Typography>
        <Grid container spacing={3}>
          {movieHighlights.map((movie) => (
            <Grid item xs={6} sm={4} md={3} key={movie.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
                onClick={() => router.push(`/entertainment/cinema/${movie.id}`)}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={movie.poster}
                  alt={movie.title}
                  sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="body1" fontWeight="bold">
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
