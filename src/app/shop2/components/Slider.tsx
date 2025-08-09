// src/components/Slider.tsx (MUI-Version, ohne Tailwind)

'use client';

import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

type Slide = {
  id: number;
  title: string;
  description: string;
  img: string;
  url: string;
  bg: string; // CSS linear-gradient(...)
};

const slides: Slide[] = [
  {
    id: 1,
    title: 'Summer Sale Collections',
    description: 'Sale! Up to 50% off!',
    img: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1200',
    url: '/shop2',
    bg: 'linear-gradient(90deg, #fef9c3 0%, #ffe4e6 100%)',
  },
  {
    id: 2,
    title: 'Winter Sale Collections',
    description: 'Sale! Up to 50% off!',
    img: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=1200',
    url: '/shop2',
    bg: 'linear-gradient(90deg, #ffe4e6 0%, #dbeafe 100%)',
  },
  {
    id: 3,
    title: 'Spring Sale Collections',
    description: 'Sale! Up to 50% off!',
    img: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1200',
    url: '/shop2',
    bg: 'linear-gradient(90deg, #dbeafe 0%, #fef9c3 100%)',
  },
];

export default function Slider() {
  const [current, setCurrent] = React.useState(0);

  // Auto-Play (optional)
  // React.useEffect(() => {
  //   const id = setInterval(() => {
  //     setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1));
  //   }, 3000);
  //   return () => clearInterval(id);
  // }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        height: 'calc(100vh - 80px)',
        overflow: 'hidden',
      }}
    >
      {/* Track */}
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          width: `${slides.length * 100}vw`,
          transform: `translateX(-${current * 100}vw)`,
          transition: 'transform 1s ease-in-out',
        }}
      >
        {slides.map((slide) => (
          <Box
            key={slide.id}
            sx={{
              width: '100vw',
              height: '100%',
              display: 'flex',
              flexDirection: { xs: 'column', xl: 'row' },
              gap: { xs: 4, xl: 8 },
              background: slide.bg,
            }}
          >
            {/* TEXT */}
            <Stack
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              spacing={{ xs: 2, xl: 3 }}
              sx={{
                flex: { xs: '0 0 50%', xl: '0 0 50%' },
                height: { xs: '50%', xl: '100%' },
                px: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontSize: { xs: 18, lg: 24, '2xl': 40 } }}
              >
                {slide.description}
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: 40, lg: 56, '2xl': 96 },
                  lineHeight: 1.1,
                }}
              >
                {slide.title}
              </Typography>
              <Link href={slide.url}>
                <Button variant="contained" size="large">
                  SHOP NOW
                </Button>
              </Link>
            </Stack>

            {/* IMAGE */}
            <Box
              sx={{
                position: 'relative',
                flex: { xs: '0 0 50%', xl: '0 0 50%' },
                height: { xs: '50%', xl: '100%' },
              }}
            >
              <Image
                src={slide.img}
                alt={slide.title}
                fill
                sizes="100vw"
                style={{ objectFit: 'cover' }}
                priority={slide.id === 1}
              />
            </Box>
          </Box>
        ))}
      </Box>

      {/* Dots */}
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: 24,
        }}
      >
        {slides.map((s, idx) => {
          const active = idx === current;
          return (
            <IconButton
              key={s.id}
              onClick={() => setCurrent(idx)}
              disableRipple
              sx={{
                width: 12,
                height: 12,
                p: 0,
                borderRadius: '50%',
                border: '1px solid',
                borderColor: 'grey.700',
                transform: active ? 'scale(1.4)' : 'scale(1)',
                transition: 'transform .2s ease',
              }}
            >
              {active && (
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: 'grey.700',
                  }}
                />
              )}
            </IconButton>
          );
        })}
      </Stack>
    </Box>
  );
}
