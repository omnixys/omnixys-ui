'use client';

import {
  AppBar,
  Box,
  IconButton,
  Link as MUILink,
  Toolbar,
  Typography,
} from '@mui/material';
import { Bell, Home } from 'lucide-react';
import Image from 'next/image';
import NextLink from 'next/link';
import SearchBar from './SearchBar';
import ShoppingCartIcon from './ShoppingCartIcon';

const Navbar = () => {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.grey[300]}`,
        pb: 1,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* LEFT */}
        <Box
          component={NextLink}
          href="/shop3"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <Image
            src="/shop3/logo.png"
            alt="TrendLama"
            width={36}
            height={36}
            style={{ width: 36, height: 36 }}
          />
          <Typography
            variant="subtitle1"
            sx={{
              ml: 1,
              fontWeight: 500,
              letterSpacing: 1.2,
              display: { xs: 'none', md: 'block' },
            }}
          >
            TRENDLAMA.
          </Typography>
        </Box>

        {/* RIGHT */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <SearchBar />

          <IconButton
            component={NextLink}
            href="/shop3"
            size="small"
            sx={{ color: 'grey.700' }}
          >
            <Home size={18} />
          </IconButton>

          <IconButton size="small" sx={{ color: 'grey.700' }}>
            <Bell size={18} />
          </IconButton>

          <ShoppingCartIcon />

          <MUILink
            component={NextLink}
            href="/login"
            underline="none"
            sx={{
              fontSize: '0.875rem',
              color: 'primary.main',
              fontWeight: 500,
            }}
          >
            Sign in
          </MUILink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
