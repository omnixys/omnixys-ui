'use client';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  InputBase,
  Toolbar,
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
    { id: 4, name: 'Omnixys Cap', price: 19.99, image: '/images/cap.png' },
    {
      id: 5,
      name: 'Omnixys Mousepad',
      price: 12.99,
      image: '/images/mousepad.png',
    },
  ];

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
      {/* Sticky Header */}
      <AppBar position="sticky" sx={{ bgcolor: theme.palette.primary.main }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo + Menü */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Omnixys E-Shop
            </Typography>
          </Box>

          {/* Suche */}
          <Box
            sx={{
              flexGrow: 1,
              mx: 2,
              bgcolor: theme.palette.common.white,
              display: 'flex',
              alignItems: 'center',
              borderRadius: 1,
              px: 2,
            }}
          >
            <InputBase
              placeholder="Produkte suchen..."
              sx={{ flex: 1, fontSize: '0.9rem' }}
            />
            <IconButton color="primary">
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Warenkorb */}
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: theme.palette.secondary.main,
          color: theme.palette.common.white,
          textAlign: 'center',
          py: 6,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Willkommen bei Omnixys Shopping
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Entdecke unsere neuesten Angebote – alles im Omnixys-Stil!
        </Typography>
        <Button variant="contained" size="large" color="primary">
          Jetzt einkaufen
        </Button>
      </Box>

      {/* Kategorien-Navigation */}
      <Container
        sx={{
          py: 2,
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        {['Elektronik', 'Fashion', 'Home', 'Gaming', 'Office'].map((cat, i) => (
          <Button
            key={i}
            sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}
          >
            {cat}
          </Button>
        ))}
      </Container>

      {/* Produkt-Slider / Grid */}
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
          Top-Produkte
        </Typography>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{ height: 180 }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {product.name}
                  </Typography>
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

      {/* Angebots-Banner */}
      <Box
        sx={{
          mt: 6,
          bgcolor: theme.palette.primary.light,
          color: theme.palette.common.white,
          textAlign: 'center',
          py: 4,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Omnixys Prime Deals: Spare bis zu 30%
        </Typography>
        <Button variant="contained" color="secondary">
          Angebote ansehen
        </Button>
      </Box>

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
