// src/components/Footer.tsx
'use client';
import { Box, Divider, IconButton, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { assets } from '../../assets/assets';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        px: { xs: 2, md: 6 },
        py: 3,
        display: 'flex',
        flexDirection: { xs: 'column-reverse', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      {/* Logo & Copyright */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ mt: { xs: 2, md: 0 } }}
      >
        <Image
          src={assets.logo}
          alt="logo"
          style={{ display: 'block', maxHeight: 28, width: 'auto' }}
        />
        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: 'none', md: 'block' } }}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          © 2025 greatstack.dev. All rights reserved.
        </Typography>
      </Stack>

      {/* Social Icons */}
      <Stack direction="row" spacing={1}>
        <IconButton href="#" size="small">
          <Image src={assets.facebook_icon} alt="Facebook" />
        </IconButton>
        <IconButton href="#" size="small">
          <Image src={assets.twitter_icon} alt="Twitter" />
        </IconButton>
        <IconButton href="#" size="small">
          <Image src={assets.instagram_icon} alt="Instagram" />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Footer;
