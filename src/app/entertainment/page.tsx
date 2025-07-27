'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        py: 8,
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: 'center', mb: 6 }}>
        {/* Hero Section */}
        <Typography
          variant="h2"
          sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}
        >
          Willkommen bei Omnixys Entertainment
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 6 }}>
          Wähle deine Welt: Kino-Feeling vor Ort oder Streaming-Erlebnis nur für
          Elite- und Supreme-Kunden.
        </Typography>

        {/* Auswahl-Karten */}
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 4,
                boxShadow: 4,
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.05)' },
                bgcolor: 'background.paper',
              }}
            >
              <CardContent>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}
                >
                  🎬 Kino
                </Typography>
                <Typography sx={{ mb: 4, color: 'text.secondary' }}>
                  Finde aktuelle Filme, buche Tickets und erlebe die große
                  Leinwand!
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    px: 5,
                    py: 1.5,
                    fontSize: '1.2rem',
                    borderRadius: '12px',
                  }}
                  onClick={() => router.push('/entertainment/cinema')}
                >
                  Jetzt entdecken
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 4,
                boxShadow: 4,
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.05)' },
                bgcolor: 'background.paper',
              }}
            >
              <CardContent>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 'bold', mb: 2, color: 'secondary.main' }}
                >
                  📺 Streaming
                </Typography>
                <Typography sx={{ mb: 4, color: 'text.secondary' }}>
                  Exklusive Serien & Filme – nur für Elite- und Supreme-Kunden.
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  sx={{
                    px: 5,
                    py: 1.5,
                    fontSize: '1.2rem',
                    borderRadius: '12px',
                  }}
                  onClick={() => router.push('/entertainment/streaming')}
                >
                  Jetzt starten
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
