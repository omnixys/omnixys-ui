"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Box,
  Grid,
  Button,
  Stack,
  Typography,
  Paper,
  IconButton,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import { SquarePlus } from "lucide-react";
import { CartUpdateContext } from "../../context/CartUpdateContext";

type MenuItem = {
  name: string;
  price: number;
  description?: string;
  productImage?: { url?: string };
};

type MenuCategory = {
  category: string;
  menuItem: MenuItem[];
};

export type Restaurant = {
  slug: string;
  name: string;
  menu?: MenuCategory[];
};

interface MenuSectionProps {
  restaurant: Restaurant;
}

export default function MenuSection({ restaurant }: MenuSectionProps) {
  const ctx = useContext(CartUpdateContext);
  if (!ctx) throw new Error("CartUpdateContext Provider is missing.");
  const { updateCart, setUpdateCart } = ctx;

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [snack, setSnack] = useState<{ open: boolean; msg: string; sev: "success" | "error" }>({
    open: false,
    msg: "",
    sev: "success",
  });

  // Kategorien & aktuelle Items
  const categories = useMemo(() => restaurant?.menu ?? [], [restaurant]);
  const current = useMemo(
    () => categories.find((c) => c.category === selectedCategory),
    [categories, selectedCategory]
  );

  useEffect(() => {
    if (categories.length) {
      setSelectedCategory(categories[0].category);
    }
  }, [categories]);

  const addToCartHandler = (item: MenuItem) => {
    try {
      const key = "cart:guest";
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
      const prev = raw ? (JSON.parse(raw) as any[]) : [];

      const cartItem = {
        id: `ci_${Date.now()}`,
        productName: item.name,
        productImage: item.productImage?.url ?? "/placeholder.jpg",
        price: Number(item.price) || 0,
        restaurant: { name: restaurant.name, slug: restaurant.slug },
      };

      const next = [...prev, cartItem];
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(next));
      }

      setUpdateCart(!updateCart);
      setSnack({ open: true, msg: "Added to cart", sev: "success" });
    } catch {
      setSnack({ open: true, msg: "Error adding to cart", sev: "error" });
    }
  };

  return (
    <Grid container spacing={3} sx={{ mt: 1 }}>
      {/* Kategorien (links, ab md sichtbar) */}
      <Grid item xs={12} md={3}>
        <Stack spacing={1.2} sx={{ display: { xs: "none", md: "flex" }, pr: 2 }}>
          {categories.map((c) => (
            <Button
              key={c.category}
              variant={c.category === selectedCategory ? "contained" : "text"}
              color={c.category === selectedCategory ? "primary" : "inherit"}
              onClick={() => setSelectedCategory(c.category)}
              sx={{ justifyContent: "flex-start" }}
            >
              {c.category}
            </Button>
          ))}
        </Stack>
      </Grid>

      {/* Menü-Items */}
      <Grid item xs={12} md={9}>
        <Typography variant="h6" fontWeight={800}>
          {current?.category}
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          {current?.menuItem?.map((item) => (
            <Grid item xs={12} lg={6} key={item.name}>
              <Paper
                variant="outlined"
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  transition: "border-color 200ms ease, box-shadow 200ms ease",
                  "&:hover": { borderColor: "primary.main", boxShadow: 1 },
                }}
              >
                <Stack direction="row" spacing={2}>
                  <Box
                    sx={{
                      position: "relative",
                      width: 120,
                      height: 120,
                      borderRadius: 2,
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={item.productImage?.url ?? "/placeholder.jpg"}
                      alt={item.name}
                      fill
                      sizes="120px"
                      style={{ objectFit: "cover" }}
                    />
                  </Box>

                  <Stack spacing={0.5} sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle1" fontWeight={700} noWrap title={item.name}>
                      {item.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      ${Number(item.price).toFixed(2)}
                    </Typography>

                    {item.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {item.description}
                      </Typography>
                    )}

                    <Divider sx={{ my: 0.5 }} />

                    <Stack direction="row" justifyContent="flex-end">
                      <IconButton
                        aria-label="Add to cart"
                        onClick={() => addToCartHandler(item)}
                        sx={{ color: "primary.main" }}
                      >
                        <SquarePlus size={22} />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={2000}
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
    </Grid>
  );
}
