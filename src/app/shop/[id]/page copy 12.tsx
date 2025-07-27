'use client';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Fab,
  Grid,
  IconButton,
  Rating,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from 'react';

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
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);

  // Scroll-to-top Button
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Generate Previews
  useEffect(() => {
    const previews = uploadedFiles.map((file) => URL.createObjectURL(file));
    setFilePreviews(previews);
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  }, [uploadedFiles]);

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

  // Datei-Upload (Drag & Drop + Input)
  const handleFilesSelected = (files: FileList) => {
    const selectedFiles = Array.from(files);
    const validFiles = selectedFiles.filter(
      (file) =>
        file.type.startsWith('image/') || file.type.startsWith('video/'),
    );

    if (uploadedFiles.length + validFiles.length > 6) {
      alert('Maximal 5 Bilder und 1 Video erlaubt.');
      return;
    }

    setUploadedFiles((prev) => [...prev, ...validFiles]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFilesSelected(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Neue Bewertung absenden
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

    const updatedReviews = [newEntry, ...reviews];
    setReviews(updatedReviews);

    setProduct((prev) => ({
      ...prev,
      reviewsCount: updatedReviews.length,
      rating: calcAverageRating(updatedReviews),
    }));

    // Reset Formular
    setNewRating(0);
    setNewReview('');
    setUploadedFiles([]);
    setFilePreviews([]);

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

          {/* Drag & Drop Bereich */}
          <Box
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            sx={{
              border: '2px dashed #ccc',
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              mb: 2,
              bgcolor: '#fafafa',
              cursor: 'pointer',
            }}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <CloudUploadIcon fontSize="large" color="action" />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Dateien hier ablegen oder klicken zum Hochladen (max. 5 Bilder, 1
              Video)
            </Typography>
            <input
              type="file"
              id="file-input"
              hidden
              multiple
              accept="image/*,video/*"
              onChange={(e) =>
                e.target.files && handleFilesSelected(e.target.files)
              }
            />
          </Box>

          {/* Vorschau-Bereich */}
          {filePreviews.length > 0 && (
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
              {filePreviews.map((preview, index) => (
                <Box key={index} sx={{ position: 'relative', width: 100 }}>
                  {uploadedFiles[index].type.startsWith('video/') ? (
                    <video
                      src={preview}
                      controls
                      style={{ width: '100%', borderRadius: 8 }}
                    />
                  ) : (
                    <img
                      src={preview}
                      alt="Preview"
                      style={{ width: '100%', borderRadius: 8 }}
                    />
                  )}
                  <IconButton
                    size="small"
                    onClick={() => removeFile(index)}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      background: 'rgba(0,0,0,0.6)',
                      color: 'white',
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Stack>
          )}

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
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

// ✅ Durchschnitt berechnen
function calcAverageRating(arr: { rating: number }[]) {
  const total = arr.reduce((sum, r) => sum + r.rating, 0);
  return total / arr.length;
}
