// src/components/Menu.tsx
'use client';

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

export default function Menu() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (value: boolean) => () => {
    setOpen(value);
  };

  const menuItems = [
    { label: 'Homepage', href: '/' },
    { label: 'Shop', href: '/' },
    { label: 'Deals', href: '/' },
    { label: 'About', href: '/' },
    { label: 'Contact', href: '/' },
    { label: 'Logout', href: '/' },
    { label: 'Cart (1)', href: '/' },
  ];

  return (
    <>
      {/* Menu Icon */}
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon fontSize="large" />
      </IconButton>

      {/* Drawer Overlay */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            bgcolor: 'black',
            color: 'white',
            width: '100%',
            maxWidth: 360,
          },
        }}
      >
        {/* Close Button */}
        <Box display="flex" justifyContent="flex-end" p={2}>
          <IconButton onClick={toggleDrawer(false)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Menu Items */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.label}
              component={Link}
              href={item.href}
              onClick={toggleDrawer(false)}
              sx={{
                textAlign: 'center',
                '&:hover': { bgcolor: 'grey.800' },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
