'use client';

import { Box, LinearProgress, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export interface BankCardProps {
  account: {
    name: string;
    balance: number;
    number: string;
    expiry: string;
    brandLogoUrl?: string; // e.g., '/visa.svg'
    chipLogoUrl?: string; // e.g., '/contactless.svg'
    monthlyLimit?: number; // 👈 neu
    spentThisMonth?: number; // 👈 neu
  };
  username: string;
  showBalance: boolean;
  showBar?: boolean; // 👈 neu
}

const BankCard = ({
  account,
  username,
  showBalance,
  showBar = false,
}: BankCardProps) => {
  const limit = account.monthlyLimit ?? 0;
  const spent = account.spentThisMonth ?? 0;
  const progress = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;

  return (
    <Link href="/" style={{ textDecoration: 'none' }}>
      <Box
        sx={{
          width: 320,
          height: 200,
          borderRadius: 4,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #2c3e50 60%, #e0c3fc)',
          color: 'white',
          position: 'relative',
          boxShadow: 6,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 3,
        }}
      >
        {/* Header */}
        <Typography variant="subtitle1" fontWeight="bold">
          {account.name}
        </Typography>

        {/* Chip + Contactless */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            display: 'flex',
            gap: 1,
          }}
        >
          {account.chipLogoUrl && (
            <Image
              src={account.chipLogoUrl}
              alt="chip"
              width={20}
              height={20}
            />
          )}
          {account.brandLogoUrl && (
            <Image
              src={account.brandLogoUrl}
              alt="visa"
              width={40}
              height={20}
            />
          )}
        </Box>

        {/* Footer */}
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <Typography variant="body2">{username.toUpperCase()}</Typography>
            <Typography variant="body2">{account.expiry}</Typography>
          </Box>

          <Typography variant="h6" fontFamily="monospace" letterSpacing={2}>
            {account.number.replace(/\d{4}(?=.)/g, '$& ')}
          </Typography>

          {showBalance && (
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
              Balance:{' '}
              {account.balance.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </Typography>
          )}

          {/* Fortschrittsbalken nur wenn showBar = true */}
          {showBar && (
            <Box sx={{ mt: 1 }}>
              <Typography
                variant="caption"
                sx={{ display: 'block', mb: 0.5, opacity: 0.85 }}
              >
                Spent this month:{' '}
                {spent.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}{' '}
                /{' '}
                {limit.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 6,
                  borderRadius: 5,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: progress > 80 ? '#ff7961' : '#90caf9',
                  },
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Link>
  );
};

export default BankCard;
