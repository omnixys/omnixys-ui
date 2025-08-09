'use client';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Fab,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Page() {
  const theme = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Scroll Event für Button
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Simulierter Login-Check (Keycloak später)
  useEffect(() => {
    const token = localStorage.getItem('access_token'); // Platzhalter
    if (token) setIsLoggedIn(true);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const heroImages = [
    '/images/hero1.png',
    '/images/hero2.png',
    '/images/hero3.png',
  ];

  const sliders = [
    {
      title: 'Top-Angebote',
      products: [
        { name: 'Omnixys Hoodie', img: '/images/hoodie.png' },
        { name: 'Omnixys Mug', img: '/images/mug.png' },
        { name: 'Omnixys T-Shirt', img: '/images/tshirt.png' },
      ],
    },
    {
      title: 'Sommer-Angebote',
      products: [
        { name: 'Omnixys Sonnenbrille', img: '/images/sunglasses.png' },
        { name: 'Omnixys Beach Bag', img: '/images/beachbag.png' },
      ],
    },
  ];

  const recommendations = [
    { name: 'Omnixys Gaming Chair', img: '/images/gaming-chair.png' },
    { name: 'Omnixys Headset', img: '/images/headset.png' },
    { name: 'Omnixys Monitor', img: '/images/monitor.png' },
    { name: 'Omnixys Desk Lamp', img: '/images/lamp.png' },
  ];

  return (
    <Box sx={{ bgcolor: theme.palette.background.default }}>
      {/* Header */}
      <AppBar position="sticky" sx={{ bgcolor: theme.palette.primary.main }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Omnixys E-Shop
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              mx: 2,
              bgcolor: 'white',
              borderRadius: 1,
              px: 2,
              alignItems: 'center',
            }}
          >
            <InputBase placeholder="Produkte suchen..." sx={{ flex: 1 }} />
            <IconButton>
              <SearchIcon color="primary" />
            </IconButton>
          </Box>
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Kategorie-Leiste */}
      <Box
        sx={{
          position: 'sticky',
          top: 64,
          zIndex: 1000,
          bgcolor: theme.palette.secondary.main,
          color: 'white',
          py: 1,
          boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
        }}
      >
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}
        >
          {['Elektronik', 'Fashion', 'Gaming', 'Haushalt', 'Bücher'].map(
            (cat) => (
              <Button key={cat} sx={{ color: 'white', fontWeight: 'bold' }}>
                {cat}
              </Button>
            ),
          )}
        </Container>
      </Box>

      {/* Hero-Slider */}
      <Box sx={{ width: '100%', height: 400, mb: 4 }}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
          style={{ width: '100%', height: '100%' }}
        >
          {heroImages.map((img, i) => (
            <SwiperSlide key={i}>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Produkt-Slider */}
      {sliders.map((section, idx) => (
        <Container sx={{ mb: 6 }} key={idx}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            {section.title}
          </Typography>
          <Swiper
            spaceBetween={16}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
          >
            {section.products.map((p, i) => (
              <SwiperSlide key={i}>
                <Card sx={{ textAlign: 'center' }}>
                  <CardMedia
                    component="img"
                    image={p.img}
                    sx={{ height: 150 }}
                  />
                  <CardContent>
                    <Typography variant="body2">{p.name}</Typography>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      ))}

      {/* Personalisierte Empfehlungen */}
      {isLoggedIn && (
        <Container sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            Empfohlen für Sie
          </Typography>
          <Swiper
            spaceBetween={16}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
          >
            {recommendations.map((p, i) => (
              <SwiperSlide key={i}>
                <Card sx={{ textAlign: 'center' }}>
                  <CardMedia
                    component="img"
                    image={p.img}
                    sx={{ height: 150 }}
                  />
                  <CardContent>
                    <Typography variant="body2">{p.name}</Typography>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      )}

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
    </Box>
  );
}
