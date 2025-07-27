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
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const heroMovies = [
  {
    id: 1,
    title: 'Jurassic World: Die Wiedergeburt',
    image: '/images/movies/jurassic.jpg',
    description: 'Erlebe das ultimative Abenteuer auf der großen Leinwand.',
  },
  {
    id: 2,
    title: 'Superman',
    image: '/images/movies/superman.jpg',
    description: 'Der legendäre Held ist zurück im Kino.',
  },
];

const movies = [
  { id: 1, title: 'Jurassic World', poster: '/images/movies/jurassic.jpg' },
  { id: 2, title: 'Superman', poster: '/images/movies/superman.jpg' },
  { id: 3, title: 'F1 - Der Film', poster: '/images/movies/f1.jpg' },
  { id: 4, title: '28 Years Later', poster: '/images/movies/28years.jpg' },
  { id: 5, title: 'Final Destination', poster: '/images/movies/final.jpg' },
];

export default function CinemaPage() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Slider */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: 300, md: 500 },
          mb: 4,
        }}
      >
        <Slider {...sliderSettings}>
          {heroMovies.map((movie) => (
            <Box key={movie.id} sx={{ position: 'relative' }}>
              <img
                src={movie.image}
                alt={movie.title}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 30,
                  left: 30,
                  color: '#fff',
                  background: 'rgba(0,0,0,0.5)',
                  p: 2,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  {movie.title}
                </Typography>
                <Typography variant="body1">{movie.description}</Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    bgcolor: 'primary.main',
                    '&:hover': { bgcolor: 'secondary.main' },
                  }}
                >
                  Jetzt Tickets sichern
                </Button>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Filmprogramm */}
      <Container sx={{ py: 4 }}>
        <Typography
          variant="h4"
          sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}
        >
          🎬 Filmhighlights
        </Typography>
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item xs={6} sm={4} md={2.4} key={movie.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                <CardMedia
                  component="img"
                  height="280"
                  image={movie.poster}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    textAlign="center"
                  >
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
