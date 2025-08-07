'use client';

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

export default function NavigationBar() {
  return (
    <AppBar position="static" color="default" sx={{ mb: 3 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight="bold">
          OmnixysSocial
        </Typography>
        <Box>
          <Button
            component={Link}
            href="/profile/feed"
            sx={{ textTransform: 'none' }}
          >
            Feed
          </Button>
          <Button
            component={Link}
            href="/profile"
            sx={{ textTransform: 'none' }}
          >
            Mein Profil
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
