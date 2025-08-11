"use client";

import React from "react";
import { Container, Box } from "@mui/material";
import CategoryList from "./components/CategoryList";
import BusinessList from "./components/BusinessList";

export default function Home() {
  return (
    <Container sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <CategoryList />
      </Box>

      <BusinessList />
    </Container>
  );
}
