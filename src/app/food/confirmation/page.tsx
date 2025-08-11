// Beispiel 1: Confirmation mit Lucide
import React from "react";
import Link from "next/link";
import { Box, Paper, Stack, Typography, Button } from "@mui/material";
import { CheckCircle2 } from "lucide-react";

export default function ConfirmationPage() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", my: { xs: 6, md: 10 } }}>
      <Paper elevation={3} sx={{ p: { xs: 3, md: 6 }, borderRadius: 3, minWidth: { md: 520 } }}>
        <Stack alignItems="center" spacing={2}>
          <Box sx={{ color: "primary.main" }}>
            <CheckCircle2 size={72} />
          </Box>
          <Typography variant="h4" fontWeight={600} color="primary">
            Order Successful
          </Typography>
          <Typography color="text.secondary">Thank you so much for your order.</Typography>
          <Button component={Link} href="/food/my-order" variant="contained" size="large" sx={{ mt: 2 }}>
            Track your order
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
