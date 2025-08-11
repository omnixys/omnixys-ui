// components/MobileMenu.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const barStyle = {
    width: 24,
    height: 4,
    bgcolor: 'primary.main',
    borderRadius: 1,
    transition: 'all 0.3s ease-in-out',
    transformOrigin: 'left center',
  };

  return (
    <Box sx={{ display: { md: 'none', xs: 'block' }, position: 'relative' }}>
      {/* Hamburger Button */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          cursor: 'pointer',
        }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Box
          sx={{
            ...barStyle,
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        />
        <Box
          sx={{
            ...barStyle,
            opacity: isOpen ? 0 : 1,
          }}
        />
        <Box
          sx={{
            ...barStyle,
            transform: isOpen ? 'rotate(-45deg)' : 'rotate(0deg)',
          }}
        />
      </Box>

      {/* Menu Overlay */}
      {isOpen && (
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: '96px',
            width: '100%',
            height: 'calc(100vh - 96px)',
            bgcolor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            zIndex: 10,
          }}
        >
          {['Home', 'Friends', 'Groups', 'Stories', 'Login'].map((item) => (
            <Typography
              key={item}
              component={Link}
              href="/"
              sx={{
                fontSize: '1.25rem',
                fontWeight: 500,
                color: 'text.primary',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}
