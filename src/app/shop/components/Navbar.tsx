// Pfad: components/Navbar.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

// MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Navbar(): React.JSX.Element {
  const { isSeller, router } = useAppContext();

  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: 'divider' }}
    >
      <Toolbar
        sx={{
          px: { xs: 2, md: 4, lg: 8 },
          py: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <Box
          sx={{ cursor: 'pointer', width: { xs: 112, md: 128 }, flexShrink: 0 }}
          onClick={() => router.push('/shop')}
        >
          <Image
            src={assets.logo}
            alt="logo"
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>

        {/* Desktop Navigation */}
        <Stack
          direction="row"
          spacing={{ xs: 2, lg: 4 }}
          sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
        >
          <Link href="/shop" passHref>
            <Typography
              variant="body1"
              sx={{ cursor: 'pointer', '&:hover': { color: 'text.primary' } }}
            >
              Home
            </Typography>
          </Link>
          <Link href="/shop/all-products" passHref>
            <Typography
              variant="body1"
              sx={{ cursor: 'pointer', '&:hover': { color: 'text.primary' } }}
            >
              Shop
            </Typography>
          </Link>
          <Link href="/shop" passHref>
            <Typography
              variant="body1"
              sx={{ cursor: 'pointer', '&:hover': { color: 'text.primary' } }}
            >
              About Us
            </Typography>
          </Link>
          <Link href="/shop" passHref>
            <Typography
              variant="body1"
              sx={{ cursor: 'pointer', '&:hover': { color: 'text.primary' } }}
            >
              Contact
            </Typography>
          </Link>

          {isSeller && (
            <Button
              variant="outlined"
              size="small"
              sx={{ borderRadius: 999 }}
              onClick={() => router.push('/seller')}
            >
              Seller Dashboard
            </Button>
          )}
        </Stack>

        {/* Desktop Right Icons */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          <IconButton size="small">
            <Image
              src={assets.search_icon}
              alt="search icon"
              width={16}
              height={16}
            />
          </IconButton>
          <Button
            variant="text"
            startIcon={
              <Image
                src={assets.user_icon}
                alt="user icon"
                width={20}
                height={20}
              />
            }
            sx={{
              textTransform: 'none',
              color: 'text.secondary',
              '&:hover': { color: 'text.primary' },
            }}
          >
            Account
          </Button>
        </Stack>

        {/* Mobile Right */}
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{ display: { xs: 'flex', md: 'none' } }}
        >
          {isSeller && (
            <Button
              variant="outlined"
              size="small"
              sx={{ borderRadius: 999 }}
              onClick={() => router.push('/seller')}
            >
              Seller Dashboard
            </Button>
          )}
          <Button
            variant="text"
            startIcon={
              <Image
                src={assets.user_icon}
                alt="user icon"
                width={20}
                height={20}
              />
            }
            sx={{
              textTransform: 'none',
              color: 'text.secondary',
              '&:hover': { color: 'text.primary' },
            }}
          >
            Account
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
