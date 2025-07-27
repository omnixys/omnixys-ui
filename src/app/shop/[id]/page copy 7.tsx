'use client';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

export default function ProductDetailPage() {
  const theme = useTheme();

  const product = {
    id: '123',
    name: 'Omnixys Hoodie',
    price: 59.99,
    description: 'Hochwertiger Omnixys Hoodie aus Bio-Baumwolle.',
    rating: 4.5,
    reviewsCount: 128,
    images: [
      '/images/hoodie.png',
      '/images/hoodie-back.png',
      '/images/hoodie-detail.png',
    ],
  };

  const allReviews = [
    {
      user: 'Max Mustermann',
      date: '10. Juli 2025',
      rating: 5,
      text: 'Super Hoodie! Sehr bequem und top Qualität.',
    },
    {
      user: 'Anna Müller',
      date: '8. Juli 2025',
      rating: 4,
      text: 'Tolle Farbe und passt perfekt. Lieferung war schnell.',
    },
    {
      user: 'Tom Schmidt',
      date: '5. Juli 2025',
      rating: 3,
      text: 'Qualität ist gut, aber hätte schneller geliefert werden können.',
    },
    {
      user: 'Lisa Becker',
      date: '2. Juli 2025',
      rating: 5,
      text: 'Absolut begeistert!',
    },
    {
      user: 'Paul Weber',
      date: '1. Juli 2025',
      rating: 2,
      text: 'Nicht so wie erwartet, Material dünner.',
    },
    {
      user: 'Nina Hoffmann',
      date: '28. Juni 2025',
      rating: 4,
      text: 'Gut, aber Verpackung beschädigt.',
    },
    {
      user: 'Jonas Klein',
      date: '25. Juni 2025',
      rating: 5,
      text: 'Perfekt! Immer wieder.',
    },
  ];

  const [sortOption, setSortOption] = useState('neueste');
  const [filterStars, setFilterStars] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // ✅ Filter & Sort
  const filteredReviews = allReviews
    .filter((r) => (filterStars ? r.rating === filterStars : true))
    .sort((a, b) => {
      if (sortOption === 'neueste')
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortOption === 'beste') return b.rating - a.rating;
      if (sortOption === 'schlechteste') return a.rating - b.rating;
      return 0;
    });

  const visibleReviews = filteredReviews.slice(0, visibleCount);

  return (
    <Container sx={{ py: 4 }}>
      {/* Produktdetails */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 2, overflow: 'hidden', height: 400 }}>
            <CardMedia
              component="img"
              image={product.images[0]}
              alt={product.name}
              sx={{ height: '100%', objectFit: 'contain' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            {product.name}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography variant="body2">
              {product.rating} ({product.reviewsCount} Bewertungen)
            </Typography>
          </Stack>
          <Typography
            variant="h5"
            sx={{ color: theme.palette.primary.main, mb: 2 }}
          >
            € {product.price.toFixed(2)}
          </Typography>
        </Grid>
      </Grid>

      {/* Bewertungen */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
          Kundenbewertungen
        </Typography>

        {/* Filter & Sortierung */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Sortieren nach</InputLabel>
            <Select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              label="Sortieren nach"
            >
              <MenuItem value="neueste">Neueste</MenuItem>
              <MenuItem value="beste">Beste Bewertungen</MenuItem>
              <MenuItem value="schlechteste">Schlechteste Bewertungen</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Bewertung filtern</InputLabel>
            <Select
              value={filterStars}
              onChange={(e) => setFilterStars(Number(e.target.value))}
              label="Bewertung filtern"
            >
              <MenuItem value={0}>Alle</MenuItem>
              <MenuItem value={5}>5 Sterne</MenuItem>
              <MenuItem value={4}>4 Sterne</MenuItem>
              <MenuItem value={3}>3 Sterne</MenuItem>
              <MenuItem value={2}>2 Sterne</MenuItem>
              <MenuItem value={1}>1 Stern</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {/* Rezensionen anzeigen */}
        {visibleReviews.map((review, index) => (
          <Box key={index} sx={{ mb: 3, p: 2, borderBottom: '1px solid #ddd' }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar>{review.user[0]}</Avatar>
              <Box>
                <Typography variant="subtitle2">{review.user}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {review.date}
                </Typography>
              </Box>
            </Stack>
            <Rating
              value={review.rating}
              readOnly
              size="small"
              sx={{ mt: 1 }}
            />
            <Typography variant="body2" sx={{ mt: 1 }}>
              {review.text}
            </Typography>
          </Box>
        ))}

        {visibleReviews.length === 0 && (
          <Typography variant="body2" sx={{ mt: 3 }}>
            Keine Bewertungen für diesen Filter.
          </Typography>
        )}

        {/* Load More Button */}
        {visibleCount < filteredReviews.length && (
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setVisibleCount((prev) => prev + 3)}
            >
              Mehr laden
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}
