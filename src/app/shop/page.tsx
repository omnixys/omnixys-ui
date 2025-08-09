'use client';
// Pfad: app/page.tsx

// Hinweis: Diese Seite nutzt MUI (statt Tailwind) und TypeScript.

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';

// Eigene Komponenten (bereits in deinem Projekt vorhanden)
import Banner from './components/Banner';
import FeaturedProduct from './components/FeaturedProduct';
import Footer from './components/Footer';
import HeaderSlider from './components/HeaderSlider';
import HomeProducts from './components/HomeProducts';
import Navbar from './components/Navbar';
import NewsLetter from './components/NewsLetter';

// Komponente als Client Component exportieren
export default function Home(): React.JSX.Element {
  return (
    <React.Fragment>
      {/* Globale CSS-Reset & Basistypografie */}
      <CssBaseline />

      {/* Obere Navigationsleiste */}
      <Navbar />

      {/* Hauptinhalt mit responsiven Abständen */}
      <Container maxWidth="lg">
        {/* Außenabstand vertikal, innen kein Tailwind sondern MUI */}
        <Box component="main" mt={{ xs: 2, md: 4 }} mb={{ xs: 4, md: 6 }}>
          <Box mb={{ xs: 3, md: 4 }}>
            <HeaderSlider />
          </Box>

          <Box mb={{ xs: 4, md: 6 }}>
            <HomeProducts />
          </Box>

          <Box mb={{ xs: 4, md: 6 }}>
            <FeaturedProduct />
          </Box>

          <Box mb={{ xs: 4, md: 6 }}>
            <Banner />
          </Box>

          <Box>
            <NewsLetter />
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <Footer />
    </React.Fragment>
  );
}
