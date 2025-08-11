import React from "react";
import { Box, Grid, Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <Box sx={{ py: 3 }}>
      {/* Kategorie-Leiste (Skeleton-Chips) */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, overflow: "hidden" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} variant="rounded" width={112} height={64} sx={{ borderRadius: 3 }} />
        ))}
      </Box>

      {/* Karten-Grid */}
      <Grid container spacing={3}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <Skeleton variant="rounded" height={130} sx={{ borderRadius: 3 }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", mt: 1 }} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
