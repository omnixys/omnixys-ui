'use client';
import { useCart } from './context/CartContext';
import { Button, Container, Typography } from '@mui/material';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeItem, updateQuantity, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        🛒 Dein Warenkorb
      </Typography>
      {cart.length === 0 ? (
        <Typography>Dein Warenkorb ist leer</Typography>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} style={{ marginBottom: '1rem' }}>
              <Typography>
                {item.name} – {item.option === 'cook' ? 'Kochbox' : 'Fertiggericht'}
              </Typography>

              <Typography>{item.price.toFixed(2)} €</Typography>
              <input
                type="number"
                value={item.quantity}
                min={1}
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value))
                }
              />
              <Button color="error" onClick={() => removeItem(item.id)}>
                Entfernen
              </Button>
            </div>
          ))}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Gesamt: {total.toFixed(2)} €
          </Typography>
          <Link href="/checkout">
            <Button variant="contained" sx={{ mt: 2 }}>
              Zur Kasse
            </Button>
          </Link>
          <Button onClick={clearCart} sx={{ mt: 2 }}>
            Leeren
          </Button>
        </>
      )}
    </Container>
  );
}
