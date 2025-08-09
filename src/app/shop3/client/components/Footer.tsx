'use client';

import { Box, Grid, Link as MUILink, Typography } from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';

const Footer = () => {
  return (
    <Box
      sx={{
        mt: 8,
        bgcolor: 'grey.900',
        p: 4,
        borderRadius: 2,
      }}
    >
      <Grid
        container
        spacing={4}
        alignItems="flex-start"
        justifyContent="space-between"
      >
        {/* Logo & Info */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 1,
          }}
        >
          <MUILink
            component={NextLink}
            href="/shop3"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              gap: 1,
            }}
          >
            <Image
              src="/shop3/logo.png"
              alt="TrendLama"
              width={36}
              height={36}
            />
            <Typography
              variant="subtitle1"
              fontWeight={500}
              letterSpacing={1.2}
              sx={{
                color: 'common.white',
                display: { xs: 'none', md: 'block' },
              }}
            >
              TRENDLAMA.
            </Typography>
          </MUILink>
          <Typography variant="body2" color="grey.500">
            © 2025 Trendlama.
          </Typography>
          <Typography variant="body2" color="grey.500">
            All rights reserved.
          </Typography>
        </Grid>

        {/* Column 1 */}
        <Grid
          item
          xs={12}
          sm={4}
          md={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ color: 'amber.50' }}>
            Links
          </Typography>
          <MUILink
            component={NextLink}
            href="/shop3"
            color="grey.400"
            underline="hover"
          >
            Homepage
          </MUILink>
          <MUILink
            component={NextLink}
            href="/shop3"
            color="grey.400"
            underline="hover"
          >
            Contact
          </MUILink>
          <MUILink
            component={NextLink}
            href="/shop3"
            color="grey.400"
            underline="hover"
          >
            Terms of Service
          </MUILink>
          <MUILink
            component={NextLink}
            href="/shop3"
            color="grey.400"
            underline="hover"
          >
            Privacy Policy
          </MUILink>
        </Grid>

        {/* Column 2 */}
        <Grid
          item
          xs={12}
          sm={4}
          md={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ color: 'amber.50' }}>
            Links
          </Typography>
          <MUILink
            component={NextLink}
            href="/shop3"
            color="grey.400"
            underline="hover"
          >
            All Products
          </MUILink>
          <MUILink
            component={NextLink}
            href="/shop3"
            color="grey.400"
            underline="hover"
          >
            New Arrivals
          </MUILink>
          <MUILink
            component={NextLink}
            href="/shop3"
            color="grey.400"
            underline="hover"
          >
            Best Sellers
          </MUILink>
          <MUILink
            component={NextLink}
            href="/shop3"
            color="grey.400"
            underline="hover"
          >
            Sale
          </MUILink>
        </Grid>

        {/* Column 3 */}
        <Grid
          item
          xs={12}
          sm={4}
          md={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ color: 'amber.50' }}>
            Links
          </Typography>
          <MUILink
            component={NextLink}
            href="/shop3"
            color="grey.400"
            underline="hover"
          >
            About
          </MUILink>
          <MUILink
            component={NextLink}
            href="/shop3"
            color="grey.400"
            underline="hover"
          >
            Contact
          </MUILink>
          <MUILink
            component={NextLink}
            href="/shop3"
            color="grey.400"
            underline="hover"
          >
            Blog
          </MUILink>
          <MUILink
            component={NextLink}
            href="/shop3"
            color="grey.400"
            underline="hover"
          >
            Affiliate Program
          </MUILink>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
