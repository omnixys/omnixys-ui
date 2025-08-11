"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Stack,
  Divider,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

type CartItem = {
  id: string;
  price: number;
  productName: string;
  productImage: string;
  restaurant?: { name?: string };
};

export default function Checkout() {
  const params = useSearchParams();
  const router = useRouter();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [deliveryAmount, setDeliveryAmount] = useState<number>(5);
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0.01);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [snack, setSnack] = useState<{ open: boolean; msg: string; sev: "success" | "error" }>(
    { open: false, msg: "", sev: "success" }
  );

  const restaurantName = params.get("restaurant") ?? cart?.[0]?.restaurant?.name ?? "Your Restaurant";

  // Cart aus localStorage laden (ohne Auth/GlobalApi)
  useEffect(() => {
    const key = "cart:guest";
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    if (raw) {
      try {
        setCart(JSON.parse(raw) as CartItem[]);
      } catch {
        setCart([]);
      }
    }
  }, []);

  // Beträge berechnen
  useEffect(() => {
    const subtotal = (cart ?? []).reduce((acc, it) => acc + (Number(it.price) || 0), 0);
    const tax = subtotal * 0.09;
    const tot = subtotal + tax + deliveryAmount;

    setSubTotal(Number(subtotal.toFixed(2)));
    setTaxAmount(Number(tax.toFixed(2)));
    setTotal(Number(tot.toFixed(2)));
  }, [cart, deliveryAmount]);

  const formValid = useMemo(
    () => Boolean(username && email && address && zip),
    [username, email, address, zip]
  );

  // Bestellung simulieren (ohne Backend/GlobalApi)
  const addToOrder = async () => {
    setLoading(true);
    try {
      const order = {
        id: `order_${Date.now()}`,
        restaurantName,
        items: cart,
        amounts: { subTotal, taxAmount, deliveryAmount, total },
        user: { username, email, phone, zip, address },
        createdAt: new Date().toISOString(),
      };

      // in localStorage ablegen
      if (typeof window !== "undefined") {
        window.localStorage.setItem("lastOrder", JSON.stringify(order));
        window.localStorage.setItem("cart:guest", JSON.stringify([]));
      }

      setSnack({ open: true, msg: "Order created successfully!", sev: "success" });
      setCart([]);
      router.replace("/food/confirmation");
    } catch (e) {
      setSnack({ open: true, msg: "Error creating order.", sev: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Checkout
      </Typography>

      <Grid container spacing={3}>
        {/* Billing Details */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: { xs: 2, md: 4 } }}>
            <Typography variant="h5" fontWeight={700}>
              Billing Details
            </Typography>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Zip" value={zip} onChange={(e) => setZip(e.target.value)} />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 0, overflow: "hidden" }}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ p: 2, bgcolor: "grey.100", textAlign: "center" }}>
              Total Cart ({cart?.length})
            </Typography>

            <Stack spacing={1.5} sx={{ p: 2 }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight={700}>Subtotal</Typography>
                <Typography>${subTotal.toFixed(2)}</Typography>
              </Stack>

              <Divider />

              <Stack direction="row" justifyContent="space-between">
                <Typography>Delivery</Typography>
                <Typography>${deliveryAmount.toFixed(2)}</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography>Tax (9%)</Typography>
                <Typography>${taxAmount.toFixed(2)}</Typography>
              </Stack>

              <Divider />

              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight={700}>Total</Typography>
                <Typography fontWeight={700}>${total.toFixed(2)}</Typography>
              </Stack>

              {/* Optional: normale Zahlungstaste für Tests ohne PayPal */}
              <Button
                variant="outlined"
                disabled={!formValid || loading || total <= 5}
                onClick={addToOrder}
              >
                Test Pay (no PayPal)
              </Button>

              {/* PayPal */}
              {total > 5 && (
                <Box sx={{ mt: 1 }}>
                  {/* <PayPalButtons
                    disabled={!formValid || loading}
                    style={{ layout: "horizontal" }}
                    onApprove={async () => {
                      await addToOrder();
                    }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: total.toFixed(2),
                              currency_code: "USD",
                            },
                          },
                        ],
                      });
                    }}
                  /> */}
                </Box>
              )}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={2200}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity={snack.sev}
          sx={{ width: "100%" }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
