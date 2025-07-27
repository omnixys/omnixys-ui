'use client';

import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  AppBar,
  Badge,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

const drawerWidth = 220;

const navItems = [
  { text: 'Auktionen', href: '/dashboard/auctions' },
  { text: 'Warenkorb', href: '/dashboard/cart' },
  { text: 'Profil', href: '/dashboard/profile' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const notifications = 3; // Dummy

  return (
    <Box sx={{ display: 'flex' }}>
      {/* HEADER */}
      <AppBar
        position="fixed"
        sx={{ zIndex: 1201, backgroundColor: '#6A4BBC' }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setOpen(!open)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Omnixys Auction Dashboard</Typography>
          </Box>
          <Box>
            <IconButton color="inherit">
              <Badge badgeContent={notifications} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, top: 64 },
        }}
      >
        <Toolbar />
        <List>
          {navItems.map((item) => (
            <ListItem button key={item.text} component={Link} href={item.href}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* CONTENT */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
