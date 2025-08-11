"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, Box, Skeleton } from "@mui/material";
import Intro from "../components/Intro";
import RestroTabs from "../components/RestroTabs";
import type { Restaurant } from "../../mocks/restaurants";
import { getRestaurantBySlug } from "../../mocks/restaurants";
import { logger } from "../../../../utils/logger";

export default function RestaurantDetails() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  logger.debug('slug: ', slug)
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    if (slug) getRestaurantBySlug(slug).then(setRestaurant);
  }, [slug]);

  if (!restaurant) {
    return (
      <Container sx={{ py: 3 }}>
        <Skeleton variant="rounded" height={220} sx={{ borderRadius: 2 }} />
        <Skeleton variant="text" sx={{ mt: 2, fontSize: "2rem", width: "40%" }} />
        <Skeleton variant="text" sx={{ width: "30%" }} />
      </Container>
    );
  }

  return (
    <Container sx={{ py: 3 }}>
      <Intro restaurant={restaurant} />
      <Box sx={{ mt: 3 }}>
        <RestroTabs restaurant={restaurant} />
      </Box>
    </Container>
  );
}
