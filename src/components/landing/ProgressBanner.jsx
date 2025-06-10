// components/landing/ProgressBanner.jsx
"use client";

import {
  Box,
  Container,
  Typography,
  LinearProgress,
  Button,
} from "@mui/material";
import Link from "next/link";

export default function ProgressBanner() {
  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
      <Typography color="text.primary" gutterBottom>
        55 % der geplanten Module sind bereits verfügbar
      </Typography>
      <Typography
        color="text.primary"
        variant="body1"
        sx={{ mb: 3 }}
      >
        Sichere dir vorab exklusiven Zugang zur OmnixysSphere Beta – und
        gestalte mit uns die nächste Generation vernetzter Plattformdienste.
      </Typography>
      <LinearProgress
        variant="determinate"
        value={55}
        sx={{ height: 10, borderRadius: 5, mb: 3 }}
      />
      <Link href="/beta" passHref>
        <Button
          variant="outlined"
          size="large"
          sx={{ borderColor: "primary.main", color: "text.primary", fontWeight: 600 }}
        >
          Beta-Zugang anfordern
        </Button>
      </Link>
    </Container>
  );
}
