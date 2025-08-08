// app/finanzen/layout.tsx

import FastfoodIcon from '@mui/icons-material/Fastfood';
import FlightIcon from '@mui/icons-material/Flight';
import React from 'react';
import RightSidebar from './components/RightSidebar';
import SideBar from './components/Sidebar';

export default function FinanzenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = {
    username: 'admin',
    email: 'admin@ok.de',
    firstName: 'Admin',
    lastName: 'A',
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <SideBar user={user} />

      {/* Page Content */}
      <main style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
        {children}
      </main>

      <RightSidebar
        user={user}
        banks={[
          {
            id: 1,
            name: 'Plaid Checking',
            balance: 110,
            number: `**** **** **** 0000`,
            maskedNumber: '0000',
            expiry: 'string',
          },
          {
            id: 2,
            name: 'Plaid Checking2',
            balance: 110,
            number: `**** **** **** 0000`,
            maskedNumber: '0000',
            expiry: 'string',
          },
        ]}
        categories={[
          {
            name: 'Food and Drink',
            value: 80,
            icon: <FastfoodIcon sx={{ color: '#42a5f5' }} />,
            color: '#42a5f5',
          },
          {
            name: 'Travel',
            value: 60,
            icon: <FlightIcon sx={{ color: '#66bb6a' }} />,
            color: '#66bb6a',
          },
        ]}
      />
    </div>
  );
}
