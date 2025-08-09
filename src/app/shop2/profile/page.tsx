// src/app/profile/page.tsx (MUI, wix-frei)
import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format } from 'timeago.js';
import UpdateButton from '../components/UpdateButton';
import { sampleOrders } from '../data/sampleOrders'; // Dummy-Bestellungen
import { getUser } from '../lib/db'; // Mock-DB (wix-frei)
import { updateUser } from '../lib/updateUser'; // die wix-freie Server Action aus meiner vorherigen Antwort

export default async function ProfilePage() {
  // TODO: echte Auth integrieren (z. B. aus Cookies/Session)
  const currentUserId = 'u_1';
  const user = getUser(currentUserId);

  if (!user) return notFound();

  const orders = sampleOrders.filter(
    (o) => o.buyerEmail && o.buyerEmail === user.email,
  );

  return (
    <Container
      maxWidth="lg"
      sx={{ minHeight: 'calc(100vh - 180px)', py: { xs: 3, md: 6 } }}
    >
      <Grid container spacing={6} alignItems="flex-start">
        {/* LEFT: Profile */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight={600}>
            Profile
          </Typography>

          <Paper elevation={1} sx={{ mt: 3, p: 3 }}>
            <Box component="form" action={updateUser}>
              <input type="hidden" name="id" defaultValue={user.id} />

              <Stack spacing={2.5}>
                <TextField
                  label="Username"
                  name="username"
                  placeholder={user.username || 'john'}
                  defaultValue=""
                  size="small"
                />
                <TextField
                  label="First Name"
                  name="firstName"
                  placeholder={user.firstName || 'John'}
                  defaultValue=""
                  size="small"
                />
                <TextField
                  label="Surname"
                  name="lastName"
                  placeholder={user.lastName || 'Doe'}
                  defaultValue=""
                  size="small"
                />
                <TextField
                  label="Phone"
                  name="phone"
                  placeholder={user.phone || '+1234567'}
                  defaultValue=""
                  size="small"
                />
                <TextField
                  type="email"
                  label="E-mail"
                  name="email"
                  placeholder={user.email || 'john@gmail.com'}
                  defaultValue=""
                  size="small"
                />

                <UpdateButton />
              </Stack>
            </Box>
          </Paper>
        </Grid>

        {/* RIGHT: Orders */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight={600}>
            Orders
          </Typography>

          <Paper elevation={1} sx={{ mt: 3 }}>
            <Stack divider={<Divider />} sx={{ p: 1 }}>
              {orders.length === 0 ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ p: 2 }}
                >
                  Keine Bestellungen vorhanden.
                </Typography>
              ) : (
                orders.map((order, idx) => (
                  <Box
                    key={order._id}
                    component={Link}
                    href={`/shop2/orders/${order._id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{
                        py: 2,
                        px: 2,
                        borderRadius: 1,
                        ...(idx % 2 === 1 && { bgcolor: 'grey.50' }), // even row styling
                        '&:hover': {
                          bgcolor: 'success.lighter',
                          transition: 'background-color .15s',
                        },
                      }}
                    >
                      <Typography sx={{ width: '25%' }}>
                        {order._id.substring(0, 10)}…
                      </Typography>
                      <Typography sx={{ width: '25%' }}>
                        € {Number(order.subtotal ?? 0).toFixed(2)}
                      </Typography>
                      <Typography sx={{ width: '25%' }} color="text.secondary">
                        {order.createdAt ? format(order.createdAt) : '-'}
                      </Typography>
                      <Typography sx={{ width: '25%' }}>
                        {order.status}
                      </Typography>
                    </Stack>
                  </Box>
                ))
              )}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
