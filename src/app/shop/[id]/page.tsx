'use client';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Dialog,
  Fab,
  Grid,
  IconButton,
  LinearProgress,
  Rating,
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

  // Upload States
  const [newRating, setNewRating] = useState<number | null>(0);
  const [newReview, setNewReview] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);

  // Lightbox States
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxContent, setLightboxContent] = useState<{
    type: string;
    src: string;
  } | null>(null);

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

  // Simulierter Upload mit Fortschritt
  useEffect(() => {
    if (uploadedFiles.length > 0) {
      const progressArray = new Array(uploadedFiles.length).fill(0);
      setUploadProgress(progressArray);

      uploadedFiles.forEach((_, index) => {
        const interval = setInterval(() => {
          setUploadProgress((prev) => {
            const newProgress = [...prev];
            if (newProgress[index] < 100) {
              newProgress[index] += 10;
            }
            return newProgress;
          });
        }, 200);

        setTimeout(() => clearInterval(interval), 2200);
      });
    }
  }, [uploadedFiles]);

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
    setUploadProgress((prev) => prev.filter((_, i) => i !== index));
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Lightbox öffnen
  const openLightbox = (type: string, src: string) => {
    setLightboxContent({ type, src });
    setLightboxOpen(true);
  };

  // Infinite Scroll
  useEffect(() => {
    if (loading || visibleCount >= reviews.length) return;
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
  }, [loading, visibleCount, reviews.length]);

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
    setUploadProgress([]);

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

        {/* Drag & Drop */}
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

        {/* Vorschau + Fortschritt */}
        {filePreviews.length > 0 && (
          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
            {filePreviews.map((preview, index) => (
              <Box key={index} sx={{ position: 'relative', width: 100 }}>
                {uploadedFiles[index].type.startsWith('video/') ? (
                  <video
                    src={preview}
                    style={{
                      width: '100%',
                      borderRadius: 8,
                      cursor: 'pointer',
                    }}
                    onClick={() => openLightbox('video', preview)}
                  />
                ) : (
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: '100%',
                      borderRadius: 8,
                      cursor: 'pointer',
                    }}
                    onClick={() => openLightbox('image', preview)}
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
                {uploadProgress[index] < 100 && (
                  <LinearProgress
                    variant="determinate"
                    value={uploadProgress[index]}
                    sx={{ mt: 1 }}
                  />
                )}
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

      {/* Lightbox */}
      <Dialog
        fullScreen
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      >
        <Box
          sx={{
            bgcolor: 'black',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconButton
            onClick={() => setLightboxOpen(false)}
            sx={{ position: 'absolute', top: 16, right: 16, color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
          {lightboxContent?.type === 'image' && (
            <img
              src={lightboxContent.src}
              alt="Preview"
              style={{ maxWidth: '90%', maxHeight: '90%' }}
            />
          )}
          {lightboxContent?.type === 'video' && (
            <video
              src={lightboxContent.src}
              controls
              style={{ maxWidth: '90%', maxHeight: '90%' }}
            />
          )}
        </Box>
      </Dialog>

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

// Hilfsfunktion für Durchschnitt
function calcAverageRating(arr: { rating: number }[]) {
  const total = arr.reduce((sum, r) => sum + r.rating, 0);
  return total / arr.length;
}
