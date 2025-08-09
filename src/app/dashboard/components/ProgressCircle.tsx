'use client';

import { Box, useTheme } from '@mui/material';
import { tokens } from './tokens';

type ProgressCircleProps = {
  /** Fortschritt von 0 bis 1 (z. B. 0.75 = 75 %) */
  progress?: number | string;
  /** Durchmesser in Pixel */
  size?: number | string;
};

export default function ProgressCircle({
  progress = 0.75,
  size = 40,
}: ProgressCircleProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const numericProgress =
    typeof progress === 'string' ? Number(progress) : progress;
  const numericSize = typeof size === 'string' ? Number(size) : size;

  const angle = numericProgress * 360;

  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
          conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg),
          ${colors.greenAccent[500]}`,
        borderRadius: '50%',
        width: `${numericSize}px`,
        height: `${numericSize}px`,
      }}
    />
  );
}
