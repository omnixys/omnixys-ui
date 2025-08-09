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
    id: string
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
  const defaultMax = 1000;

  const limit =
    account.monthlyLimit && account.monthlyLimit > 0
      ? account.monthlyLimit
      : defaultMax;

  const limitLabel =
    account.monthlyLimit && account.monthlyLimit > 0
      ? limit.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      : 'No limit set';

  const progress = Math.min((spent / limit) * 100, 100);
  const gradient =
    account.gradient ?? 'linear-gradient(135deg, #2c3e50 60%, #e0c3fc)';

  // Luminanzbasierte Erkennung von Dunkel/Hell
  const isDarkCard = useMemo(() => {
    const rgbMatch = gradient.match(/#([0-9a-f]{6})/gi);
    if (!rgbMatch) return false;
    const hex = rgbMatch[0].replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  }, [gradient]);

  const textColor = isDarkCard ? '#fff' : '#1a1a1a';
  const progressColor =
    progress > 80 ? '#ff7961' : isDarkCard ? '#90caf9' : '#1565c0';

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(
      JSON.stringify(
        {
          name: account.name,
          expiry: account.expiry,
          number: account.number,
          csv: account.csv,
        },
        null,
        2,
      ),
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Link href={`/finanzen/banks/${account.id}`} style={{ textDecoration: 'none' }}>
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
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
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

        {/* Inhalt */}
        <Box sx={{ position: 'relative', zIndex: 1, flex: 1 }}>
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
          <Box sx={{ mt: 'auto' }}>
            {/* Benutzername + Expiry */}
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

            {/* Kartennummer + Copy */}
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
    </Link>
  );
};

export default BankCard;
