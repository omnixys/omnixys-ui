'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';


export default function OffersSection({ offers }: { offers: any[] }) {
  return (
    <Box sx={{ py: 6 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        Beliebte Angebote
      </Typography>
      <Grid container spacing={3}>
        {offers.map((offer, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card>
              <CardMedia
                component="img"
                height="180"
                image={offer.image}
                alt={offer.title}
              />
              <CardContent>
                <Typography variant="h6">{offer.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {offer.location} – ab {offer.price}€
                </Typography>
                <Button variant="outlined" sx={{ mt: 2 }}>
                  Jetzt buchen
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
