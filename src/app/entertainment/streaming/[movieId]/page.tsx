'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

// Dummy-Daten (später via GraphQL)
const streamingMovies: Record<string, any> = {
  'dune-2': {
    title: 'Dune: Part Two',
    description:
      'Der Krieg um Arrakis geht weiter. Paul Atreides kämpft um sein Schicksal.',
    image: '/images/streaming/dune-hero.jpg',
    trailer: 'https://www.youtube.com/embed/U2Qp5pL3ovA',
    genre: 'Sci-Fi',
    duration: '160 Minuten',
    recommendations: [
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
    ],
  },
  superman: {
    title: 'Superman',
    description: 'Der Mann aus Stahl kämpft gegen eine neue Bedrohung.',
    image: '/images/streaming/superman-bg.jpg',
    trailer: 'https://www.youtube.com/embed/T6DJcgm3wNY',
    genre: 'Action',
    duration: '130 Minuten',
    recommendations: [
      {
        id: 'batman',
        title: 'The Batman',
        poster: '/images/streaming/batman.jpg',
      },
      {
        id: 'matrix',
        title: 'Matrix Resurrections',
        poster: '/images/streaming/matrix.jpg',
      },
    ],
  },
};

export default function StreamingDetailPage() {
  const { movieId } = useParams();
  const movie = streamingMovies[movieId as string];

  if (!movie) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" color="error">
          Film nicht gefunden
        </Typography>
      </Container>
    );
  }

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 960, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
      {/* Hero-Banner */}
      <Box
        sx={{
          width: '100%',
          minHeight: { xs: '60vh', md: '80vh' },
          backgroundImage: `url(${movie.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          px: { xs: 2, md: 8 },
          py: { xs: 6, md: 10 },
          color: '#fff',
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
            {movie.genre} | {movie.duration}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {movie.description}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 2, fontSize: '1rem', px: 4, py: 1 }}
            onClick={() => alert(`Spiele jetzt ${movie.title}`)}
          >
            ▶ Jetzt abspielen
          </Button>
          <Button
            variant="outlined"
            sx={{ color: '#fff', borderColor: '#fff' }}
            onClick={() => alert('Zur Merkliste hinzugefügt')}
          >
            + Merkliste
          </Button>
        </Box>
      </Box>

      {/* Trailer */}
      <Container sx={{ py: 6 }}>
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

      {/* Empfehlungen */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
          Ähnliche Inhalte
        </Typography>
        <Slider {...sliderSettings}>
          {movie.recommendations.map((rec: any) => (
            <Box
              key={rec.id}
              sx={{
                cursor: 'pointer',
                px: 1,
                '&:hover img': { transform: 'scale(1.05)' },
              }}
            >
              <Box sx={{ overflow: 'hidden', borderRadius: 2 }}>
                <img
                  src={rec.poster}
                  alt={rec.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    transition: 'transform 0.3s ease',
                  }}
                  onClick={() => alert(`Gehe zu ${rec.title}`)}
                />
              </Box>
              <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                {rec.title}
              </Typography>
            </Box>
          ))}
        </Slider>
      </Container>
    </Box>
  );
}
