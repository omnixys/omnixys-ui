'use client';

import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Kino', path: '/entertainment/cinema' },
    { label: 'Streaming', path: '/entertainment/streaming' },
  ];

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="sticky" sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => router.push('/')}
          >
            Omnixys Entertainment
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                sx={{ color: '#fff', fontWeight: 'bold' }}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          {/* Mobile Menu */}
          <IconButton
            color="inherit"
            sx={{ display: { md: 'none' } }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {navItems.map((item) => (
              <ListItem
                key={item.label}
                button
                onClick={() => {
                  router.push(item.path);
                  toggleDrawer();
                }}
              >
                {item.label}
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Content */}
      <Box sx={{ flexGrow: 1 }}>{children}</Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'secondary.main', color: '#fff', py: 3, mt: 'auto' }}>
        <Container sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            © 2025 Omnixys – The Fabric of Modular Innovation
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Button
              sx={{ color: '#fff' }}
              onClick={() => router.push('/impressum')}
            >
              Impressum
            </Button>
            <Button
              sx={{ color: '#fff' }}
              onClick={() => router.push('/datenschutz')}
            >
              Datenschutz
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
