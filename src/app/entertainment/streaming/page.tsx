'use client';

import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

// Dummy Daten
const heroMovie = {
  id: 'dune-2',
  title: 'Dune: Part Two',
  description:
    'Der Krieg um Arrakis geht weiter. Paul Atreides kämpft um sein Schicksal.',
  image: '/images/streaming/dune-hero.jpg',
};

const categories = [
  {
    title: 'Beliebt',
    movies: [
      {
        id: 'superman',
        title: 'Superman',
        poster: '/images/streaming/superman.jpg',
      },
      {
        id: 'jurassic-world',
        title: 'Jurassic World',
        poster: '/images/streaming/jurassic.jpg',
      },
      {
        id: 'oppenheimer',
        title: 'Oppenheimer',
        poster: '/images/streaming/oppenheimer.jpg',
      },
      {
        id: 'f1-film',
        title: 'F1 – Der Film',
        poster: '/images/streaming/f1.jpg',
      },
    ],
  },
  {
    title: 'Neu',
    movies: [
      {
        id: 'mission-impossible',
        title: 'Mission Impossible',
        poster: '/images/streaming/mi.jpg',
      },
      {
        id: 'final-destination',
        title: 'Final Destination',
        poster: '/images/streaming/final.jpg',
      },
      {
        id: '28-years-later',
        title: '28 Years Later',
        poster: '/images/streaming/28years.jpg',
      },
    ],
  },
  {
    title: 'Für dich empfohlen',
    movies: [
      {
        id: 'batman',
        title: 'The Batman',
        poster: '/images/streaming/batman.jpg',
      },
      {
        id: 'avatar',
        title: 'Avatar 2',
        poster: '/images/streaming/avatar.jpg',
      },
      {
        id: 'matrix',
        title: 'Matrix Resurrections',
        poster: '/images/streaming/matrix.jpg',
      },
    ],
  },
];

export default function StreamingHomePage() {
  const router = useRouter();

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 960, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
      {/* Hero-Bereich */}
      <Box
        sx={{
          width: '100%',
          minHeight: { xs: '60vh', md: '80vh' },
          backgroundImage: `url(${heroMovie.image})`,
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
            {heroMovie.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {heroMovie.description}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
            onClick={() =>
              router.push(`/entertainment/streaming/${heroMovie.id}`)
            }
          >
            ▶ Jetzt ansehen
          </Button>
          <Button
            variant="outlined"
            sx={{ color: '#fff', borderColor: '#fff' }}
          >
            + Merkliste
          </Button>
        </Box>
      </Box>

      {/* Kategorien */}
      {categories.map((category) => (
        <Box key={category.title} sx={{ px: { xs: 2, md: 8 }, py: 4 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
            {category.title}
          </Typography>
          <Slider {...sliderSettings}>
            {category.movies.map((movie) => (
              <Box
                key={movie.id}
                sx={{
                  cursor: 'pointer',
                  '&:hover img': { transform: 'scale(1.05)' },
                  transition: 'transform 0.3s ease',
                }}
                onClick={() =>
                  router.push(`/entertainment/streaming/${movie.id}`)
                }
              >
                <Box sx={{ overflow: 'hidden', borderRadius: 2 }}>
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '8px',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </Box>
                <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                  {movie.title}
                </Typography>
              </Box>
            ))}
          </Slider>
        </Box>
      ))}
    </Box>
  );
}
