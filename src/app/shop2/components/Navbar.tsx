// src/components/Navbar.tsx (MUI-Version)
'use client';

import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import Menu from './Menu';
import SearchBar from './SearchBar';

const NavIcons = dynamic(() => import('./NavIcons'), { ssr: false });

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        height: 80,
        justifyContent: 'center',
      }}
    >
      <Toolbar sx={{ height: '100%', px: { xs: 2, md: 4, lg: 8, xl: 12 } }}>
        {/* MOBILE: Logo + Menu */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Link
            href="/"
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <Typography variant="h5" sx={{ letterSpacing: 1 }}>
              LAMA
            </Typography>
          </Link>
          <Menu />
        </Box>

        {/* DESKTOP */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            width: '100%',
          }}
        >
          {/* LEFT */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
            sx={{ width: { md: '33%', xl: '50%' } }}
          >
            <Link
              href="/"
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <Image src="/logo.png" alt="Logo" width={24} height={24} />
              <Typography variant="h5" sx={{ letterSpacing: 1 }}>
                LAMA
              </Typography>
            </Link>

            <Stack
              direction="row"
              spacing={2}
              sx={{ display: { xs: 'none', xl: 'flex' } }}
            >
              <Link href="/shop2">Homepage</Link>
              <Link href="/shop2">Shop</Link>
              <Link href="/shop2">Deals</Link>
              <Link href="/shop2">About</Link>
              <Link href="/shop2">Contact</Link>
            </Stack>
          </Stack>

          {/* RIGHT */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{
              width: { md: '67%', xl: '50%' },
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ flex: 1 }}>
              <SearchBar />
            </Box>
            <NavIcons />
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
