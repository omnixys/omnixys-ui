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

// Hero-Slider Filme
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

// Filmhighlights (Dummy)
const movies = [
  { id: 1, title: 'Jurassic World', poster: '/images/movies/jurassic.jpg' },
  { id: 2, title: 'Superman', poster: '/images/movies/superman.jpg' },
  { id: 3, title: 'F1 - Der Film', poster: '/images/movies/f1.jpg' },
  { id: 4, title: '28 Years Later', poster: '/images/movies/28years.jpg' },
  { id: 5, title: 'Final Destination', poster: '/images/movies/final.jpg' },
  { id: 6, title: 'M3GAN 2.0', poster: '/images/movies/megan.jpg' },
];

// Events & Vorschau
const events = [
  {
    id: 1,
    title: 'Peppa Wutz Kinoevent',
    image: '/images/events/peppa.jpg',
    date: '31. Mai',
  },
  {
    id: 2,
    title: 'Roland Kaiser – 50 Jahre',
    image: '/images/events/roland.jpg',
    date: '21. Oktober',
  },
];

// Angebote
const offers = [
  { id: 1, title: 'Mega Sparmenü', image: '/images/offers/offer1.jpg' },
  { id: 2, title: 'CinemaxX macht Schule', image: '/images/offers/offer2.jpg' },
];

export default function CinemaPage() {
  const heroSettings = {
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
      <Box sx={{ width: '100%', height: { xs: 300, md: 500 }, mb: 4 }}>
        <Slider {...heroSettings}>
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
                  background: 'rgba(0,0,0,0.6)',
                  p: 3,
                  borderRadius: 2,
                  maxWidth: 500,
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  {movie.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {movie.description}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
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

      {/* Kinoprogramm */}
      <Container sx={{ py: 6 }}>
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

      {/* Events & Vorschau */}
      <Container sx={{ py: 6 }}>
        <Typography
          variant="h4"
          sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}
        >
          🎭 Event & Film-Vorschau
        </Typography>
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={event.image}
                  alt={event.title}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ab {event.date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Angebote */}
      <Container sx={{ py: 6 }}>
        <Typography
          variant="h4"
          sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}
        >
          🍿 Angebote
        </Typography>
        <Grid container spacing={3}>
          {offers.map((offer) => (
            <Grid item xs={12} sm={6} md={4} key={offer.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={offer.image}
                  alt={offer.title}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {offer.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{ bgcolor: 'grey.900', color: 'white', py: 4, textAlign: 'center' }}
      >
        <Typography variant="body2">
          © 2025 Omnixys – The Fabric of Modular Innovation
        </Typography>
      </Box>
    </Box>
  );
}
