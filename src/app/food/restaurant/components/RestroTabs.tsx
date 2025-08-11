"use client";

import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Stack } from "@mui/material";
import MenuSection, { type Restaurant as MenuRestaurant } from "./MenuSection";
import ReviewSection from "./ReviewSection";
import { UtensilsCrossed, Info, MessageSquare } from "lucide-react";

type Restaurant = MenuRestaurant & {
  aboutUs?: string;
};

interface RestroTabsProps {
  restaurant: Restaurant;
}

export default function RestroTabs({ restaurant }: RestroTabsProps) {
  const [value, setValue] = useState<"category" | "about" | "reviews">("category");

  return (
    <Box sx={{ width: "100%", mt: 3 }}>
      <Tabs
        value={value}
        onChange={(_, v) => setValue(v)}
        aria-label="Restaurant tabs"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab
          value="category"
          label={
            <Stack direction="row" alignItems="center" spacing={1}>
              <UtensilsCrossed size={16} />
              <span>Category</span>
            </Stack>
          }
        />
        <Tab
          value="about"
          label={
            <Stack direction="row" alignItems="center" spacing={1}>
              <Info size={16} />
              <span>About</span>
            </Stack>
          }
        />
        <Tab
          value="reviews"
          label={
            <Stack direction="row" alignItems="center" spacing={1}>
              <MessageSquare size={16} />
              <span>Reviews</span>
            </Stack>
          }
        />
      </Tabs>

      {/* Panels */}
      <Box role="tabpanel" hidden={value !== "category"} sx={{ pt: 2 }}>
        {value === "category" && <MenuSection restaurant={restaurant} />}
      </Box>

      <Box role="tabpanel" hidden={value !== "about"} sx={{ pt: 2 }}>
        {value === "about" && (
          <>
            <Typography variant="h6" fontWeight={700} sx={{ my: 1 }}>
              About Me
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {restaurant?.aboutUs || "No description available."}
            </Typography>
          </>
        )}
      </Box>

      <Box role="tabpanel" hidden={value !== "reviews"} sx={{ pt: 2 }}>
        {value === "reviews" && <ReviewSection restaurant={restaurant} />}
      </Box>
    </Box>
  );
}
