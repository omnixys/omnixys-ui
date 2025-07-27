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
import React, { useRef, useState } from 'react';

export default function ProductDetailPage() {
  const theme = useTheme();
  const isDesktop = useMediaQuery('(min-width:1024px)');

  const product = {
    id: '123',
    name: 'Omnixys Hoodie',
    price: 59.99,
    description: 'Hochwertiger Omnixys Hoodie aus Bio-Baumwolle.',
    images: [
      '/images/hoodie.png',
      '/images/hoodie-back.png',
      '/images/hoodie-detail.png',
    ],
    variants: ['S', 'M', 'L', 'XL'],
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Zoom & Drag States
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [touches, setTouches] = useState<any[]>([]);
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const imgRef = useRef<HTMLImageElement | null>(null);

  // ✅ Scroll-Zoom (Desktop)
  const handleWheelZoom = (e: React.WheelEvent) => {
    e.preventDefault();
    let newZoom = zoom + (e.deltaY > 0 ? -0.1 : 0.1);
    if (newZoom < 1) newZoom = 1;
    if (newZoom > 3) newZoom = 3;
    setZoom(newZoom);
    if (newZoom === 1) setOffset({ x: 0, y: 0 });
  };

  // ✅ Pinch-Zoom (Mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setTouches([
        { x: e.touches[0].clientX, y: e.touches[0].clientY },
        { x: e.touches[1].clientX, y: e.touches[1].clientY },
      ]);
    } else if (e.touches.length === 1 && zoom > 1) {
      setDragging(true);
      setStartPos({
        x: e.touches[0].clientX - offset.x,
        y: e.touches[0].clientY - offset.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touches.length === 2) {
      const newTouches = [
        { x: e.touches[0].clientX, y: e.touches[0].clientY },
        { x: e.touches[1].clientX, y: e.touches[1].clientY },
      ];
      const oldDistance = Math.hypot(
        touches[0].x - touches[1].x,
        touches[0].y - touches[1].y,
      );
      const newDistance = Math.hypot(
        newTouches[0].x - newTouches[1].x,
        newTouches[0].y - newTouches[1].y,
      );
      let newZoom = zoom + (newDistance - oldDistance) / 200;
      if (newZoom < 1) newZoom = 1;
      if (newZoom > 3) newZoom = 3;
      setZoom(newZoom);
      setTouches(newTouches);
    } else if (dragging && zoom > 1 && e.touches.length === 1) {
      const newX = e.touches[0].clientX - startPos.x;
      const newY = e.touches[0].clientY - startPos.y;
      setOffset({ x: newX, y: newY });
    }
  };

  const handleTouchEnd = () => {
    setDragging(false);
    if (zoom === 1) setOffset({ x: 0, y: 0 });
  };

  // ✅ Drag für Desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setDragging(true);
      setStartPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging && zoom > 1) {
      const newX = e.clientX - startPos.x;
      const newY = e.clientY - startPos.y;
      setOffset({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % product.images.length);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
    setZoom(1);
    setOffset({ x: 0, y: 0 });
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
              cursor: 'pointer',
              height: 400,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => setLightboxOpen(true)}
          >
            <CardMedia
              component="img"
              image={selectedImage}
              alt={product.name}
              sx={{ height: '100%', width: '100%', objectFit: 'contain' }}
            />
          </Card>

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
                onClick={() => {
                  setSelectedImage(img);
                  setCurrentIndex(i);
                }}
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
            overflow: 'hidden',
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
            ref={imgRef}
            src={product.images[currentIndex]}
            alt="Zoom"
            style={{
              transform: `scale(${zoom}) translate(${offset.x}px, ${offset.y}px)`,
              transition: dragging ? 'none' : 'transform 0.1s ease-out',
              maxHeight: '90%',
              maxWidth: '90%',
              touchAction: 'none',
              cursor: zoom > 1 ? 'grab' : 'default',
            }}
            onWheel={handleWheelZoom}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
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
