'use client';

import { Box, Container } from '@mui/material';
import CategoryGrid from './components/CategoryGrid';
import HeroSection from './components/HeroSection';
import OffersSection from './components/OffersSection';

export const dummyOffers = [
  {
    title: 'Flug nach Bali',
    location: 'Indonesien',
    price: 499,
    image: '/images/bali.jpg',
  },
  {
    title: 'Bungee Jumping',
    location: 'Neuseeland',
    price: 120,
    image: '/images/bungee.jpg',
  },
  {
    title: 'OmnixysBnB Paris',
    location: 'Frankreich',
    price: 80,
    image: '/images/paris.jpg',
  },
  {
    title: 'Mietwagen in Rom',
    location: 'Italien',
    price: 35,
    image: '/images/rome-car.jpg',
  },
  {
    title: 'Free Fall Dubai',
    location: 'VAE',
    price: 250,
    image: '/images/dubai.jpg',
  },
];


export default function TravelPage() {
  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <HeroSection />
        <CategoryGrid />
        <OffersSection offers={dummyOffers} />
      </Container>
    </Box>
  );
}
