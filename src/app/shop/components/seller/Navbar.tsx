// Pfad: components/seller/Navbar.tsx
'use client';

import Image from 'next/image';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';

// MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';

export default function SellerNavbar(): JSX.Element {
  const { router } = useAppContext();

  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: 'divider' }}
    >
      <Toolbar
        sx={{
          px: { xs: 2, md: 4 },
          py: 1,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{ cursor: 'pointer', width: { xs: 112, lg: 128 }, flexShrink: 0 }}
          onClick={() => router.push('/shop')}
        >
          <Image
            src={assets.logo}
            alt="QuickCart Seller Logo"
            style={{ width: '100%', height: 'auto' }}
            priority
          />
        </Box>

        <Button
          variant="contained"
          size="small"
          sx={{
            borderRadius: 999,
            bgcolor: 'grey.700',
            '&:hover': { bgcolor: 'grey.800' },
            px: { xs: 3, sm: 4 },
          }}
          onClick={() => {
            /* TODO: logout */
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
