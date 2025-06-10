// src/components/kpi-cards/TotalRevenue.tsx

import React from "react";
import { Avatar, Card, CardContent, Stack, SxProps, Theme, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

interface TotalRevenueProps {
  value: number;
  sx?: SxProps<Theme>;
}

export default function TotalRevenue({ value, sx }: TotalRevenueProps) {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack direction="row" spacing={3} justifyContent="space-between">
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Gesamtumsatz
            </Typography>
            <Typography variant="h4">
              {value.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "var(--mui-palette-primary-main)",
              height: 56,
              width: 56,
            }}
          >
            <AttachMoneyIcon />
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}
