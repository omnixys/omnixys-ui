'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import Slider from 'react-slick';

// Slider CSS import
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

// Dummy-Daten
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

export default function CinemaHomePage() {
  const router = useRouter();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
      {/* Hero Slider */}
      <Box sx={{ position: 'relative' }}>
        <Slider {...settings}>
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
                  maxWidth: '500px',
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

      {/* Filmprogramm Bereich */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
          Filmhighlights
        </Typography>
        {/* Hier kann ein Grid wie bisher eingefügt werden */}
      </Container>
    </Box>
  );
}
