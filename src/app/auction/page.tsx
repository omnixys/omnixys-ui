'use client';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

// Dummy-Auktionen
const auctions = [
  {
    id: '1',
    title: 'Apple iPhone 14 Pro',
    description: 'Neuwertig, 128GB',
    currentPrice: 850,
    image: '/images/iphone14.jpg',
    status: 'ACTIVE',
    category: 'Elektronik',
  },
  {
    id: '2',
    title: 'PlayStation 5',
    description: 'Neu, ungeöffnet',
    currentPrice: 550,
    image: '/images/ps5.jpg',
    status: 'ACTIVE',
    category: 'Gaming',
  },
  {
    id: '3',
    title: 'Rolex Submariner',
    description: 'Luxusuhr, Sammlerstück',
    currentPrice: 8500,
    image: '/images/rolex.jpg',
    status: 'ACTIVE',
    category: 'Luxus',
  },
];

const AuctionCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: theme.shadows[6],
  },
}));

export default function AuctionsPage() {
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const filteredAuctions = auctions.filter(
    (a) =>
      (category ? a.category === category : true) &&
      (status ? a.status === status : true),
  );

  return (
    <Box>
      {/* HERO-BANNER */}
      <Box
        sx={{
          background: 'linear-gradient(90deg, #6A4BBC, #4E3792)',
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
          color: 'white',
          mb: 4,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Entdecke spannende Auktionen
        </Typography>
        <Typography variant="subtitle1">
          Biete live und finde großartige Deals
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#FFFFFF', color: '#6A4BBC' }}
          >
            Jetzt mitbieten
          </Button>
          <Button
            variant="outlined"
            sx={{ color: '#FFFFFF', borderColor: '#FFFFFF' }}
          >
            Auktion erstellen
          </Button>
        </Box>
      </Box>

      {/* FILTER */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Kategorie</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="">Alle</MenuItem>
            <MenuItem value="Elektronik">Elektronik</MenuItem>
            <MenuItem value="Gaming">Gaming</MenuItem>
            <MenuItem value="Luxus">Luxus</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="">Alle</MenuItem>
            <MenuItem value="ACTIVE">Aktiv</MenuItem>
            <MenuItem value="ENDED">Beendet</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* AUKTIONEN GRID */}
      <Grid container spacing={3}>
        {filteredAuctions.map((auction) => (
          <Grid item xs={12} sm={6} md={4} key={auction.id}>
            <AuctionCard>
              <CardMedia component="img" height="200" image={auction.image} />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {auction.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {auction.description}
                </Typography>
                <Chip
                  label={`Preis: ${auction.currentPrice} €`}
                  color="primary"
                />
              </CardContent>
            </AuctionCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
