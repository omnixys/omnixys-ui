'use client';

import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

const categories = [
  { title: 'Flüge', icon: '✈️' },
  { title: 'Bus & Taxi', icon: '🚌' },
  { title: 'Mietwagen', icon: '🚗' },
  { title: 'Hotels & OmnixysBnB', icon: '🏨' },
  { title: 'Aktivitäten', icon: '🎢' },
];

export default function CategoryGrid() {
  return (
    <Box sx={{ py: 6 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        Kategorien
      </Typography>
      <Grid container spacing={3}>
        {categories.map((cat, i) => (
          <Grid item xs={6} sm={4} md={2.4} key={i}>
            <Card sx={{ textAlign: 'center', py: 3, cursor: 'pointer' }}>
              <CardContent>
                <Typography sx={{ fontSize: '2rem' }}>{cat.icon}</Typography>
                <Typography variant="h6">{cat.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
