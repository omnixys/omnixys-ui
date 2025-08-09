'use client';

import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const normalizePath = (path: string) => path.replace(/\/+$/, '').toLowerCase();

export interface SidebarProps {
  user: { username: string };
}

const sidebarLinks = [
  {
    label: 'Home',
    route: '/finanzen',
    imgUrl: '/icons/home.svg',
  },
  {
    label: 'My Banks',
    route: '/finanzen/banks',
    imgUrl: '/icons/dollar-circle.svg',
  },
  {
    label: 'Transaction History',
    route: '/finanzen/transactions',
    imgUrl: '/icons/transaction.svg',
  },
  {
    label: 'Transfer Funds',
    route: '/finanzen/transfer',
    imgUrl: '/icons/money-send.svg',
  },
];

export default function Sidebar({ user }: SidebarProps) {
  const pathname = normalizePath(usePathname());

  return (
    <Box
      sx={{
        width: 240,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 2,
        bgcolor: '#f5f5f5',
        borderRight: '1px solid #ddd',
      }}
    >
      {/* Logo */}
      <Box>
        <Link href="/">
          <Image
            src="/omnixys-symbol.png"
            width={100}
            height={100}
            alt="Logo"
          />
        </Link>
      </Box>

      {/* Links */}
      <Stack spacing={2}>
        {sidebarLinks.map((item) => {
            const route = normalizePath(item.route);
            let isActive = false;

            if (route === '/finanzen') {
              // Home unter Finanzen → nur exakter Match
              isActive = pathname === route;
            } else {
              // Unterseiten → alles was mit dem Pfad beginnt
              isActive = pathname === route || pathname.startsWith(`${route}/`);
            }

          return (
            <Link href={item.route} key={item.label} passHref>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 1,
                  borderRadius: 2,
                  bgcolor: isActive ? '#e3f2fd' : 'transparent',
                  color: isActive ? '#1976d2' : '#333',
                  textDecoration: 'none',
                  '&:hover': {
                    bgcolor: '#e0e0e0',
                  },
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

      {/* Footer */}
      <Box>
        <Typography variant="caption" color="text.secondary">
          Eingeloggt als {user.username}
        </Typography>
      </Box>
    </Box>
  );
}
