"use client";

import React from "react";
import Image from "next/image";
import { Box, Stack, Typography, Skeleton } from "@mui/material";
import { MapPin, Star } from "lucide-react";

export type Restaurant = {
  name: string;
  address: string;
  banner?: { url?: string };
  rating?: number;        // optional
  reviewsCount?: number;  // optional
};

interface IntroProps {
  restaurant: Restaurant;
}

export default function Intro({ restaurant }: IntroProps) {
  const rating = restaurant?.rating ?? 4.5;
  const reviews = restaurant?.reviewsCount ?? 56;

  return (
    <Box>
      {/* Banner */}
      {restaurant?.banner?.url ? (
        <Box sx={{ position: "relative", width: "100%", height: 220, borderRadius: 2, overflow: "hidden" }}>
          <Image
            src={restaurant.banner.url}
            alt={`${restaurant.name} banner`}
            fill
            sizes="1000px"
            style={{ objectFit: "cover" }}
          />
        </Box>
      ) : (
        <Skeleton variant="rounded" height={220} sx={{ borderRadius: 2 }} />
      )}

      {/* Name */}
      <Typography variant="h4" fontWeight={700} sx={{ mt: 2 }}>
        {restaurant?.name}
      </Typography>

      {/* Rating */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
        <Box sx={{ color: "warning.main", display: "flex", alignItems: "center" }}>
          <Star size={20} />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {rating} ({reviews})
        </Typography>
      </Stack>

      {/* Adresse */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
        <Box sx={{ color: "text.secondary", display: "flex", alignItems: "center" }}>
          <MapPin size={18} />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {restaurant?.address}
        </Typography>
      </Stack>
    </Box>
  );
}
