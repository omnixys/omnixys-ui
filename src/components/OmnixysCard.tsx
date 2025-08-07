// OmnixysCard.tsx
'use client';

import { Paper, PaperProps } from '@mui/material';

export default function OmnixysCard({ children, sx, ...rest }: PaperProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: '#F8F8FC',
        boxShadow: '0 4px 20px rgba(106, 75, 188, 0.1)',
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Paper>
  );
}
