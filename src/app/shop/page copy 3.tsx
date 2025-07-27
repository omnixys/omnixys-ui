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

  const sections = [
    {
      title: 'Top-Angebote',
      products: [
        { name: 'Omnixys Hoodie', img: '/images/hoodie.png' },
        { name: 'Omnixys Mug', img: '/images/mug.png' },
      ],
    },
    {
      title: 'Elektronik-Bestseller',
      products: [
        { name: 'Tablet', img: '/images/tablet.png' },
        { name: 'Laptop', img: '/images/laptop.png' },
      ],
    },
  ];

  return (
    <Box sx={{ bgcolor: theme.palette.background.default }}>
      {/* Header */}
      <AppBar position="sticky" sx={{ bgcolor: theme.palette.primary.main }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo & Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Omnixys E-Shop
            </Typography>
          </Box>

          {/* Search */}
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              mx: 2,
              bgcolor: 'white',
              borderRadius: 1,
              px: 2,
              alignItems: 'center',
            }}
          >
            <InputBase placeholder="Produkte suchen..." sx={{ flex: 1 }} />
            <IconButton>
              <SearchIcon color="primary" />
            </IconButton>
          </Box>

          {/* Cart */}
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Kategorie-Leiste */}
      <Box
        sx={{ bgcolor: theme.palette.secondary.main, color: 'white', py: 1 }}
      >
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}
        >
          {['Elektronik', 'Fashion', 'Gaming', 'Haushalt', 'Bücher'].map(
            (cat) => (
              <Button key={cat} sx={{ color: 'white' }}>
                {cat}
              </Button>
            ),
          )}
        </Container>
      </Box>

      {/* Hero Banner */}
      <Box
        sx={{
          height: 300,
          backgroundImage: "url('/images/hero-banner.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Produkt-Sektionen */}
      <Container sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {sections.map((section, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {section.title}
                </Typography>
                <Grid container spacing={2}>
                  {section.products.map((p, i) => (
                    <Grid item xs={6} key={i}>
                      <Card>
                        <CardMedia
                          component="img"
                          image={p.img}
                          alt={p.name}
                          sx={{ height: 120 }}
                        />
                        <CardContent>
                          <Typography variant="body2">{p.name}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Button sx={{ mt: 2 }}>Mehr entdecken</Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          color: 'white',
          textAlign: 'center',
          py: 4,
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
