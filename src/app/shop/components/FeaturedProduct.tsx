// Pfad: components/FeaturedProduct.tsx

'use client';

import Image from 'next/image';
import * as React from 'react';
import { assets } from '../assets/assets';

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type Featured = {
  id: number;
  image: any; // bei Next-Static-Imports ist der Typ meist 'StaticImageData'
  title: string;
  description: string;
};

const products: Featured[] = [
  {
    id: 1,
    image: assets.girl_with_headphone_image,
    title: 'Unparalleled Sound',
    description: 'Experience crystal-clear audio with premium headphones.',
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    title: 'Stay Connected',
    description: 'Compact and stylish earphones for every occasion.',
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    title: 'Power in Every Pixel',
    description: 'Shop the latest laptops for work, gaming, and more.',
  },
];

export default function FeaturedProduct(): React.JSX.Element {
  return (
    <Box mt={14}>
      {/* Heading */}
      <Stack alignItems="center" spacing={1}>
        <Typography
          variant="h4"
          fontWeight={500}
          sx={{ typography: { xs: 'h5', md: 'h4' } }}
        >
          Featured Products
        </Typography>
        <Box
          width={112}
          height={4}
          sx={{ bgcolor: '#ea580c', borderRadius: 2 }}
        />
      </Stack>

      {/* Grid */}
      <Grid
        container
        spacing={{ xs: 2, sm: 3, lg: 4 }}
        mt={6}
        px={{ xs: 2, md: 14 }}
      >
        {products.map(({ id, image, title, description }) => (
          <Grid item xs={12} sm={6} lg={4} key={id}>
            <Box
              position="relative"
              overflow="hidden"
              borderRadius={2}
              sx={{
                // Hover-Effekte über CSS-Selektoren
                cursor: 'pointer',
                '&:hover .featured-img': { filter: 'brightness(0.75)' },
                '&:hover .featured-overlay': { transform: 'translateY(-16px)' },
                transition: 'filter 300ms ease',
              }}
            >
              <Image
                src={image}
                alt={title}
                className="featured-img"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  transition: 'filter 300ms ease',
                  display: 'block',
                }}
                // Breite/Höhe kommen bei Static Imports mit
              />

              {/* Overlay-Text */}
              <Box
                className="featured-overlay"
                position="absolute"
                bottom={32}
                left={32}
                right={32}
                color="#fff"
                sx={{ transition: 'transform 300ms ease' }}
              >
                <Stack spacing={1.0} maxWidth={360}>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ typography: { lg: 'h5' } }}
                  >
                    {title}
                  </Typography>
                  <Typography variant="body2" lineHeight={1.4}>
                    {description}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 0.5,
                      alignSelf: 'flex-start',
                      bgcolor: '#ea580c',
                      '&:hover': { bgcolor: '#c2410c' },
                      gap: 1.5,
                      px: 2,
                      py: 1,
                      borderRadius: 1.5,
                    }}
                    endIcon={
                      <Image
                        src={assets.redirect_icon}
                        alt="Redirect Icon"
                        width={12}
                        height={12}
                        style={{ display: 'block' }}
                      />
                    }
                  >
                    Buy now
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
