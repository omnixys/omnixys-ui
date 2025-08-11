"use client";

import React from "react";
import { Box, Skeleton } from "@mui/material";

export default function BusinessItemSkeleton() {
  return (
    <Box>
      {/* Banner-Skeleton */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height={130}
        sx={{ borderRadius: 3 }}
      />

      {/* Titel-Skeleton */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height={20}
        sx={{ borderRadius: 1, mt: 2 }}
      />
    </Box>
  );
}
