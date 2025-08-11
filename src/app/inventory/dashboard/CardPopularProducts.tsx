"use client";

import * as React from "react";
import {
  Card, CardHeader, CardContent, Divider, Box, Typography,
  IconButton, List, ListItem, ListItemAvatar, Avatar, Rating, Chip
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import type { DashboardMetrics } from "../types/api-types";
import { mockDashboardMetrics } from "../data/dashboard-metrics.mock";

const productImg = (seed: string | number) => {
  const n = (typeof seed === "string" ? seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0) : seed) % 3;
  return `https://s3-inventorymanagement.s3.us-east-2.amazonaws.com/product${(n % 3) + 1}.png`;
};

const CardPopularProducts: React.FC = () => {
  const dashboard: DashboardMetrics = mockDashboardMetrics;
  const products = dashboard.popularProducts ?? [];

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 3, boxShadow: 3 }}>
      <CardHeader title="Popular Products" titleTypographyProps={{ variant: "h6", fontWeight: 600 }} sx={{ pb: 0 }} />
      <Divider />
      <CardContent sx={{ pt: 1, pb: 2, flex: 1, overflow: "auto" }}>
        <List disablePadding>
          {products.map((p) => (
            <ListItem
              key={p.productId}
              alignItems="center"
              sx={{
                px: 1, py: 1.5,
                "&:not(:last-of-type)": { borderBottom: (t) => `1px solid ${t.palette.divider}` },
              }}
              secondaryAction={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton size="small" color="primary">
                    <ShoppingBagIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="caption" component="span">
                    {Math.round(p.stockQuantity / 1000)}k Sold
                  </Typography>
                </Box>
              }
            >
              <ListItemAvatar>
                <Avatar src={productImg(p.productId)} alt={p.name} variant="rounded" sx={{ width: 56, height: 56 }} />
              </ListItemAvatar>

              {/* Eigene Primär-/Sekundärzeile statt ListItemText, um <p><div/></p> zu vermeiden */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography variant="subtitle2" fontWeight={700} component="span">
                  {p.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Chip label={`$${p.price}`} size="small" color="primary" variant="outlined" sx={{ height: 22 }} />
                  <Typography variant="caption" component="span">|</Typography>
                  <Rating value={p.rating ?? 0} precision={0.5} size="small" readOnly />
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default CardPopularProducts;
