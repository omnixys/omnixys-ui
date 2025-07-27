'use client';

import SearchIcon from '@mui/icons-material/Search';
import {
  AppBar,
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
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useState } from 'react';

// Dummy-Daten
const auctions = [
  {
    id: '1',
    title: 'Apple iPhone 14 Pro',
    description: 'Neuwertig, 128GB, inkl. OVP',
    currentPrice: 850,
    startingPrice: 700,
    endsAt: '2025-07-25T18:00:00',
    image: '/images/iphone14.jpg',
    status: 'ACTIVE',
    category: 'Elektronik',
  },
  {
    id: '2',
    title: 'PlayStation 5 Digital Edition',
    description: 'Originalverpackt, neu',
    currentPrice: 550,
    startingPrice: 500,
    endsAt: '2025-07-27T21:00:00',
    image: '/images/ps5.jpg',
    status: 'ACTIVE',
    category: 'Gaming',
  },
  {
    id: '3',
    title: 'Rolex Submariner',
    description: 'Luxusuhr, Sammlerstück',
    currentPrice: 8500,
    startingPrice: 7500,
    endsAt: '2025-07-30T20:00:00',
    image: '/images/rolex.jpg',
    status: 'ACTIVE',
    category: 'Luxus',
  },
];

// Styled Components
const AuctionCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: theme.shadows[6],
  },
}));

const AnimatedLogo = styled(Image)({
  animation: 'spin 6s linear infinite',
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
});

export default function AuctionPage() {
  const [selectedAuction, setSelectedAuction] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  const filteredAuctions = auctions.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) &&
      (category ? a.category === category : true) &&
      (status ? a.status === status : true),
  );

  return (
    <Box sx={{ backgroundColor: '#F8F8FC', minHeight: '100vh' }}>
      {/* HEADER */}
      <AppBar position="sticky" sx={{ backgroundColor: '#6A4BBC' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <AnimatedLogo
              src="/images/omnixys-symbol.png"
              alt="Omnixys Logo"
              width={40}
              height={40}
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Omnixys Auction
            </Typography>
          </Box>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Suche Auktionen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1 }} />,
            }}
            sx={{ backgroundColor: 'white', borderRadius: 1, width: 250 }}
          />
        </Toolbar>
      </AppBar>

      {/* HERO-SECTION */}
      <Box
        sx={{
          width: '100%',
          height: { xs: '250px', md: '400px' },
          background: 'linear-gradient(90deg, #6A4BBC, #4E3792)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            animation: 'fadeIn 2s ease',
            '@keyframes fadeIn': {
              '0%': { opacity: 0, transform: 'translateY(20px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          Entdecke spannende Auktionen
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mt: 1,
            animation: 'fadeIn 3s ease',
            '@keyframes fadeIn': {
              '0%': { opacity: 0 },
              '100%': { opacity: 1 },
            },
          }}
        >
          Verkaufe, kaufe & biete live – jetzt mit Omnixys Auction
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#FFFFFF',
              color: '#6A4BBC',
              fontWeight: 'bold',
            }}
          >
            Jetzt mitbieten
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: 'white',
              borderColor: 'white',
              fontWeight: 'bold',
            }}
          >
            Auktion erstellen
          </Button>
        </Box>
      </Box>

      {/* FILTER-BEREICH */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          p: 3,
          flexWrap: 'wrap',
        }}
      >
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Kategorie</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Kategorie"
          >
            <MenuItem value="">Alle</MenuItem>
            <MenuItem value="Elektronik">Elektronik</MenuItem>
            <MenuItem value="Gaming">Gaming</MenuItem>
            <MenuItem value="Luxus">Luxus</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="">Alle</MenuItem>
            <MenuItem value="ACTIVE">Aktiv</MenuItem>
            <MenuItem value="ENDED">Beendet</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* AUKTIONSLISTE */}
      <Box sx={{ p: 4 }}>
        {selectedAuction ? (
          <Box>
            <Button
              variant="outlined"
              onClick={() => setSelectedAuction(null)}
              sx={{ mb: 3 }}
            >
              Zurück zur Übersicht
            </Button>
            <Card sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <CardMedia
                component="img"
                height="400"
                image={selectedAuction.image}
                alt={selectedAuction.title}
              />
              <CardContent>
                <Typography variant="h5" sx={{ color: '#312E81', mb: 1 }}>
                  {selectedAuction.title}
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  {selectedAuction.description}
                </Typography>
                <Chip
                  label={`Aktueller Preis: ${selectedAuction.currentPrice} €`}
                  color="primary"
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary">
                  Gebot abgeben
                </Button>
              </CardContent>
            </Card>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredAuctions.map((auction) => (
              <Grid item xs={12} sm={6} md={4} key={auction.id}>
                <AuctionCard onClick={() => setSelectedAuction(auction)}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={auction.image}
                    alt={auction.title}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ color: '#312E81', fontWeight: 'bold' }}
                    >
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
        )}
      </Box>
    </Box>
  );
}
