// Pfad: app/seller/orders/page.tsx
'use client';

import Image from 'next/image';
import * as React from 'react';
import { assets, orderDummyData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Footer from '../../components/seller/Footer';
import { useAppContext } from '../../context/AppContext';

// MUI
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type OrderItem = {
  product: { name: string };
  quantity: number;
};

type Address = {
  fullName: string;
  area: string;
  city: string;
  state: string;
  phoneNumber: string;
};

type Order = {
  items: OrderItem[];
  address: Address;
  amount: number;
  date: string | number | Date;
  method?: string;
  payment?: string;
};

export default function Orders(): JSX.Element {
  const { currency } = useAppContext();

  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchSellerOrders = React.useCallback(async () => {
    setOrders(orderDummyData as Order[]);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    void fetchSellerOrders();
  }, [fetchSellerOrders]);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {loading ? (
        <Loading />
      ) : (
        <Container maxWidth="lg" sx={{ flex: 1, py: 3 }}>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Orders
          </Typography>

          <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            {orders.map((order, index) => {
              const itemsLabel = order.items
                .map((it) => `${it.product.name} x ${it.quantity}`)
                .join(', ');
              const isLast = index === orders.length - 1;

              return (
                <Box key={index}>
                  <Grid
                    container
                    spacing={2}
                    alignItems="stretch"
                    sx={{
                      p: { xs: 2, md: 3 },
                      borderTop: 1,
                      borderColor: 'divider',
                    }}
                  >
                    {/* Produkte */}
                    <Grid item xs={12} md={4}>
                      <Stack direction="row" spacing={2}>
                        <Box
                          sx={{
                            width: 64,
                            height: 64,
                            borderRadius: 2,
                            overflow: 'hidden',
                            bgcolor: 'action.hover',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <Image
                            src={assets.box_icon}
                            alt="box_icon"
                            style={{
                              width: '100%',
                              height: 'auto',
                              objectFit: 'cover',
                            }}
                          />
                        </Box>
                        <Box maxWidth={320}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {itemsLabel}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Items: {order.items.length}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>

                    {/* Adresse */}
                    <Grid item xs={12} md={3.5}>
                      <Typography variant="body2">
                        <Box component="span" fontWeight={600}>
                          {order.address.fullName}
                        </Box>
                        <br />
                        {order.address.area}
                        <br />
                        {order.address.city}, {order.address.state}
                        <br />
                        {order.address.phoneNumber}
                      </Typography>
                    </Grid>

                    {/* Betrag */}
                    <Grid
                      item
                      xs={12}
                      md={1.5}
                      display="flex"
                      alignItems="center"
                    >
                      <Typography variant="subtitle1" fontWeight={600}>
                        {currency}
                        {order.amount}
                      </Typography>
                    </Grid>

                    {/* Meta */}
                    <Grid item xs={12} md={3}>
                      <Stack spacing={0.5}>
                        <Typography variant="body2">
                          Method: {order.method ?? 'COD'}
                        </Typography>
                        <Typography variant="body2">
                          Date: {new Date(order.date).toLocaleDateString()}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="body2">Payment:</Typography>
                          <Chip
                            size="small"
                            label={order.payment ?? 'Pending'}
                            color="warning"
                            variant="outlined"
                          />
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>

                  {!isLast && <Divider />}
                </Box>
              );
            })}
          </Paper>
        </Container>
      )}

      <Footer />
    </Box>
  );
}
