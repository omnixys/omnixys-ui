'use client';
import { Box, Typography } from '@mui/material';

export interface HeaderBoxProps {
  type: 'title' | 'greeting';
  title: string;
  user?: string;
  subtext: string;
}

export default function HeaderBox({
  type = 'title',
  title,
  user,
  subtext,
}: HeaderBoxProps) {
  return (
    <Box p={4}>
      <Typography variant="h4">
        {title}
        {type === 'greeting' && user && (
          <>
            ,{' '}
            <Typography
              variant="h4"
              component="span"
              sx={{ color: 'primary.main', fontWeight: 'bold' }}
            >
              {user}
            </Typography>
          </>
        )}
      </Typography>
      <Typography variant="subtitle1">{subtext}</Typography>
    </Box>
  );
}
