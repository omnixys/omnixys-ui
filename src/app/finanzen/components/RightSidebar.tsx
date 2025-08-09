'use client';

import AddIcon from '@mui/icons-material/Add';
import {
  Avatar,
  Box,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { JSX } from 'react';
import BankCard from './BankCard';

export interface RightSidebarProps {
  user: {
    lastName: string;
    firstName: string;
    email: string;
    username: string;
  };
  banks: {
    id: number;
    name: string;
    balance: number;
    number: string;
    maskedNumber: string;
    expiry: string;
    brandLogoUrl?: string; // e.g., '/visa.svg'
    chipLogoUrl?: string; // e.g., '/contactless.svg'
  }[];
  categories: {
    name: string;
    icon: JSX.Element;
    value: number;
    color: string;
  }[];
}

export default function RightSidebar({
  user,
  banks,
  categories,
}: RightSidebarProps) {
  return (
    <Box
      sx={{
        width: 400,
        p: 2,

        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        bgcolor: '#f9f9f9',
      }}
    >
      {/* UserCard */}
      <Box
        sx={{
          position: 'relative',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Hintergrund */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            opacity: 0.15,
            pointerEvents: 'none',
          }}
        >
          <Image
            src="/icons/gradient-mesh.svg"
            alt="background"
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>

        {/* Inhalt */}
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center'
        }}>
          <Avatar
            sx={{ width: 64, height: 64, margin: '0 auto', bgcolor: '#8ab4f8' }}
          >
            {user.firstName[0]}
          </Avatar>
          <Typography variant="h6">{user.firstName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </Box>
      </Box>

      {/* My Banks */}
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1,
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            My Banks
          </Typography>

          <IconButton
            size="small"
            color="primary"
            sx={{
              border: '1px solid #2196f3',
              borderRadius: 1,
              p: 0.5,
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ position: 'relative', height: 160, mb: 15 }}>
          {banks.map((bank, index) => (
            <Box
              key={bank.id}
              sx={{
                position: 'absolute',
                top: index * 55, // Vertikale Versetzung
                left: index * 50, // Horizontale Versetzung
                zIndex: banks.length - index,
              }}
            >
              <BankCard
                account={bank}
                username={user.username}
                showBalance={false}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Top Categories */}
      <Box>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Top Categories
        </Typography>

        <Stack spacing={2}>
          {categories.map((cat, index) => (
            <Box key={index} sx={{ bgcolor: '#fff', p: 2, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ bgcolor: cat.color, width: 28, height: 28 }}>
                  {cat.icon}
                </Avatar>
                <Typography variant="body2">{cat.name}</Typography>
                <Typography variant="caption" sx={{ marginLeft: 'auto' }}>
                  ${cat.value}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={cat.value}
                sx={{
                  mt: 1,
                  height: 6,
                  borderRadius: 5,
                  backgroundColor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: cat.color,
                  },
                }}
              />
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
