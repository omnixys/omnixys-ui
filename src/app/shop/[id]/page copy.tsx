'use client';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useState } from 'react';

export default function ProductDetailPage() {
  const theme = useTheme();
  const isDesktop = useMediaQuery('(min-width:1024px)');

  const product = {
    id: '123',
    name: 'Omnixys Hoodie',
    price: 59.99,
    description:
      'Hochwertiger Omnixys Hoodie aus Bio-Baumwolle. Perfekt für Komfort und Stil.',
    images: [
      '/images/hoodie.png',
      '/images/hoodie-back.png',
      '/images/hoodie-detail.png',
    ],
    variants: ['S', 'M', 'L', 'XL'],
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [zoomStyle, setZoomStyle] = useState({ transform: 'scale(1)' });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) return;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomStyle({
      transform: 'scale(2)',
      transformOrigin: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    if (!isDesktop) return;
    setZoomStyle({ transform: 'scale(1)' });
  };

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
  };

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Bilder */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              mb: 2,
              overflow: 'hidden',
              cursor: isDesktop ? 'zoom-in' : 'pointer',
              height: 400,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => openLightbox(product.images.indexOf(selectedImage))}
          >
            <CardMedia
              component="img"
              image={selectedImage}
              alt={product.name}
              sx={{
                height: '100%',
                width: '100%',
                objectFit: 'contain',
                transition: 'transform 0.2s ease-out',
                ...zoomStyle,
              }}
            />
          </Card>

          {/* Thumbnails */}
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
            {product.images.map((img, i) => (
              <Card
                key={i}
                sx={{
                  width: 80,
                  height: 80,
                  border:
                    selectedImage === img
                      ? `2px solid ${theme.palette.primary.main}`
                      : '1px solid #ccc',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedImage(img)}
              >
                <CardMedia
                  component="img"
                  image={img}
                  sx={{ objectFit: 'contain' }}
                />
              </Card>
            ))}
          </Stack>
        </Grid>

        {/* Produktdetails */}
        <Grid item xs={12} md={4}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            {product.name}
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: theme.palette.primary.main, mb: 2 }}
          >
            € {product.price.toFixed(2)}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1" sx={{ mb: 3 }}>
            {product.description}
          </Typography>

          {/* Varianten */}
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Größe:
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            {product.variants.map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </Button>
            ))}
          </Stack>
        </Grid>

        {/* Kauf-Box */}
        <Grid item xs={12} md={2}>
          <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: 2,
              p: 2,
              position: { md: 'sticky' },
              top: 100,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Preis: € {product.price.toFixed(2)}
            </Typography>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartIcon />}
              sx={{ mb: 2 }}
            >
              In den Warenkorb
            </Button>
            <Button fullWidth variant="outlined" color="secondary">
              Jetzt kaufen
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Lightbox */}
      <Dialog
        fullScreen
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'black',
            height: '100%',
            position: 'relative',
          }}
        >
          <IconButton
            sx={{ position: 'absolute', top: 16, right: 16, color: 'white' }}
            onClick={() => setLightboxOpen(false)}
          >
            <CloseIcon />
          </IconButton>

          <IconButton
            sx={{ position: 'absolute', top: '50%', left: 16, color: 'white' }}
            onClick={prevImage}
          >
            <ArrowBackIosIcon />
          </IconButton>

          <img
            src={product.images[currentIndex]}
            alt="Zoom"
            style={{ maxHeight: '90%', maxWidth: '90%' }}
          />

          <IconButton
            sx={{ position: 'absolute', top: '50%', right: 16, color: 'white' }}
            onClick={nextImage}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Dialog>
    </Container>
  );
}
