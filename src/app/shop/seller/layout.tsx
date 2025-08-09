// 📄 Pfad: components/seller/Layout.tsx
'use client';

import Box from '@mui/material/Box';
import * as React from 'react';
import Navbar from '../components/seller/Navbar';
import Sidebar from '../components/seller/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Obere Navbar */}
      <Navbar />

      {/* Hauptbereich mit Sidebar + Content */}
      <Box sx={{ display: 'flex', flex: 1, width: '100%' }}>
        <Sidebar />

        {/* Inhalt */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            bgcolor: 'background.default',
            minHeight: '100%',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
