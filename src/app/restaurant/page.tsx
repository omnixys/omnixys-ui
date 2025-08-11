'use client';
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import Link from 'next/link';

export const restaurants = [
  {
    id: '1',
    name: 'Italiano Express',
    cuisine: 'Italienisch',
    image: '/images/italian.jpg',
    dishes: [
      {
        id: 'd1',
        name: 'Spaghetti Carbonara',
        price: 12.99,
        ingredients: ['Spaghetti', 'Speck', 'Ei', 'Parmesan'],
        instructions:
          'Koche die Spaghetti, brate den Speck, mische mit Ei und Käse.',
      },
      {
        id: 'd2',
        name: 'Penne Arrabbiata',
        price: 10.5,
        ingredients: ['Penne', 'Tomaten', 'Knoblauch', 'Chili'],
        instructions: 'Koche die Penne und bereite die Sauce mit Chili zu.',
      },
    ],
  },
];

export const groceries = [
  { id: 'g1', name: 'Olivenöl', price: 4.99, image: '/images/olive-oil.jpg' },
  { id: 'g2', name: 'Salz', price: 1.29, image: '/images/salt.jpg' },
  { id: 'g3', name: 'Pfeffer', price: 2.49, image: '/images/pepper.jpg' },
];

export default function HomePage() {
  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        🍽️ Restaurants
      </Typography>
      <Grid container spacing={2}>
        {restaurants.map((r) => (
          <Grid item xs={12} sm={6} md={4} key={r.id}>
            <Card>
              <img
                src={r.image}
                alt={r.name}
                style={{ width: '100%', height: 180, objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6">{r.name}</Typography>
                <Typography color="text.secondary">{r.cuisine}</Typography>
                <Link href={`/food/restaurant/${r.id}`}>
                  <Button variant="contained" sx={{ mt: 1 }}>
                    Ansehen
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        🛒 Einzelne Lebensmittel
      </Typography>
      <Grid container spacing={2}>
        {groceries.map((g) => (
          <Grid item xs={6} sm={4} md={3} key={g.id}>
            <Card>
              <img
                src={g.image}
                alt={g.name}
                style={{ width: '100%', height: 120, objectFit: 'cover' }}
              />
              <CardContent>
                <Typography>{g.name}</Typography>
                <Typography>{g.price.toFixed(2)} €</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
