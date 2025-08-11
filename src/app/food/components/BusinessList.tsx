"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Grid, Typography } from "@mui/material";
import BusinessItem from "./BusinessItem";
import BusinessItemSkeleton from "./BusinessItemSkeleton";
import type { Business } from "./BusinessItem";
import { getBusinessesByCategory } from "../mocks/businesses";

export default function BusinessList() {
  const params = useSearchParams();
  const [category, setCategory] = useState<string>("all");
  const [businessList, setBusinessList] = useState<Business[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const cat = params.get("category") ?? "all";
    setCategory(cat);
    setLoading(true);
    getBusinessesByCategory(cat)
      .then((data) => setBusinessList(data))
      .finally(() => setLoading(false));
  }, [params]);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" fontWeight={700}>
        Popular {category} Restaurants
      </Typography>
      <Typography variant="subtitle1" color="primary" fontWeight={700}>
        {businessList.length} Results
      </Typography>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {!loading
          ? businessList.map((restaurant) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={restaurant.slug}>
                <BusinessItem business={restaurant} />
              </Grid>
            ))
          : Array.from({ length: 8 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <BusinessItemSkeleton />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
}
