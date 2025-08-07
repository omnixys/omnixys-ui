'use client';

import ListAltIcon from '@mui/icons-material/ListAlt';
import {
  Avatar,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import type { SxProps } from '@mui/material/styles';

export interface TasksProgressProps {
  value: number;
  sx?: SxProps;
}

export function TasksProgressCard({ value, sx }: TasksProgressProps) {
  const theme = useTheme();
  return (
    <Card sx={{ width: '100%', maxWidth: 340, height: 180, ...sx }}>
      <CardContent>
        <Stack spacing={3} justifyContent="center">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Task Progress
              </Typography>
              <Typography variant="h4">{value}%</Typography>
            </Stack>
            <Avatar
              sx={{
                bgcolor: theme.palette.warning.main,
                width: 56,
                height: 56,
              }}
            >
              <ListAltIcon />
            </Avatar>
          </Stack>
          <LinearProgress value={value} variant="determinate" />
        </Stack>
      </CardContent>
    </Card>
  );
}
