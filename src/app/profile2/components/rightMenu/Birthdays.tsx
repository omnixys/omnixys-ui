// components/Birthdays.tsx
'use client';

import Image from 'next/image';
import NextLink from 'next/link';
import {
  Card,
  CardContent,
  Stack,
  Avatar,
  Typography,
  Button,
  Box,
  Link as MUILink,
  Paper,
} from '@mui/material';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';

export default function Birthdays() {
  return (
    <Card elevation={2}>
      <CardContent>
        <Stack spacing={2}>
          {/* TOP */}
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
              Birthdays
            </Typography>
          </Stack>

          {/* USER */}
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                sx={{ width: 40, height: 40 }}
                src="https://images.pexels.com/photos/18207381/pexels-photo-18207381/free-photo-of-window-in-bar.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                alt="Wayne Burton"
              />
              <Typography variant="subtitle2" fontWeight={600}>
                Wayne Burton
              </Typography>
            </Stack>
            <Button variant="contained" size="small">
              Celebrate
            </Button>
          </Stack>

          {/* UPCOMING */}
          <Paper
            variant="outlined"
            sx={{
              bgcolor: 'action.hover',
              borderRadius: 2,
              px: 2,
              py: 1.5,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <CardGiftcardOutlinedIcon />
              <Stack spacing={0.25}>
                <Typography variant="body2" fontWeight={600}>
                  Upcoming Birthdays
                </Typography>
                <MUILink
                  component={NextLink}
                  href="/"
                  variant="caption"
                  color="text.secondary"
                  underline="hover"
                >
                  See other 16 have upcoming birthdays
                </MUILink>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </CardContent>
    </Card>
  );
}
