"use client";

import React, { useContext, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Button,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CartUpdateContext } from "../context/CartUpdateContext";

export type CartItem = {
  id: string;
  price: number;
  productName: string;
  productImage: string;
  restaurant?: { name?: string };
};

interface CartProps {
  cart: CartItem[];
  onRemove: (id: string) => Promise<void> | void;
  onCheckout?: (total: number) => void;
}

export default function Cart({ cart, onRemove, onCheckout }: CartProps) {
  const ctx = useContext(CartUpdateContext);
  if (!ctx) throw new Error("CartUpdateContext Provider is missing.");
  const { updateCart, setUpdateCart } = ctx;

  const [snackOpen, setSnackOpen] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const total = useMemo(
    () => (cart ?? []).reduce((acc, it) => acc + (Number(it.price) || 0), 0),
    [cart]
  );
  const totalLabel = total.toFixed(2);
  const restaurantName = cart?.[0]?.restaurant?.name ?? "Your Restaurant";

  const handleRemove = async (id: string) => {
    try {
      await onRemove(id);
      setUpdateCart(!updateCart);
      setSnackOpen({ open: true, message: "Item removed!", severity: "success" });
    } catch {
      setSnackOpen({ open: true, message: "Could not remove item.", severity: "error" });
    }
  };

  const handleCheckout = () => {
    onCheckout?.(total);
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight={700}>
        {restaurantName}
      </Typography>

      <Stack spacing={2} sx={{ mt: 3 }}>
        <Typography variant="subtitle1" fontWeight={700}>
          My Order
        </Typography>

        <Stack spacing={1.5}>
          {(cart ?? []).map((item) => (
            <Stack
              key={item.id}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ minWidth: 0 }}>
                <Box sx={{ position: "relative", width: 40, height: 40, borderRadius: 1, overflow: "hidden" }}>
                  <Image
                    src={item.productImage || "/placeholder.jpg"}
                    alt={item.productName}
                    fill
                    sizes="40px"
                    style={{ objectFit: "cover" }}
                  />
                </Box>
                <Typography variant="body2" noWrap title={item.productName}>
                  {item.productName}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="subtitle2" fontWeight={700}>
                  ${Number(item.price).toFixed(2)}
                </Typography>
                <IconButton size="small" aria-label="Remove item" onClick={() => handleRemove(item.id)}>
                  <CloseIcon fontSize="small" color="error" />
                </IconButton>
              </Stack>
            </Stack>
          ))}
        </Stack>

        <Divider />

        {total > 0 && (
          <Button
            fullWidth
            variant="contained"
            component={Link}
            href={`/checkout?restaurant=${encodeURIComponent(restaurantName)}`}
            onClick={handleCheckout}
          >
            Checkout ${totalLabel}
          </Button>
        )}
      </Stack>

      <Snackbar
        open={snackOpen.open}
        autoHideDuration={2200}
        onClose={() => setSnackOpen((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackOpen((s) => ({ ...s, open: false }))}
          severity={snackOpen.severity}
          sx={{ width: "100%" }}
        >
          {snackOpen.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
