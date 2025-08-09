// src/app/order/[id]/page.tsx (MUI-Version, ohne Wix)
import {
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Optional: auslagern nach "@/data/sampleOrders"
type Order = {
  _id: string;
  buyerEmail?: string;
  receiverFirstName?: string;
  receiverLastName?: string;
  subtotal?: number;
  paymentStatus?: 'PAID' | 'UNPAID' | 'REFUNDED' | string;
  status?: 'FULFILLED' | 'PENDING' | 'CANCELED' | string;
  addressLine1?: string;
  city?: string;
};

const sampleOrders: Order[] = [
  {
    _id: 'ord_12345',
    buyerEmail: 'jane@example.com',
    receiverFirstName: 'Jane',
    receiverLastName: 'Doe',
    subtotal: 129.9,
    paymentStatus: 'PAID',
    status: 'FULFILLED',
    addressLine1: '3252 Winding Way',
    city: 'Willowbrook',
  },
  {
    _id: 'ord_98765',
    buyerEmail: 'tom@example.com',
    receiverFirstName: 'Tom',
    receiverLastName: 'Muster',
    subtotal: 59.0,
    paymentStatus: 'UNPAID',
    status: 'PENDING',
    addressLine1: 'Main Street 12',
    city: 'Berlin',
  },
];

export default function OrderPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const order = sampleOrders.find((o) => o._id === id);
  if (!order) return notFound();

  const paymentColor =
    order.paymentStatus === 'PAID'
      ? 'success'
      : order.paymentStatus === 'UNPAID'
        ? 'warning'
        : 'default';

  const statusColor =
    order.status === 'FULFILLED'
      ? 'success'
      : order.status === 'PENDING'
        ? 'warning'
        : order.status === 'CANCELED'
          ? 'error'
          : 'default';

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: 'calc(100vh - 180px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack spacing={2} alignItems="center" sx={{ width: '100%' }}>
        <Paper
          elevation={6}
          sx={{ px: { xs: 3, md: 8 }, py: { xs: 4, md: 6 }, width: '100%' }}
        >
          <Typography variant="h5" fontWeight={600}>
            Order Details
          </Typography>

          <Stack spacing={2} sx={{ mt: 3 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography fontWeight={600}>Order Id:</Typography>
              <Typography>{order._id}</Typography>
            </Stack>

            <Divider />

            <Stack direction="row" justifyContent="space-between">
              <Typography fontWeight={600}>Receiver Name:</Typography>
              <Typography>
                {order.receiverFirstName} {order.receiverLastName}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography fontWeight={600}>Receiver Email:</Typography>
              <Typography>{order.buyerEmail}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography fontWeight={600}>Price:</Typography>
              <Typography>
                €
                {Number(order.subtotal ?? 0).toLocaleString('de-DE', {
                  minimumFractionDigits: 2,
                })}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontWeight={600}>Payment Status:</Typography>
              <Chip label={order.paymentStatus} color={paymentColor as any} />
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontWeight={600}>Order Status:</Typography>
              <Chip label={order.status} color={statusColor as any} />
            </Stack>

            <Divider />

            <Stack direction="row" justifyContent="space-between">
              <Typography fontWeight={600}>Delivery Address:</Typography>
              <Typography textAlign="right">
                {order.addressLine1} {order.city}
              </Typography>
            </Stack>
          </Stack>
        </Paper>

        <Button component={Link} href="/" variant="text">
          Have a problem? Contact us
        </Button>
      </Stack>
    </Container>
  );
}
