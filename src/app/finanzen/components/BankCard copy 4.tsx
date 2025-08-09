'use client';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Box,
  IconButton,
  LinearProgress,
  Tooltip,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export interface BankCardProps {
  account: {
    name: string;
    balance: number;
    number: string;
    expiry: string;
    csv: string;
    brandLogoUrl?: string;
    chipLogoUrl?: string;
    monthlyLimit?: number;
    spentThisMonth?: number;
    gradient?: string;
  };
  username: string;
  showBalance: boolean;
  showBar?: boolean;
}

const BankCard = ({
  account,
  username,
  showBalance,
  showBar = false,
}: BankCardProps) => {
  const [copied, setCopied] = useState(false);

  const spent = account.spentThisMonth ?? 0;

  const defaultMax = 1000; // Standard wenn kein Limit gesetzt

  let limit = account.monthlyLimit;
  let limitLabel = '';
  let progress = 0;

  if (!limit || limit <= 0) {
    limit = defaultMax;
    limitLabel = 'No limit set';
  } else {
    limitLabel = limit.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }

  progress = Math.min((spent / limit) * 100, 100);

  // Default gradient
  const gradient =
    account.gradient ?? 'linear-gradient(135deg, #2c3e50 60%, #e0c3fc)';

  // **Auto-Detect** if background is dark or light
  const isDarkCard = useMemo(() => {
    // primitive detection: check for dark hex codes
    const darkColors = [
      '#0',
      '#1',
      '#2',
      '#3',
      '#4',
      'rgb(0',
      'rgb(1',
      'rgb(2)',
    ];
    return darkColors.some((c) => gradient.toLowerCase().includes(c));
  }, [gradient]);

  const textColor = isDarkCard ? 'white' : '#1a1a1a';
  const progressColor =
    progress > 80 ? '#ff7961' : isDarkCard ? '#90caf9' : '#1565c0';

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const dataToCopy = {
      name: account.name,
      expiry: account.expiry,
      number: account.number,
      csv: account.csv,
    };

    navigator.clipboard.writeText(JSON.stringify(dataToCopy, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Link href="/" style={{ textDecoration: 'none' }}>
      <Box
        sx={{
          width: 320,
          height: showBar ? 230 : 200,
          borderRadius: 4,
          overflow: 'hidden',
          background: gradient,
          color: textColor,
          position: 'relative',
          boxShadow: 6,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 3,
          transition: 'height 0.3s ease',
        }}
      >
        {/* Hintergrundlinien */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            opacity: 0.15,
          }}
        >
          <Image
            src="/icons/Lines.svg"
            alt="lines"
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              width: 320,
              height: showBar ? 230 : 200,
              borderRadius: 4,
              overflow: 'hidden',
              background: gradient,
              color: textColor,
              position: 'relative',
              boxShadow: 6,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              p: 3,
              transition: 'height 0.3s ease',
            }}
          >
            {/* Header */}
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ color: textColor }}
            >
              {account.name}
            </Typography>

            {/* Logos */}
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
                  alt="brand"
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
                <Typography variant="body2" sx={{ color: textColor }}>
                  {username.toUpperCase()}
                </Typography>
                <Typography variant="body2" sx={{ color: textColor }}>
                  {account.expiry}
                </Typography>
              </Box>

              {/* Number + Copy */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="h6"
                  fontFamily="monospace"
                  letterSpacing={2}
                  sx={{ color: textColor }}
                >
                  {account.number.replace(/\d{4}(?=.)/g, '$& ')}
                </Typography>
                <Tooltip title={copied ? 'Copied!' : 'Copy card data'} arrow>
                  <IconButton
                    size="small"
                    onClick={handleCopy}
                    sx={{
                      color: textColor,
                      p: 0.5,
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                    }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Balance */}
              {showBalance && (
                <Typography
                  variant="body2"
                  sx={{ mt: 1, opacity: 0.8, color: textColor }}
                >
                  Balance:{' '}
                  {account.balance.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </Typography>
              )}

              {/* Progress bar */}
              {showBar && (
                <Box sx={{ mt: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      mb: 0.5,
                      opacity: 0.85,
                      color: textColor,
                    }}
                  >
                    Spent this month:{' '}
                    {spent.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}{' '}
                    / {limitLabel}
                  </Typography>

                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 6,
                      borderRadius: 5,
                      backgroundColor: isDarkCard
                        ? 'rgba(255,255,255,0.2)'
                        : 'rgba(0,0,0,0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: progressColor,
                      },
                    }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default BankCard;
