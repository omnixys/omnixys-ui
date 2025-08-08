'use client';

import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export interface SidebarProps {
  user: { name: string };
}

const sidebarLinks = [
  { label: 'Home', route: '/', imgUrl: '/icons/home.svg' },
  { label: 'My Banks', route: '/banks', imgUrl: '/icons/banks.svg' },
  {
    label: 'Transaction History',
    route: '/transactions',
    imgUrl: '/icons/history.svg',
  },
  {
    label: 'Transfer Funds',
    route: '/transfer',
    imgUrl: '/icons/transfer.svg',
  },
];

export default function ResponsiveSidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);

  const drawerContent = (
    <Box sx={{ width: 240, p: 2, height: '100%' }}>
      {/* Logo */}
      <Box mb={4}>
        <Link href="/">
          <Image src="/logo.svg" width={40} height={40} alt="Logo" />
        </Link>
      </Box>

      {/* Nav */}
      <Stack spacing={2}>
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link href={item.route} key={item.label}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 1,
                  borderRadius: 2,
                  bgcolor: isActive ? '#e3f2fd' : 'transparent',
                  color: isActive ? '#1976d2' : '#333',
                  '&:hover': { bgcolor: '#e0e0e0' },
                }}
              >
                <Image
                  src={item.imgUrl}
                  width={24}
                  height={24}
                  alt={item.label}
                />
                <Typography variant="body2">{item.label}</Typography>
              </Box>
            </Link>
          );
        })}
      </Stack>

      <Box mt="auto" pt={2}>
        <Typography variant="caption" color="text.secondary">
          Eingeloggt als {user.name}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* AppBar only on mobile */}
      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Finanzen
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Drawer */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? open : true}
        onClose={() => setOpen(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Content offset on mobile */}
      {isMobile && <Toolbar />}
    </>
  );
}
