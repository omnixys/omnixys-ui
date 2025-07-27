'use client';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function Page() {
  const theme = useTheme();

  const products = [
    {
      id: 1,
      name: 'Omnixys Hoodie',
      price: 59.99,
      image: '/images/hoodie.png',
    },
    { id: 2, name: 'Omnixys Mug', price: 14.99, image: '/images/mug.png' },
    {
      id: 3,
      name: 'Omnixys T-Shirt',
      price: 24.99,
      image: '/images/tshirt.png',
    },
  ];

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          bgcolor: theme.palette.primary.main,
          color: theme.palette.common.white,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Omnixys E-Shop
        </Typography>
        <Box>
          <Button color="inherit" sx={{ mr: 2 }}>
            Produkte
          </Button>
          <Button color="inherit" sx={{ mr: 2 }}>
            Login
          </Button>
          <Button
            color="inherit"
            startIcon={<ShoppingCartIcon />}
            sx={{
              bgcolor: theme.palette.secondary.main,
              '&:hover': { bgcolor: theme.palette.secondary.dark },
            }}
          >
            Warenkorb
          </Button>
        </Box>
      </Box>

      {/* Hero Section */}
      <Container sx={{ textAlign: 'center', py: 6 }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: 'bold', color: theme.palette.primary.main, mb: 2 }}
        >
          Willkommen im Omnixys-Shop!
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Entdecke hochwertige Produkte im exklusiven Omnixys-Design.
        </Typography>
        <Button variant="contained" size="large" color="primary">
          Jetzt entdecken
        </Button>
      </Container>

      {/* Produktliste */}
      <Container sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{ height: 200 }}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 'bold',
                      color: theme.palette.primary.main,
                    }}
                  >
                    € {product.price.toFixed(2)}
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    startIcon={<ShoppingCartIcon />}
                  >
                    In den Warenkorb
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          color: theme.palette.common.white,
          textAlign: 'center',
          p: 2,
          mt: 4,
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Omnixys – The Fabric of Modular
          Innovation
        </Typography>
      </Box>
    </Box>
  );
}
