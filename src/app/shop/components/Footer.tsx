// Pfad: components/Footer.tsx

'use client';

import Image from 'next/image';
import * as React from 'react';
import { assets } from '../assets/assets';

// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Footer(): React.JSX.Element {
  return (
    <Box component="footer" bgcolor="background.paper" color="text.secondary">
      {/* Oberer Bereich */}
      <Box
        px={{ xs: 3, md: 6, lg: 8 }}
        py={7}
        borderBottom={1}
        borderColor="divider"
      >
        <Grid container spacing={5} justifyContent="center">
          {/* Logo + Beschreibung */}
          <Grid item xs={12} md={4}>
            <Box maxWidth="80%">
              <Image
                src={assets.logo}
                alt="logo"
                style={{ width: '128px', height: 'auto' }}
              />
              <Typography variant="body2" mt={2}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book.
              </Typography>
            </Box>
          </Grid>

          {/* Company Links */}
          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            justifyContent={{ xs: 'flex-start', md: 'center' }}
          >
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={500}
                color="text.primary"
                mb={2}
              >
                Company
              </Typography>
              <Stack spacing={1}>
                <Link
                  href="#"
                  underline="hover"
                  variant="body2"
                  color="text.secondary"
                >
                  Home
                </Link>
                <Link
                  href="#"
                  underline="hover"
                  variant="body2"
                  color="text.secondary"
                >
                  About us
                </Link>
                <Link
                  href="#"
                  underline="hover"
                  variant="body2"
                  color="text.secondary"
                >
                  Contact us
                </Link>
                <Link
                  href="#"
                  underline="hover"
                  variant="body2"
                  color="text.secondary"
                >
                  Privacy policy
                </Link>
              </Stack>
            </Box>
          </Grid>

          {/* Kontaktinfos */}
          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            justifyContent={{ xs: 'flex-start', md: 'center' }}
          >
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={500}
                color="text.primary"
                mb={2}
              >
                Get in touch
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">+1-234-567-890</Typography>
                <Typography variant="body2">contact@greatstack.dev</Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Unterer Bereich */}
      <Box py={2}>
        <Typography
          variant="caption"
          display="block"
          textAlign="center"
          sx={{ typography: { xs: 'caption', md: 'body2' } }}
        >
          Copyright © 2025 GreatStack.dev — All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
}
