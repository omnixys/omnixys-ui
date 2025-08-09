// Pfad: components/Banner.tsx

'use client';

import Image from 'next/image';
import * as React from 'react';
import { assets } from '../assets/assets';

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Banner(): React.JSX.Element {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      alignItems="center"
      justifyContent="space-between"
      bgcolor="#E6E9F2"
      py={{ xs: 7, md: 0 }}
      pl={{ md: 5 }}
      my={8}
      borderRadius={3}
      overflow="hidden"
    >
      {/* Linkes Bild */}
      <Box sx={{ maxWidth: 224, flexShrink: 0 }}>
        <Image
          src={assets.jbl_soundbox_image}
          alt="jbl_soundbox_image"
          style={{ width: '100%', height: 'auto' }}
        />
      </Box>

      {/* Text + Button */}
      <Stack
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        spacing={2}
        px={{ xs: 2, md: 0 }}
      >
        <Typography variant="h5" fontWeight={600} maxWidth={290}>
          Level Up Your Gaming Experience
        </Typography>
        <Typography
          variant="body1"
          fontWeight={500}
          color="text.secondary"
          maxWidth={343}
        >
          From immersive sound to precise controls—everything you need to win
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: 'orange.main',
            px: 6,
            py: 1.25,
            color: 'white',
            display: 'flex',
            gap: 1,
            '&:hover': { bgcolor: 'orange.dark' },
          }}
          endIcon={
            <Image
              src={assets.arrow_icon_white}
              alt="arrow_icon_white"
              style={{ width: 16, height: 16 }}
            />
          }
        >
          Buy now
        </Button>
      </Stack>

      {/* Rechtes Bild (Desktop) */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          maxWidth: 320,
          flexShrink: 0,
        }}
      >
        <Image
          src={assets.md_controller_image}
          alt="md_controller_image"
          style={{ width: '100%', height: 'auto' }}
        />
      </Box>

      {/* Rechtes Bild (Mobile) */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Image
          src={assets.sm_controller_image}
          alt="sm_controller_image"
          style={{ width: '100%', height: 'auto' }}
        />
      </Box>
    </Box>
  );
}
