// src/components/Footer.tsx
'use client';

import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ py: 6, px: { xs: 2, md: 6, lg: 12 }, bgcolor: 'grey.100', mt: 8 }}
    >
      {/* TOP */}
      <Grid container spacing={6}>
        {/* LEFT */}
        <Grid item xs={12} md={6} lg={3}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Typography variant="h5" fontWeight="bold">
              OMNIXIS
            </Typography>
          </Link>
          <Typography variant="body2" mt={2}>
            3252 Winding Way, Central Plaza, Willowbrook, CA 90210, United
            States
          </Typography>
          <Typography fontWeight="bold" variant="body2">
            hello@omnixis.dev
          </Typography>
          <Typography fontWeight="bold" variant="body2">
            +1 234 567 890
          </Typography>
          <Stack direction="row" spacing={2} mt={2}>
            {[
              'facebook.png',
              'instagram.png',
              'youtube.png',
              'pinterest.png',
              'x.png',
            ].map((icon) => (
              <Image
                key={icon}
                src={`/${icon}`}
                alt=""
                width={16}
                height={16}
              />
            ))}
          </Stack>
        </Grid>

        {/* CENTER */}
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: { xs: 'none', lg: 'flex' },
            justifyContent: 'space-between',
          }}
        >
          {[
            {
              title: 'COMPANY',
              links: [
                'About Us',
                'Careers',
                'Affiliates',
                'Blog',
                'Contact Us',
              ],
            },
            {
              title: 'SHOP',
              links: [
                'New Arrivals',
                'Accessories',
                'Men',
                'Women',
                'All Products',
              ],
            },
            {
              title: 'HELP',
              links: [
                'Customer Service',
                'My Account',
                'Find a Store',
                'Legal & Privacy',
                'Gift Card',
              ],
            },
          ].map((section) => (
            <Box key={section.title}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                {section.title}
              </Typography>
              <Stack spacing={1}>
                {section.links.map((link) => (
                  <Link key={link} href="/" style={{ textDecoration: 'none' }}>
                    <Typography variant="body2" color="text.primary">
                      {link}
                    </Typography>
                  </Link>
                ))}
              </Stack>
            </Box>
          ))}
        </Grid>

        {/* RIGHT */}
        <Grid item xs={12} md={6} lg={3}>
          <Typography variant="subtitle1" fontWeight="medium">
            SUBSCRIBE
          </Typography>
          <Typography variant="body2" mt={1}>
            Be the first to get the latest news about trends, promotions, and
            much more!
          </Typography>
          <Stack direction="row" mt={2} spacing={1}>
            <TextField size="small" placeholder="Email address" fullWidth />
            <Button variant="contained" sx={{ flexShrink: 0 }}>
              JOIN
            </Button>
          </Stack>
          <Typography fontWeight="bold" variant="body2" mt={2}>
            Secure Payments
          </Typography>
          <Stack direction="row" spacing={2} mt={1}>
            {[
              'discover.png',
              'skrill.png',
              'paypal.png',
              'mastercard.png',
              'visa.png',
            ].map((icon) => (
              <Image
                key={icon}
                src={`/${icon}`}
                alt=""
                width={40}
                height={20}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>

      {/* BOTTOM */}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        mt={6}
        spacing={2}
      >
        <Grid item>
          <Typography variant="body2">© 2024 Omnixis Shop</Typography>
        </Grid>
        <Grid item>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <Typography variant="body2">
              <span style={{ color: '#6b7280' }}>Language</span> United States |
              English
            </Typography>
            <Typography variant="body2">
              <span style={{ color: '#6b7280' }}>Currency</span> $ USD
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
