// Pfad: app/my-orders/page.tsx
'use client';

import Image from 'next/image';
import * as React from 'react';
import { assets, orderDummyData } from '../assets/assets';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import { useAppContext } from '../context/AppContext';

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
  method?: string; // optional, z. B. "COD"
  payment?: string; // optional, z. B. "Pending"
};

export default function MyOrders(): JSX.Element {
  const { currency } = useAppContext();
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchOrders = React.useCallback(async () => {
    setOrders(orderDummyData as Order[]);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    void fetchOrders();
  }, [fetchOrders]);

  return (
    <>
      <Navbar />

      <Container maxWidth="lg">
        <Box py={3} minHeight="70vh">
          <Typography variant="h6" fontWeight={600} mt={2} mb={2}>
            My Orders
          </Typography>

          {loading ? (
            <Loading />
          ) : (
            <Paper
              elevation={0}
              sx={{ border: 1, borderColor: 'divider', maxWidth: 960 }}
            >
              <Divider />
              {orders.map((order, index) => {
                const itemsLabel = order.items
                  .map((it) => `${it.product.name} x ${it.quantity}`)
                  .join(', ');

                return (
                  <Box key={index}>
                    <Grid
                      container
                      spacing={2}
                      alignItems="stretch"
                      sx={{ p: 2.5 }}
                    >
                      {/* Produkt-Block */}
                      <Grid item xs={12} md={4}>
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="flex-start"
                        >
                          <Box
                            sx={{
                              width: 64,
                              height: 64,
                              borderRadius: 2,
                              overflow: 'hidden',
                              flexShrink: 0,
                              bgcolor: 'action.hover',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
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
                          <Box>
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

                      {/* Metadaten */}
                      <Grid item xs={12} md={3}>
                        <Stack spacing={0.5}>
                          <Typography variant="body2">
                            Method: {order.method ?? 'COD'}
                          </Typography>
                          <Typography variant="body2">
                            Date: {new Date(order.date).toLocaleDateString()}
                          </Typography>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
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

                    {/* Divider zwischen Orders, aber nicht nach dem letzten */}
                    {index < orders.length - 1 && <Divider />}
                  </Box>
                );
              })}
            </Paper>
          )}
        </Box>
      </Container>

      <Footer />
    </>
  );
}
