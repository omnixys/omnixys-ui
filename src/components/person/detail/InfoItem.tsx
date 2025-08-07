import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface InfoItemProps {
  icon?: ReactNode;
  label: string;
  value: string;
}

export default function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <Box display="flex" alignItems="center">
      {icon && <Box mr={1}>{icon}</Box>}
      <Typography variant="body2">
        <strong>{label}:</strong> {value}
      </Typography>
    </Box>
  );
}
