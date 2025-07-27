'use client';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';

export default function ProductDetailPage() {
  const theme = useTheme();

  const [reviews, setReviews] = useState([
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
  ]);

  const [product, setProduct] = useState({
    id: '123',
    name: 'Omnixys Hoodie',
    price: 59.99,
    description: 'Hochwertiger Omnixys Hoodie aus Bio-Baumwolle.',
    rating: calcAverageRating(reviews),
    reviewsCount: reviews.length,
    images: [
      '/images/hoodie.png',
      '/images/hoodie-back.png',
      '/images/hoodie-detail.png',
    ],
  });

  const [sortOption, setSortOption] = useState('neueste');
  const [filterStars, setFilterStars] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const reviewsPerLoad = 3;
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Formular-States
  const [newRating, setNewRating] = useState<number | null>(0);
  const [newReview, setNewReview] = useState('');
  const [newImage, setNewImage] = useState<File | null>(null);

  // Scroll-to-top
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Filter & Sort
  const filteredReviews = reviews
    .filter((r) => (filterStars ? r.rating === filterStars : true))
    .sort((a, b) => {
      if (sortOption === 'neueste')
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortOption === 'beste') return b.rating - a.rating;
      if (sortOption === 'schlechteste') return a.rating - b.rating;
      return 0;
    });

  const visibleReviews = filteredReviews.slice(0, visibleCount);

  // Infinite Scroll
  useEffect(() => {
    if (loading || visibleCount >= filteredReviews.length) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLoading(true);
        setTimeout(() => {
          setVisibleCount((prev) => prev + reviewsPerLoad);
          setLoading(false);
        }, 1000);
      }
    });
    if (loadMoreRef.current) observer.current.observe(loadMoreRef.current);
  }, [loading, visibleCount, filteredReviews.length]);

  // ✅ Funktion für neue Bewertung
  function handleReviewSubmit() {
    if (!newRating || !newReview) return;

    const newEntry = {
      user: 'Gast',
      date: new Date().toLocaleDateString('de-DE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      rating: newRating,
      text: newReview,
    };

    // **Optimistic Update**
    const updatedReviews = [newEntry, ...reviews];
    setReviews(updatedReviews);

    // Sterne-Durchschnitt neu berechnen
    setProduct((prev) => ({
      ...prev,
      reviewsCount: updatedReviews.length,
      rating: calcAverageRating(updatedReviews),
    }));

    // Reset Formular
    setNewRating(0);
    setNewReview('');
    setNewImage(null);

    alert('Bewertung erfolgreich hinzugefügt!');
  }

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
            <Rating value={product.rating} precision={0.1} readOnly />
            <Typography variant="body2">
              {product.rating.toFixed(1)} ({product.reviewsCount} Bewertungen)
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

        {/* Filter & Sort */}
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

        {/* Rezensionen */}
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

        {/* Skeleton bei Loading */}
        {loading && (
          <Box sx={{ mt: 3 }}>
            {[...Array(reviewsPerLoad)].map((_, idx) => (
              <Box key={idx} sx={{ mb: 3, p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Skeleton variant="circular" width={40} height={40} />
                  <Box>
                    <Skeleton variant="text" width={120} />
                    <Skeleton variant="text" width={80} />
                  </Box>
                </Stack>
                <Skeleton variant="text" width="80%" sx={{ mt: 1 }} />
                <Skeleton variant="text" width="90%" />
              </Box>
            ))}
          </Box>
        )}

        <div ref={loadMoreRef} />

        {/* Formular für neue Bewertung */}
        <Box sx={{ mt: 6, p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Eigene Bewertung hinzufügen
          </Typography>
          <Rating
            value={newRating}
            onChange={(e, v) => setNewRating(v)}
            size="large"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Schreibe deine Rezension..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="outlined" component="label" sx={{ mb: 2 }}>
            Bild hochladen
            <input
              type="file"
              hidden
              onChange={(e) => setNewImage(e.target.files?.[0] || null)}
            />
          </Button>
          {newImage && <Typography variant="body2">{newImage.name}</Typography>}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleReviewSubmit}
            disabled={!newRating || !newReview}
          >
            Bewertung absenden
          </Button>
        </Box>
      </Box>

      {/* Scroll-to-Top Button */}
      {showScrollTop && (
        <Fab
          onClick={scrollToTop}
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 2000,
            bgcolor: theme.palette.primary.main,
            '&:hover': { bgcolor: theme.palette.secondary.main },
          }}
        >
          <ArrowUpwardIcon />
        </Fab>
      )}
    </Container>
  );
}

// ✅ Durchschnitt neu berechnen
function calcAverageRating(arr: { rating: number }[]) {
  const total = arr.reduce((sum, r) => sum + r.rating, 0);
  return total / arr.length;
}
