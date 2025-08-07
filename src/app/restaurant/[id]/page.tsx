'use client';
import {
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from '@mui/material';
import { useParams } from 'next/navigation';

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
export default function RestaurantPage() {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) return <p>Restaurant nicht gefunden</p>;

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {restaurant.name}
      </Typography>
      {restaurant.dishes.map((dish) => (
        <Card key={dish.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{dish.name}</Typography>
            <Typography>{dish.price.toFixed(2)} €</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Zutaten: {dish.ingredients.join(', ')}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Anleitung: {dish.instructions}
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2, mr: 2 }}
              onClick={
                () => alert(`"${dish.name}" zum Warenkorb hinzugefügt!`)
                // () =>
                // addItem({
                //   id: dish.id + '-cook',
                //   name: `${dish.name} (Kochbox)`,
                //   price: dish.priceCook,
                //   quantity: 1,
                //   option: 'cook',
                // })
              }
            >
              Kochbox hinzufügen
            </Button>

            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={
                () => alert(`"${dish.name}" zum Warenkorb hinzugefügt!`)
                // addItem({
                //   id: dish.id + '-ready',
                //   name: `${dish.name} (Fertiggericht)`,
                //   price: dish.priceReady,
                //   quantity: 1,
                //   option: 'ready',
                // })
              }
            >
              Fertiggericht hinzufügen
            </Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
