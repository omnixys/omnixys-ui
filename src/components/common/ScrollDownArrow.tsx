'use client';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

interface ScrollDownArrowProps {
  targetId?: string;
  color?: string; // z. B. "white", "primary.main", "secondary.light"
  size?: number;
  onClick?: () => void;
}

export default function ScrollDownArrow({
  targetId,
  color = 'white',
  size = 48,
  onClick,
}: ScrollDownArrowProps) {
  const theme = useTheme<Theme>();

  const resolveColor = (key: string): string => {
    if (key.includes('.')) {
      return (
        (key.split('.').reduce((acc: unknown, k: string) => {
          if (typeof acc === 'object' && acc !== null && k in acc) {
            return (acc as Record<string, unknown>)[k];
          }
          return undefined;
        }, theme.palette) as string | undefined) ?? key
      );
    }

    const solidColor = (
      theme.palette[key as keyof typeof theme.palette] as {
        main?: string;
      }
    )?.main;

    const commonColor =
      theme.palette.common?.[key as keyof typeof theme.palette.common];

    return solidColor ?? commonColor ?? key;
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (targetId) {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      style={{ textAlign: 'center', marginTop: 4 }}
    >
      <IconButton onClick={handleClick} aria-label="Scroll down">
        <KeyboardArrowDownIcon
          sx={{ fontSize: size, color: resolveColor(color) }}
        />
      </IconButton>
    </motion.div>
  );
}
