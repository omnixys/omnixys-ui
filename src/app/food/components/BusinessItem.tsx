"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Card, CardActionArea, CardContent, Typography, Stack, Chip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export type Business = {
  slug: string;
  name: string;
  banner?: { url: string };
  restroType: string[];
  categories: { name: string }[];
  rating?: number;
};

interface BusinessItemProps {
  business: Business;
}

export default function BusinessItem({ business }: BusinessItemProps) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        transition: "transform 0.2s ease",
        "&:hover": { transform: "scale(1.02)", boxShadow: 4 },
      }}
    >
      <CardActionArea component={Link} href={`/food/restaurant/${business.slug}`}>
        {/* Banner */}
        <Box sx={{ position: "relative", width: "100%", height: 130 }}>
          <Image
            src={business.banner?.url || "/food/placeholder.jpg"}
            alt={business.name}
            fill
            sizes="500px"
            style={{ objectFit: "cover" }}
          />
        </Box>

        <CardContent sx={{ p: 2 }}>
          {/* Name */}
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {business.name}
          </Typography>

          {/* Details */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <StarIcon sx={{ fontSize: 16, color: "gold" }} />
              <Typography variant="body2" color="text.secondary">
                {business.rating ?? 4.5}
              </Typography>
              {business.restroType?.[0] && (
                <Typography variant="body2" color="text.secondary">
                  {business.restroType[0]}
                </Typography>
              )}
            </Stack>

            {business.categories?.[0] && (
              <Chip
                label={business.categories[0].name}
                size="small"
                color="primary"
                sx={{ fontWeight: 500 }}
              />
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
