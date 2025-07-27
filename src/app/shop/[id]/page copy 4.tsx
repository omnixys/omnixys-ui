'use client';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function ProductDetailPage() {
  const theme = useTheme();
  const isDesktop = useMediaQuery('(min-width:1024px)');

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
    variants: ['S', 'M', 'L', 'XL'],
  };

  const reviews = [
    {
      user: 'Max Mustermann',
      date: '10. Juli 2025',
      rating: 5,
      text: 'Super Hoodie! Sehr bequem und top Qualität.',
      image: '/images/review1.png',
    },
    {
      user: 'Anna Müller',
      date: '8. Juli 2025',
      rating: 4,
      text: 'Tolle Farbe und passt perfekt. Lieferung war schnell.',
      image: '',
    },
    {
      user: 'Tom Schmidt',
      date: '5. Juli 2025',
      rating: 5,
      text: 'Ich liebe den Stoff! Absolut empfehlenswert.',
      image: '',
    },
  ];

  const similarProducts = [
    { name: 'Omnixys Cap', price: 19.99, img: '/images/cap.png' },
    { name: 'Omnixys T-Shirt', price: 24.99, img: '/images/tshirt.png' },
    { name: 'Omnixys Mug', price: 14.99, img: '/images/mug.png' },
  ];

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleWheelZoom = (e: React.WheelEvent) => {
    e.preventDefault();
    let newZoom = zoom + (e.deltaY > 0 ? -0.1 : 0.1);
    if (newZoom < 1) newZoom = 1;
    if (newZoom > 3) newZoom = 3;
    setZoom(newZoom);
    if (newZoom === 1) setOffset({ x: 0, y: 0 });
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
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1" sx={{ mb: 3 }}>
            {product.description}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingCartIcon />}
            sx={{ mr: 2 }}
          >
            In den Warenkorb
          </Button>
          <Button variant="outlined" color="secondary">
            Jetzt kaufen
          </Button>
        </Grid>
      </Grid>

      {/* Ähnliche Produkte */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
          Ähnliche Produkte
        </Typography>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {similarProducts.map((item, idx) => (
            <SwiperSlide key={idx}>
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <CardMedia
                  component="img"
                  image={item.img}
                  sx={{ height: 150, objectFit: 'contain', mb: 1 }}
                />
                <CardContent>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    € {item.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <Button variant="outlined" size="small" color="primary">
                  Details
                </Button>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Bewertungen */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
          Kundenbewertungen
        </Typography>
        {reviews.map((review, index) => (
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
            {review.image && (
              <Card sx={{ width: 120, mt: 2 }}>
                <CardMedia
                  component="img"
                  image={review.image}
                  alt="Review Image"
                />
              </Card>
            )}
          </Box>
        ))}
      </Box>

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
              transition: 'transform 0.2s ease-out',
              maxHeight: '90%',
              maxWidth: '90%',
              touchAction: 'none',
            }}
            onWheel={handleWheelZoom}
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
