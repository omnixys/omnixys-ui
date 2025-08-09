'use client';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Button, LinearProgress, Stack, Typography } from '@mui/material';
import { FC } from 'react';

interface Bank {
  id: number;
  name: string;
  balance: number;
  number: string;
  maskedNumber: string;
  expiry: string;
  brandLogoUrl?: string;
  chipLogoUrl?: string;
  monthlyLimit?: number;
  spentThisMonth?: number;
  cvc?: string;
}

interface BankCardProps {
  account: Bank;
  username: string;
  showBalance?: boolean;
  showBar?: boolean; // 👈 neues Prop
}

const BankCard: FC<BankCardProps> = ({
  account,
  username,
  showBalance = true,
  showBar = false,
}) => {
  const limit = account.monthlyLimit ?? 0;
  const spent = account.spentThisMonth ?? 0;
  const progress = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;

  const handleCopyCardData = () => {
    const data = `
      Name: ${username}
      Kartennummer: ${account.number}
      Ablaufdatum: ${account.expiry}
      CVC: ${account.cvc ?? '---'}
    `.trim();

    navigator.clipboard
      .writeText(data)
      .then(() => alert('Kartendaten in die Zwischenablage kopiert!'))
      .catch(() => alert('Fehler beim Kopieren der Daten'));
  };

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 3,
        bgcolor: '#fff',
        boxShadow: 3,
        position: 'relative',
      }}
    >
      {/* Kartenkopf */}
      <Typography variant="h6" fontWeight="bold">
        {account.name}
      </Typography>
      {showBalance && (
        <Typography variant="body1" fontWeight="medium" sx={{ mt: 1 }}>
          {account.balance.toLocaleString('de-DE', {
            style: 'currency',
            currency: 'EUR',
          })}
        </Typography>
      )}

      {/* Hier könnte dein Kartenlayout sein (Logo, Chip, etc.) */}

      {/* Progress-Bar + Button nur wenn showBar true */}
      {showBar && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Monatlich ausgegeben:{' '}
            {spent.toLocaleString('de-DE', {
              style: 'currency',
              currency: 'EUR',
            })}{' '}
            /{' '}
            {limit.toLocaleString('de-DE', {
              style: 'currency',
              currency: 'EUR',
            })}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 5,
              mt: 1,
              backgroundColor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                background: progress > 80 ? '#f44336' : '#1976d2',
              },
            }}
          />

          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 1 }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<ContentCopyIcon />}
              onClick={handleCopyCardData}
            >
              Daten kopieren
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default BankCard;
