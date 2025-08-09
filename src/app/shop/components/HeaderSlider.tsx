// Pfad: components/HeaderSlider.tsx
'use client';

import Image from 'next/image';
import * as React from 'react';
import { assets } from '../assets/assets';

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type Slide = {
  id: number;
  title: string;
  offer: string;
  buttonText1: string;
  buttonText2: string;
  imgSrc: any; // StaticImageData bei Next-Imports
};

const sliderData: Slide[] = [
  {
    id: 1,
    title: 'Experience Pure Sound - Your Perfect Headphones Awaits!',
    offer: 'Limited Time Offer 30% Off',
    buttonText1: 'Buy now',
    buttonText2: 'Find more',
    imgSrc: assets.header_headphone_image,
  },
  {
    id: 2,
    title: 'Next-Level Gaming Starts Here - Discover PlayStation 5 Today!',
    offer: 'Hurry up only few lefts!',
    buttonText1: 'Shop Now',
    buttonText2: 'Explore Deals',
    imgSrc: assets.header_playstation_image,
  },
  {
    id: 3,
    title: 'Power Meets Elegance - Apple MacBook Pro is Here for you!',
    offer: 'Exclusive Deal 40% Off',
    buttonText1: 'Order Now',
    buttonText2: 'Learn More',
    imgSrc: assets.header_macbook_image,
  },
];

export default function HeaderSlider(): JSX.Element {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => window.clearInterval(interval);
  }, []);

  const handleSlideChange = (index: number) => setCurrentSlide(index);

  return (
    <Box width="100%" position="relative" overflow="hidden">
      {/* Track */}
      <Box
        display="flex"
        sx={{
          transition: 'transform 700ms ease-in-out',
          transform: `translateX(-${currentSlide * 100}%)`,
          width: `${sliderData.length * 100}%`,
        }}
      >
        {sliderData.map((slide, index) => (
          <Box
            key={slide.id}
            sx={{
              minWidth: '100%',
              display: 'flex',
              flexDirection: { xs: 'column-reverse', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              bgcolor: '#E6E9F2',
              py: { xs: 4, md: 2 },
              px: { xs: 2.5, md: 7 },
              mt: 1.5,
              borderRadius: 2,
            }}
          >
            {/* Textbereich */}
            <Box sx={{ pl: { md: 4 }, mt: { xs: 2.5, md: 0 }, maxWidth: 640 }}>
              <Typography variant="body1" sx={{ color: '#ea580c', pb: 0.5 }}>
                {slide.offer}
              </Typography>

              <Typography
                variant="h3"
                fontWeight={600}
                sx={{
                  typography: { xs: 'h5', md: 'h3' },
                  lineHeight: { md: 1.2 },
                  maxWidth: 520,
                }}
              >
                {slide.title}
              </Typography>

              <Stack direction="row" spacing={2} mt={{ xs: 2, md: 3 }}>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#ea580c',
                    '&:hover': { bgcolor: '#c2410c' },
                    px: { xs: 3.5, md: 5 },
                    py: { xs: 1, md: 1.25 },
                    borderRadius: 999,
                    fontWeight: 600,
                  }}
                >
                  {slide.buttonText1}
                </Button>

                <Button
                  variant="text"
                  sx={{ fontWeight: 600, textTransform: 'none' }}
                  endIcon={
                    <Image
                      src={assets.arrow_icon}
                      alt="arrow_icon"
                      width={16}
                      height={16}
                      style={{ display: 'block' }}
                    />
                  }
                >
                  {slide.buttonText2}
                </Button>
              </Stack>
            </Box>

            {/* Bildbereich */}
            <Box
              display="flex"
              flex={1}
              alignItems="center"
              justifyContent="center"
            >
              <Image
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
                style={{
                  width: '100%',
                  maxWidth: 288, // ~ md:w-72
                  height: 'auto',
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>

      {/* Dots */}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
        mt={3}
      >
        {sliderData.map((_, index) => {
          const active = currentSlide === index;
          return (
            <IconButton
              key={index}
              size="small"
              onClick={() => handleSlideChange(index)}
              sx={{ p: 0.5 }}
              aria-label={`Go to slide ${index + 1}`}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: active ? '#ea580c' : 'rgba(0,0,0,0.2)',
                }}
              />
            </IconButton>
          );
        })}
      </Stack>
    </Box>
  );
}
