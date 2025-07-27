'use client';

import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const dummyShowtimes = [
  { time: '14:00', hall: 'Saal 1' },
  { time: '17:30', hall: 'Saal 2' },
  { time: '20:15', hall: 'Saal 1' },
];

export default function ShowtimesPage() {
  const searchParams = useSearchParams();
  const movieId = searchParams.get('movie');

  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);

  const handleShowtimeSelect = (_: any, newTime: string | null) => {
    if (newTime !== null) {
      setSelectedShowtime(newTime);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 6,
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Header */}
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}
      >
        🎟 Ticket buchen
      </Typography>

      <Typography variant="h6" sx={{ mb: 4 }}>
        Film-ID: {movieId || 'Unbekannt'}
      </Typography>

      {/* Showtime Auswahl */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          borderRadius: 3,
          textAlign: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
          Wähle eine Uhrzeit:
        </Typography>
        <ToggleButtonGroup
          value={selectedShowtime}
          exclusive
          onChange={handleShowtimeSelect}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
          }}
        >
          {dummyShowtimes.map((show, index) => (
            <ToggleButton key={index} value={show.time}>
              {show.time} – {show.hall}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Paper>

      {/* Sitzplatz-Auswahl */}
      {selectedShowtime && (
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" sx={{ mb: 3 }}>
            Sitzplatz auswählen
          </Typography>

          {/* Einfaches Sitzplan-Grid */}
          <Grid container spacing={1} justifyContent="center">
            {Array.from({ length: 30 }).map((_, i) => (
              <Grid item key={i}>
                <Button
                  variant="outlined"
                  sx={{
                    minWidth: 40,
                    minHeight: 40,
                    p: 0,
                    borderColor: 'primary.main',
                    '&:hover': { bgcolor: 'primary.light' },
                  }}
                >
                  {i + 1}
                </Button>
              </Grid>
            ))}
          </Grid>

          {/* Kaufbutton */}
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'secondary.main' },
                px: 6,
                py: 2,
                borderRadius: '12px',
              }}
              onClick={() => alert(`Ticket für ${selectedShowtime} gebucht!`)}
            >
              Jetzt kaufen
            </Button>
          </Box>
        </Paper>
      )}
    </Container>
  );
}
