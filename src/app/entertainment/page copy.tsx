'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function EntertainmentPage() {
  const router = useRouter();

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        textAlign: 'center',
        py: 8,
      }}
    >
      {/* Headline */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 3,
        }}
      >
        Entertainment Hub
      </Typography>

      <Typography
        variant="h6"
        sx={{
          maxWidth: '600px',
          mb: 6,
          color: 'text.secondary',
        }}
      >
        Wähle aus, ob du Kino erleben oder exklusive Streaming-Inhalte genießen
        möchtest.
      </Typography>

      {/* Buttons */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
        }}
      >
        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'secondary.main' },
            px: 6,
            py: 2,
            fontSize: '1.2rem',
            borderRadius: '12px',
          }}
          onClick={() => router.push('/entertainment/cinema')}
        >
          🎬 Kino
        </Button>

        <Button
          variant="outlined"
          size="large"
          sx={{
            color: 'primary.main',
            borderColor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.light',
              borderColor: 'primary.main',
            },
            px: 6,
            py: 2,
            fontSize: '1.2rem',
            borderRadius: '12px',
          }}
          onClick={() => router.push('/entertainment/streaming')}
        >
          📺 Streaming (Elite / Supreme)
        </Button>
      </Box>
    </Container>
  );
}
