'use client';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface DashboardCardGridProps {
  children: ReactNode;
}

export default function DashboardCardGrid({ children }: DashboardCardGridProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isSmallScreen ? 'row' : 'row',
        flexWrap: isSmallScreen ? 'nowrap' : 'wrap',
        gap: 2,
        overflowX: isSmallScreen ? 'auto' : 'visible',
        paddingBottom: isSmallScreen ? 1 : 0,
        '&::-webkit-scrollbar': { display: 'none' }, // scrollbar verstecken

        // scrollSnapType: isSmallScreen ? 'x mandatory' : 'none',
        // '& > *': {
        //   scrollSnapAlign: isSmallScreen ? 'start' : 'unset',
        //   flex: isSmallScreen ? '0 0 85%' : '1 1 30%',
        // },

      }}
    >
      {children}
    </Box>
  );
}
